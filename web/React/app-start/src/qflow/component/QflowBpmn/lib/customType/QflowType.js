
/*责任人配置相关常量*/
const QFLOW_STEP_OWNER_DEFAULT = '0'
const QFLOW_STEP_OWNER_CREATOR = '1'
const QFLOW_STEP_OWNER_CREATOR_CONFIG = '2'
const QFLOW_STEP_OWNER_ROLE = '3'
const QFLOW_STEP_OWNER_ANCESTOR_STEP_CREATOR = '4'
const QFLOW_STEP_OWNER_ANCESTOR_STEP_OWNER = '6'
const QFLOW_STEP_OWNER_ANCESTOR_FIELD = '5'

const QFLOW_FIELD_INPUT = 'input'
const QFLOW_FIELD_TEXTAREA = 'textarea'
const QFLOW_FIELD_INFO = 'info'
const QFLOW_FIELD_RTX = 'rtx'
const QFLOW_FIELD_SELECT = 'select'
const QFLOW_FIELD_CHECKBOX = 'checkbox'
const QFLOW_FIELD_RADIO = 'radio'
const QFLOW_FIELD_DATE = 'date'
const QFLOW_FIELD_TIME = 'time'
const QFLOW_FIELD_FILE = 'file'
const QFLOW_FIELD_APPROVE = 'approve'
const QFLOW_FIELD_BRANCH = 'branch'
const QFLOW_FIELD_SUB_FLOW = 'sub_flow'

class QflowType {

    //step type相关
    static QFLOW_STEP_TYPE_DESCRIPTION = {

        "bpmn:UserTask" : "普通步骤",

        "bpmn:ManualTask" : "审批步骤",

        "bpmn:SubProcess" : "子流程步骤",

        "bpmn:ParallelGateway" : "分支步骤",

        "bpmn:ServiceTask" : "工具步骤",

        "bpmn:SendTask" : "推送步骤"

    }
 
    //step owner相关
    static QFLOW_STEP_OWNER_DEFAULT = QFLOW_STEP_OWNER_DEFAULT
    static QFLOW_STEP_OWNER_CREATOR = QFLOW_STEP_OWNER_CREATOR
    static QFLOW_STEP_OWNER_CREATOR_CONFIG = QFLOW_STEP_OWNER_CREATOR_CONFIG
    static QFLOW_STEP_OWNER_ROLE = QFLOW_STEP_OWNER_ROLE
    static QFLOW_STEP_OWNER_ANCESTOR_STEP_CREATOR = QFLOW_STEP_OWNER_ANCESTOR_STEP_CREATOR
    static QFLOW_STEP_OWNER_ANCESTOR_STEP_OWNER = QFLOW_STEP_OWNER_ANCESTOR_STEP_OWNER
    static QFLOW_STEP_OWNER_ANCESTOR_FIELD = QFLOW_STEP_OWNER_ANCESTOR_FIELD

    static QFLOW_STEP_OWNER_DESCRIPTION = {

        [QFLOW_STEP_OWNER_DEFAULT] : "默认步骤责任人",
        [QFLOW_STEP_OWNER_CREATOR] : '流程发起者',
        [QFLOW_STEP_OWNER_CREATOR_CONFIG] : '流程发起者配置',
        [QFLOW_STEP_OWNER_ROLE] : '角色填充',
        [QFLOW_STEP_OWNER_ANCESTOR_STEP_CREATOR] : '步骤处理人填充',
        [QFLOW_STEP_OWNER_ANCESTOR_STEP_OWNER] : '步骤责任人填充',
        [QFLOW_STEP_OWNER_ANCESTOR_FIELD] : '步骤人员输入框字段填充'

    }

