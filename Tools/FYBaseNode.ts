
const { ccclass, property } = cc._decorator;
/** 自己封装的Node基类 */
@ccclass
export default class FYBaseNode extends cc.Component {
    /**
     * 添加监听
     */
    addListener(){

    }

    /**
     * 移除监听
     */
    removeListener(){

    }

    /* -------------------生命周期--------------------- */

    start(){
        
    }

    onEnable(){
        this.addListener();
    }

    onDisable(){
        this.removeListener();
    }
}
