import FYBaseNode from "./FYBaseNode";
import FYMessenger from "./FYMessenger";

const { ccclass, property } = cc._decorator;
/**
 * 界面基类
 */
@ccclass
export default class FYBaseUIPanel extends FYBaseNode {
    /** 设置Widget节点 */
    @property(cc.Node)
    public nodeWidget: cc.Node = null;

    /**
     * 设置节点激活状态
     * @param bActive 是否激活
     */
    setActive(bActive) {
        if (this.nodeWidget) {
            this.nodeWidget.active = bActive;
        }
    }

    addListener() {
        super.addListener();
        FYMessenger.Instance.add(this.node.name, this.onShow, this);
    }

    removeListener() {
        super.removeListener();
        FYMessenger.Instance.remove(this.node.name, this.onShow, this);
    }

    onShow(msgType, param) {
        
    }
}