    static QFLOW_STEP_OWNER_LIST = [

        QFLOW_STEP_OWNER_DEFAULT,
        QFLOW_STEP_OWNER_CREATOR,
        QFLOW_STEP_OWNER_CREATOR_CONFIG,
        QFLOW_STEP_OWNER_ROLE,
        QFLOW_STEP_OWNER_ANCESTOR_STEP_CREATOR,
        QFLOW_STEP_OWNER_ANCESTOR_STEP_OWNER,
        QFLOW_STEP_OWNER_ANCESTOR_FIELD

    ]

    //field 相关
    static QFLOW_FIELD_INPUT = QFLOW_FIELD_INPUT
    static QFLOW_FIELD_TEXTAREA = QFLOW_FIELD_TEXTAREA
    static QFLOW_FIELD_INFO = QFLOW_FIELD_INFO
    static QFLOW_FIELD_RTX = QFLOW_FIELD_RTX
    static QFLOW_FIELD_SELECT = QFLOW_FIELD_SELECT
    static QFLOW_FIELD_CHECKBOX = QFLOW_FIELD_CHECKBOX
    static QFLOW_FIELD_RADIO = QFLOW_FIELD_RADIO
    static QFLOW_FIELD_DATE = QFLOW_FIELD_DATE
    static QFLOW_FIELD_TIME = QFLOW_FIELD_TIME
    static QFLOW_FIELD_FILE = QFLOW_FIELD_FILE
    static QFLOW_FIELD_APPROVE = QFLOW_FIELD_APPROVE
    static QFLOW_FIELD_BRANCH = QFLOW_FIELD_BRANCH
    static QFLOW_FIELD_SUB_FLOW = QFLOW_FIELD_SUB_FLOW

    static QFLOW_STEP_OWNER_FIELD_TYPE = [QFLOW_FIELD_RTX, QFLOW_FIELD_SELECT]

    static QFLOW_FIELD_DESCRIPTION = {

        [QFLOW_FIELD_INPUT] : "单行文本",
        [QFLOW_FIELD_TEXTAREA] : "多行文本",
        //[QFLOW_FIELD_INFO] : "仅确认文本",
        //[QFLOW_FIELD_RTX]  : "人员输入框",
        [QFLOW_FIELD_SELECT] : "下拉框",
        [QFLOW_FIELD_CHECKBOX] : "复选框",
        [QFLOW_FIELD_RADIO] : "单选框",
        //[QFLOW_FIELD_DATE] : "日期",
        //[QFLOW_FIELD_TIME] : "时间",
        //[QFLOW_FIELD_FILE] : "文件",
        [QFLOW_FIELD_APPROVE] : "审批",
        [QFLOW_FIELD_BRANCH] : "分支",
        //[QFLOW_FIELD_SUB_FLOW] : "子流程"

    }

    static QFLOW_FIELD_LIST = [

        QFLOW_FIELD_INPUT,
        QFLOW_FIELD_TEXTAREA,
        //QFLOW_FIELD_INFO,
        //QFLOW_FIELD_RTX,
        QFLOW_FIELD_SELECT,
        QFLOW_FIELD_CHECKBOX,
        QFLOW_FIELD_RADIO,
        //QFLOW_FIELD_DATE,
        //QFLOW_FIELD_TIME,
        //QFLOW_FIELD_FILE

    ]

    static QFLOW_VALUE_FIELD_LIST = [QFLOW_FIELD_SELECT, QFLOW_FIELD_CHECKBOX, QFLOW_FIELD_RADIO]
    static QFLOW_RADIO_FIELD_LIST = [
        QFLOW_FIELD_RADIO, 
        QFLOW_FIELD_APPROVE
    ]
    static QFLOW_CHECKBOX_FIELD_LIST = [
        QFLOW_FIELD_CHECKBOX,
        QFLOW_FIELD_BRANCH,
        QFLOW_FIELD_SUB_FLOW
    ]


    //tool相关
    static QFLOW_PRODUCT_TOOL_TYPE = "2"
    static QFLOW_SYSTEM_TOOL_TYPE = "0"
    
    

}

export default QflowType;
