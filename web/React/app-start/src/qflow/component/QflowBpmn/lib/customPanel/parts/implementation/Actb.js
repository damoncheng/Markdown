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
            tb.css("background-color", "#fff");
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
            //console.log("mouseover....");
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