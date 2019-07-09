var utils = require('bpmn-js-properties-panel/lib/Utils');

function uniqueValid(elementList, property, idx, value) {

    if (value.trim() === '') {
        return '选项名不能为空';
    }

    for(let index in elementList){

        if(index == idx)
            continue;

        if(elementList[index][property] && elementList[index][property] == value){
            return '不能有重复选项';
        }

    }
}
  
module.exports.uniqueValid = uniqueValid;
  