'use strict';

var domQuery = require('min-dom').query;
var domClosest  = require('min-dom').closest;
var domAttr = require('min-dom').attr;

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    usernameEntry = require('./implementation/Username');


module.exports = function(group, element, translate, elementRegistry, qflow_modeler) {

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


    group.entries.push(usernameEntry({
        id : 'owner',
        description : '',
        label : '默认步骤责任人',
        modelProperty : 'owner',
        get: function(element, node) {

            var bo = getBusinessObject(element),
                res = {};
            res["owner"] = bo.get("owner");

            
            var query = "input[id=qflow-ownerShow]";
            var show_node = domQuery(query, node);

            if(qflow_modeler.debug)
                console.log("get show_node : ", show_node);

            if(show_node && show_node.value){
                res["owner"] = show_node.value;
            }
            
            return res;

        },
        set: function(element, values, node) {

            // var query = "input#qflow-owner";
            // var hide_node = domQuery(query, node);

            //if(node.value)
            //values["owner"] = node.value;

            // console.log("qflow_modeler... : ", qflow_modeler.qflow_basic.users);
            // console.log("hide node : ", hide_node.value);
            // console.log("values :", values);

            var query = "input[id=qflow-ownerShow]";
            var show_node = domQuery(query, node);

            //console.log("set show_node : ", show_node);

            if(show_node){
            
                //console.log("show_node value : ", show_node.value);
                domAttr(show_node, "value", values["owner"])

                var value = values["owner"];
                var keywords = qflow_modeler.qflow_basic.users;

                //console.log("keywords : ", keywords)

                if(value){

                    var len, index;
                    var delimiter = ';';
                    // var raw = '', result = ''; // 实际值(带中文名), 结果值(不带中文名)
                    var raw = [], result = []; // 实际值(带中文名), 结果值(不带中文名)
                    var words = value.split(delimiter);

                    for (var i = 0; i < words.length; i++) {

                        var word = words[i].trim();

                        // 空白            
                        if (word.trim().length == 0) {
                            continue;
                        }

                        // 去括号
                        word = word.toLowerCase(); // 忽略大小写
                        var idx = word.indexOf('(');
                        word = idx == -1 ? word : word.substring(0, idx); // 移除括号

                        // 去重
                        if(result.includes(word)){
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
                    var raw_value = "";
                    var result_value = "";
                    if(raw.length > 0){
                        raw_value = raw.join(delimiter) + delimiter;
                        result_value = result.join(delimiter) + delimiter;

                        //console.log("raw_value : ", raw_value);
                        //console.log("result_value : ", result_value);
                        values["owner"] = result_value;
                        
                    }
                
                }
            }

            return cmdHelper.updateProperties(element, values);
        },
        validate : function(element, values, entryNode){

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));


};