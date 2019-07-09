/* 
 * 源码: http://codeproject.com/jscript/jsactb.asp(actb.js)
 * 已面目全非... (＃－－)/ .(＃－－)/ .(＃－－)/ .(＃－－)/ .(＃－－)/ .
 *
 * 简单的自动完成插件, 修改后与jquery整合
 * 主要暴露一些简单的接口, 方便扩展成userchooser等其它自动完成插件
 *
 * @modified zhibocai
 */

 var Actb = require('./Actb');

; (function (root, factory) {

    if (typeof exports !== 'undefined') {
        var jQuery;
        try {
            jQuery = require('jquery');
        } catch (err) {
            jQuery = window.jQuery;
            if (!jQuery) throw new Error('jQuery dependency not found');
        }
        module.exports = factory(jQuery);
    } else {
        root.Actb = factory(window.jQuery);
    }

}(this, function ($) {

    // 获取光标开始位置(obj需有焦点)
    var getCaretStart = function (obj) {
        if (obj instanceof $) {
            obj = obj.get(0);
        }
        if (typeof obj.selectionStart != "undefined") {
            return obj.selectionStart;
        } else if (document.selection && document.selection.createRange) {
            var M = document.selection.createRange();
            try {
                var Lp = M.duplicate();
                Lp.moveToElementText(obj);
            } catch (e) {
                var Lp = obj.createTextRange();
            }
            Lp.setEndPoint("EndToStart", M);
            var rb = Lp.text.length;
            if (rb > obj.value.length) {
                return -1;
            }
            return rb;
        }
    }

    // 获取光标结束位置(obj需有焦点)
    var getCaretEnd = function (obj) {
        if (obj instanceof $) {
            obj = obj.get(0);
        }
        if (typeof obj.selectionEnd != "undefined") {
            return obj.selectionEnd;
        } else if (document.selection && document.selection.createRange) {
            var M = document.selection.createRange();
            try {
                var Lp = M.duplicate();
                Lp.moveToElementText(obj);
            } catch (e) {
                var Lp = obj.createTextRange();
            }
            Lp.setEndPoint("EndToEnd", M);
            var rb = Lp.text.length;
            if (rb > obj.value.length) {
                return -1;
            }
            return rb;
        }
    }

    // 设置光标位置
    var setCaret = function (obj, l) {
        if (obj instanceof $) {
            obj = obj.get(0);
        }
        obj.focus();
        if (obj.setSelectionRange) {
            obj.setSelectionRange(l, l);
        } else if (obj.createTextRange) {
            m = obj.createTextRange();
            m.moveStart('character', l);
            m.collapse();
            m.select();
        }
    }

    // 添加转义符
    var addSlashes = function (str) {
        return str.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
    }

    // 计算控件顶部坐标
    var curTop = function (obj) {
        if (obj instanceof $) {
            obj = obj.get(0);
        }
        toreturn = 0;
        while (obj) {
            toreturn += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return toreturn;
    }

    // 计算控件左侧坐标
    var curLeft = function (obj) {
        if (obj instanceof $) {
            obj = obj.get(0);
        }
        toreturn = 0;
        while (obj) {
            toreturn += obj.offsetLeft;
            obj = obj.offsetParent;
        }
        return toreturn;
    }

    var Actb = function (element, option) {

        /* ---- Public Variables ---- */
        // 显示选项的数量
        this.limit = option.limit;
        // 分隔符 
        this.delimiter = option.delimiter;
        // 是否字符开头(强制! 提高效率)
        this.firstText = true;
        // 选择器在输入n字符后出现(强制)
        this.startcheck = 1;
        // 选项显示时的回调
        this.formatItem = option.formatItem;
        // 选项选中时的回调
        this.formatResult = option.formatResult;
        // 自动完成时的回调
        this.onAutoCompleted = option.onAutoCompleted;
        // 搜索数据时触发
        this.onSearch = option.onSearch;
        // 删除列表(失去焦点时触发)
        this.onClose = option.onClose;
        /* ---- Public Variables ---- */

        // 筛选列表
        this.data = option.data || [];
        // 选择位置(data的index)
        this.selected = 0;
        // 备选列表
        this.keywords = null;
        // 备选匹配标志位
        this.bool = null;

        /* ---- Private Variables ---- */
        // 单词列表(已录入)
        this.words = [];
        // 光标所在单词位置(words的index)
        this.index = 0;
        // 是否显示
        this.display = false;
        // 显示位置
        this.position = 0;
        // 标识鼠标是否在列表上(true则不能关闭备选列表)
        this.mouse_on_list = 0; //mic: change default value to 0 for bug #691
        // 统计备选个数
        this.count = 0;
        // 标识光标状态(true表示移动或者输入, 应禁止默认事件)
        this.caretmove = false;
        /* ---- Private Variables---- */

        this.element = $(element);
        this.element.attr({ autocomplete: 'off' });
        this.element.focus($.proxy(this, "setup"));
    }

    Actb.prototype = {

        constructor: Actb

        // 获得焦点, 绑定事件
        , setup: function () {
            $(document)
                .bind("keydown.actb", $.proxy(this, "keydown"))
                .bind("keypress.actb", $.proxy(this, "keypress"));
            this.element.bind("blur.actb", $.proxy(this, "clear"));
        }

        // 失去焦点, 移除事件
        , clear: function (evt) {
            var $this = this;
            $(document)
                .unbind("keydown.actb")
                .unbind("keypress.actb");
            $this.element.unbind("blur.actb");
            $this.remove();

            // 移除列表时触发
            $this.onClose($this.element, $this.element.val());
        }

        // 分析输入, 返回命中的单词包装(html->font)
        , parse: function (n) {
            var $this = this;

            // callback
            n = $this.formatItem(n);

            // 高亮的关键字
            var keyword;
            if ($this.delimiter !== false) {
                keyword = $this.words[$this.index];
            } else {
                keyword = element.val();
            }


            var tobuild = '';
            var t = addSlashes($.trim(keyword)); // 去空格, 添加转义斜线
            var i;

            // 从首字符匹配, 追加"^"
            var re = new RegExp($this.firstText ? "^" + t : t, "i");
            var p = n.search(re);

            for (i = 0; i < p; i++) {
                tobuild += n.substr(i, 1);
            }

            // 添加<font>包装
            tobuild += "<font class='keyword'>"
            for (i = p; i < keyword.length + p; i++) {
                tobuild += n.substr(i, 1);
            }
            tobuild += "</font>";
            for (i = keyword.length + p; i < n.length; i++) {
                tobuild += n.substr(i, 1);
            }

            // 返回包装后的字符串
            return tobuild;
        }

        // 下拉框内容
        , generate: function () {
            var $this = this
                , element = $this.element;

            if ($("#actb").length) {
                $("#actb").remove(); // 移除存在的表格
                $this.display = false;
            }

            // 没有关键字, 不显示
            if ($this.count == 0) {
                $this.display = false;
                return;
            }

            var tb = $("<table><tbody></tbody></table>");
            tb.attr({
                id: 'actb',
                cellSpacing: '1px',
                cellPadding: '2px'
            }).css({
                position: 'absolute',
                top: element.offset().top + element.outerHeight(),
                left: element.offset().left
            }).addClass("autocomplete")
                .hover(function () {
                    $this.mouse_on_list = true;
                }, function () {
                    $this.mouse_on_list = false;
                });

            tb.css("z-index", 1100);
            var row, cell, j = 1;
            var first = true;
            var position = 0;
            var keywords = $this.keywords;

            // 循环limit次
            for (var i = 0; i < keywords.length; i++) {

                if ($this.bool[i]) {
                    position++;

                    // 追加一行
                    row = $('<tr>').appendTo(tb.find('tbody'));

                    // 第一行单词高亮
                    if (first) {
                        first = false;
                        row.addClass("highlight");
                        $this.position = position;
                    }

                    row.attr("id", "actb-tr-" + j);

                    cell = $("<td>");
                    cell.attr({
                        id: "actb-td-" + j,
                        pos: j
                    })
                        .html($this.parse(keywords[i]))         // 增强关键字
                        .click($.proxy($this, 'mouseclick'))    // 鼠标点击事件
                        .mouseover($.proxy($this, 'mouseover')) // 鼠标悬浮事件
                        .appendTo(row);

                    j++;
                }

                if (j - 1 >= $this.limit || j > $this.count) {
                    break;
                }
            }

            $(document.body).append(tb);

            $this.display = true;

            if ($this.position <= 0) {
                $this.position = 1;
            }
        }

        , goup: function () {
            var $this = this;
            if (!$this.display) return;
            if ($this.position == 1) return;
            $("#actb-tr-" + $this.position--).removeClass("highlight");
            $("#actb-tr-" + $this.position).addClass("highlight");
        }
        , godown: function () {
            var $this = this;
            if (!$this.display) return;
            if ($this.position == $this.count) return;
            $("#actb-tr-" + $this.position++).removeClass("highlight");
            $("#actb-tr-" + $this.position).addClass("highlight");
        }
        , mouseclick: function (e) {
            var $this = this;
            if (!$this.display) {
                return;
            }
            $this.mouse_on_list = 0;
            $this.penter(parseInt(e.target.getAttribute('pos')));
        }
        , mouseover: function (e) {
            var $this = this;
            if (!$this.display) {
                return;
            }
            $this.mouse_on_list = 1;
            $("#actb-tr-" + $this.position).removeClass("highlight");
            $this.position = parseInt(e.target.getAttribute('pos'));
            $("#actb-tr-" + $this.position).addClass("highlight");
        }
        , insertword: function (a) {
            var $this = this
                , element = $this.element;

            // callback
            var rs = $this.formatResult(a);

            if ($this.delimiter !== false) {
                var str = '', l = 0
                    , index = $this.index
                    , words = $this.words;

                for (var i = 0; i < words.length; i++) {
                    if (index == i) {
                        str += rs;
                        l = str.length + 1;
                    } else {
                        str += words[i];
                    }
                    str += $this.delimiter;
                }
                element.val(str);

                setCaret(element, l); // 光标移动输入字符的最后
            } else {
                // 没有分隔符, 直接插入值
                element.val(a);
            }

            // 自动完成后触发
            $this.onAutoCompleted(element, a, element.val());

            $this.mouse_on_list = 0;
            $this.remove();
        }
        , penter: function (pos) {
            var $this = this;

            if (!$this.display) return;

            $this.display = false;

            var word = ''
                , c = 0
                , pos = pos || $this.position
                , keywords = $this.keywords;

            for (var i = 0; i < keywords.length; i++) {
                if ($this.bool[i]) c++;
                if (c == pos) {
                    word = keywords[i];
                    break;
                }
            }
            $this.insertword(word);
        }
        , remove: function () {
            var $this = this;

            // 鼠标在列表上, 不能移除列表
            if (!$this.mouse_on_list) {
                $this.display = false;
                $("#actb").remove();

            }
        }
        , keypress: function (e) {
            // 阻止输入
            return !this.caretmove;
        }
        // 输入字符
        , keydown: function (e) {
            var $this = this;

            $this.caretmove = 0;
            switch (e.keyCode) {
                // 上
                case 38:
                    $this.goup();
                    $this.caretmove = 1;
                    return false;
                    break;
                // 下
                case 40:
                    $this.godown();
                    $this.caretmove = 1;
                    return false;
                    break;
                // 回车, 制表符
                case 13: case 9:
                    if ($this.display) {
                        $this.caretmove = 1;
                        $this.penter();
                        return false;
                    }
                    if (e.keyCode == 13) return false;
                    break;
                default:
                    setTimeout(function () {
                        $this.autocomplete(e.keyCode);
                    }, 50);
                    break;
            }
        }
        , autocomplete: function (kc) {
            if (kc == 38 || kc == 40 || kc == 13) return;

            var $this = this
                , element = $this.element
                , delimiter = $this.delimiter;

            // 未输入值
            if (element.val() == '') {
                $this.mouse_on_list = 0;
                $this.remove();
                return;
            }

            if (delimiter !== false) {

                var end = getCaretEnd(element)
                    , re = new RegExp("[" + addSlashes(delimiter) + "]");

                var val = $this.element.val()
                    , words = $this.words = val.split(re);

                // 找到光标位置的单词
                var l = 0, idx = -1;
                for (var i = 0; i < words.length; i++) {
                    if (end >= l && (end <= l + words[i].length)) {
                        idx = i;
                    }
                    l += words[i].length + 1;
                }
                var word = $.trim(words[$this.index = idx]);
            } else {
                var word = $.trim(element.val());
            }

            // 光标位置没有值
            if (word.length == 0) {
                $this.mouse_on_list = 0;
                $this.remove();
            }

            // 如果字符长度低于开始显示的长度, 不显示 
            if (word.length < $this.startcheck) {
                return false;
            }

            var t = addSlashes(word);
            var re = new RegExp($this.firstText ? "^" + t : t, "i");

            if ($this.onSearch) {
                $this.keywords = $this.onSearch.call(
                    element, $this.data, word, $this.limit);
            } else {
                $this.keywords = $this.data;
            }

            var format = $this.formatItem
                , keywords = $this.keywords;

            $this.count = 0;    // 关键字总数
            $this.bool = new Array(keywords.length);
            for (var i = 0; i < keywords.length; i++) {
                $this.bool[i] = false;
                if (re.test(format(keywords[i]))) {
                    $this.bool[i] = true;
                    $this.count++;
                }
                // 
                if ($this.count >= $this.limit) {
                    break;
                }
            }
            // 生成表格
            $this.generate();
        }
    }

    $.fn.Actb = function (option) {
        option = $.extend({}, $.fn.Actb.defaults, option);
        return this.each(function () {
            new Actb(this, option);
        });
    }

    $.fn.Actb.constructor = Actb;

    $.fn.Actb.defaults = {
        limit: 6,
        delimiter: ";",
        formatItem: function (item) {
            return item;
        },
        formatResult: function (item) {
            return item;
        },
        onAutoCompleted: function (input, keyword, value) {
        },
        onClose: function (input, value) {
        }
    }

    return Actb;
}));


/**
 * UserChooser用户选择器
 * top.oa的修改版, top.oa的userchooser.js最大的问题是会改域为"oa.com"
 * 此版本目标优化旧的用户选择器, 提供更开放的接口和回调.
 * 
 * @author: zhibocai
 * @modify
 * 2019-02-01:
 *      jaochen 修改数据源、匹配规则，以支持sim新增公共用户，例如_qflow,_tcms等
 */
; (function (root, factory) {

    if (typeof exports !== 'undefined') {
        // 
        var actb = require('./Actb');
        var jQuery = require('jquery');

        module.exports = factory(jQuery);
    } else {
        root.UserChooser = factory(window.jQuery);
    }

}(this, function ($) {

    if (typeof $.fn.Actb == "undefined") {
        return null;
    }

    var disableInput = function () {
        var $this = $(this);
        $this.data('raw-value', $this.val()); // cache旧数据
        // $this.val('loading...');
        $this.attr('disabled', 'disabled');
    }

    var enableInput = function () {
        var $this = $(this);
        $this.val($this.data('raw-value') || ''); // 还原
        $this.removeAttr('disabled');
    }

    // 二分查找 by top.oa
    var binSearch = function (items, value) {
        var low = 0
            , high = items.length - 1
            , mid;

        while (low <= high) {
            if (items[low][0].toLowerCase() == value) {
                return low;
            } else if (items[high][0].toLowerCase() == value) {
                return high;
            }
            mid = Math.floor((low + high) / 2);
            var en2 = items[mid][0];

            if (value == en2) {
                return mid;
            }
            if (en2 > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    // 二分查找(startswith) by top.oa
    var binStartSearch = function (items, value) {
        var low = 0
            , high = items.length - 1
            , mid;

        value = value.toLowerCase(); // 忽略大小写

        var idx = value.indexOf('(');
        var en1 = idx == -1 ? value : value.substring(0, idx); // 移除括号

        while (low <= high) {

            // 兼容自定义加的 平台数据，比如_qflow, _tcms
            if (!items[low][1]) {
                items[low][1] = items[low][0];
            }
            if (!items[high][1]) {
                items[high][1] = items[high][0];
            }

            if (items[low][0].toLowerCase().indexOf(en1) == 0) {
                while (low >= 0) {
                    if (!items[low][1]) {
                        items[low][1] = items[low][0];
                    }
                    if (items[low][0].toLowerCase().indexOf(en1) == 0) {
                        low--;
                    } else {
                        break;
                    }
                }
                return low + 1;

            } else if (high >= 0 && items[high][0].toLowerCase().indexOf(en1) == 0) {
                while (true) {
                    if (!items[high][1]) {
                        items[high][1] = items[high][0];
                    }
                    if (items[high][0].toLowerCase().indexOf(en1) == 0) {
                        high--;
                    } else {
                        break;
                    }
                }
                return high + 1;
            }

            mid = Math.floor((low + high) / 2);

            var en2 = items[mid][0];

            if (en2.indexOf(en1) == 0) {

                while (mid >= 0) {
                    if (!items[mid][1]) {
                        items[mid][1] = items[mid][0];
                    }
                    if(items[mid][0].toLowerCase().indexOf(en1) == 0){
                        mid --;
                    }else{
                        break;
                    }
                }
                return mid + 1;
            }

            if (en2 > en1) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    var onSearch = function (items, value, limit) {
        var i, j;
        i = binStartSearch(items, value);
        // 没有找到直接返回空列表
        if (i == -1) {
            return [];
        }
        j = i + limit;
        j = j > items.length ? items.length : j;

        return items.slice(i, j);
    }

    var onCalcValue = function (input, value) {
        var $this = this
            , element = $(input)
            , keywords = $this.data; // 全数据搜索

        var len, index;
        // var raw = '', result = ''; // 实际值(带中文名), 结果值(不带中文名)
        var raw = [], result = []; // 实际值(带中文名), 结果值(不带中文名)
        var words = value.split($this.delimiter);
        for (var i = 0; i < words.length; i++) {

            var word = $.trim(words[i]);

            // 空白            
            if ($.trim(word).length == 0) {
                continue;
            }

            // 去括号
            word = word.toLowerCase(); // 忽略大小写
            var idx = word.indexOf('(');
            word = idx == -1 ? word : word.substring(0, idx); // 移除括号

            // 去重
            if($.inArray(word, result) >= 0){
                continue;
            }

            index = binSearch(keywords, word);
            if (index >= 0) {
                var keyword = keywords[index];
                if(!keyword[1]){
                    keywords[index][1] = keywords[index][0];
                    keyword[1] = keyword[0];
                }
                raw.push(keyword[1]);
                result.push(keyword[0]);
            }
        }

        // 赋值
        raw_value = "";
        result_value = "";
        if(raw.length > 0){
            raw_value = raw.join($this.delimiter) + $this.delimiter;
            result_value = result.join($this.delimiter) + $this.delimiter;
        }

        element.val(raw_value);
        if (element.data('chooser-target')) {
            element.data('chooser-target').value = result_value;
        }
    }

    $.fn.UserChooser = function (option) {
        option = $.extend({}, $.fn.UserChooser.defaults, option);
        return this.each(function () {
            var $this = $(this);
            $this.on('focus.userchooser.init', function () {
                if (option.data == null) {
                    var name = $.fn.UserChooser.types[option.type] || 'users';
                    var data = $.fn.UserChooser.cache[name] || window['_arr' + name]; // top.oa
                    if (typeof data === 'undefined') {

                        if(option.qflow_modeler.qflow_basic.users.length > 0){
                            data = option.qflow_modeler.qflow_basic.users;
                        }
                        else{

                            // 禁用
                            disableInput.call($this);

                            // 异步加载数据
                            $.getScript(option.source + name + ".js", function () {
                                data = window['_arr' + name];

                                option.qflow_modeler.qflow_basic.users = data;

                                //
                                $.fn.UserChooser.cache[name] = data;
                                $.fn.UserChooser.init.call($this, data, option);

                                // 启用 
                                enableInput.call($this);

                                // 移除事件
                                $this.unbind('focus.userchooser.init');
                                $this.focus();
                            });
                            // 异步执行结束
                            return;

                        }
                    }

                    // 直接使用数据
                    option.data = data;
                }

                $.fn.UserChooser.init.call($this, option.data, option);
                $this.unbind('focus.userchooser.init');
                $this.focus();
            });
        });
    }

    $.extend($.fn.UserChooser, {
        cache: {}
        // same as top.oa
        , types: {
            1: 'users',
            // 2: 'usersandadgroups',
            2: 'users',
            3: 'adgroups'
        }
        // 初始化
        , init: function (data, option) {
            var $this = $(this);

            option = $.extend({}, $.fn.Actb.defaults, option);
            option.data = data;

            
            if (option.target == null) {
                var tid = $this.attr('id');
                var tname = $this.attr('name');
                var target = $('<input type="hidden" />');

               //console.log("......$this", $this);
                target.attr({
                    id: tid + 'Show',
                    //name: tname || ''
                }).insertAfter($this);
                $this.data('chooser-target', target.get(0));
            } else {
                //console.log("$(option.target) : ", $(option.target))
                $this.data('chooser-target', $(option.target).get(0));
            }
            

            // 仅能输入一个值
            if (option.single) {
                option.onAutoCompleted = function (input, item, value) {
                    $(input).val(item[1] + option.delimiter);
                }
            }

            $this.data('user-chooser', new Actb($this, option));

        }
    });

    $.fn.UserChooser.defaults = {
        type: 1,
        data: null,
        target: null,
        single: false,
        //source: 'http://tdl.oa.com/tbl/js/',
        // source: 'http://top.oa.com/js/',
        source: 'http://qci.oa.com/',
        formatItem: function (item) { return item[1] },
        formatResult: function (item) { return item[1] },
        onAutoCompleted: function (input, item, value) { },
        onClose: onCalcValue,
        onSearch: onSearch
    }


    // TODO: 修改成获取焦点后执行插件, 提供一次解除绑定的机会比较好
    // $(document).on('focus.userchooser.data-api', '[data-toggle=user-chooser]', function(){
    // });
    //

    return $.fn.UserChooser;
}));


