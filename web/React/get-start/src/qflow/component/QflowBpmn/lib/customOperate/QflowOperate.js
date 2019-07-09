import React from 'react';

class QflowOperate extends React.Component {

    constructor(props) {

        super(props);
    
    }

    render() {

        return (

            <div id="operate">
              <ul className="buttons">
                <li>
                  <a 
                    id="js-download-svg"
                    className={this.props.modeler_active_object.download_active ? "active" : null}
                    href = {this.props.modeler_active_object.download_svg_href}
                    download = {this.props.modeler_active_object.download_svg_name}
                  >
                    下载模型svg
                  </a>
                </li>
                <li>
                  <span>|</span>
                </li>
                {/*
                <li>
                  <a 
                    //:class="{active : update_env_active}"
                    //v-on:click = "updateModelerEnv()"
                  >
                    更新模型环境
                  </a>
                </li>
                <li>
                  <span>|</span>
                </li>
                <li>
                  <a 
                    //:class="{active : deployment_active}"
                    //v-on:click = "deployment_visible=true"
                  >
                    保存并启用
                  </a>
                </li>
                
                <li>
                  <span>|</span>
                </li>
                */}
                <li>
                  <a 
                    className={this.props.modeler_active_object.sync_active ? "active" : null}
                    onClick = { () => this.props.syncModeler(false) }
                  >
                    保存草稿
                  </a>
                </li>
                <li>
                    保存时间:<span>{this.props.modeler_active_object.sync_time}</span>
                </li>
                </ul>
            </div>
        );

    }

}

export default QflowOperate;
