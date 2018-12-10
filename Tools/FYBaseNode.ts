import FYLog from "./FYLog";

const { ccclass, property } = cc._decorator;
/** 自己封装的Node基类 */
@ccclass
export default class FYBaseNode extends cc.Component {

    public setWorldPostion(pos: cc.Vec2) {
        // 改变世界坐标，同时也要更新本地坐标
        this.node.position = this.node.parent.convertToNodeSpaceAR(pos);
    }

    public getWorldPosition() {
        return this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
    }

    /**
     * 获取在指定目标对象里面的坐标
     * @param target 目标对象
     */
    public getInTargetSpacePos(target: cc.Node) {
        if (target instanceof cc.Node) {
            return this.node.parent.convertToNodeSpaceAR(this.getWorldPosition());
        }

        FYLog.error("target is null");

        return cc.Vec2.ZERO;
    }

    /**
     * 添加监听
     */
    addListener() {

    }

    /**
     * 移除监听
     */
    removeListener() {

    }

    /* ------------------- 回调 ---------------------- */

    /* -------------------生命周期--------------------- */

    start() {

    }

    onEnable() {
        this.addListener();
    }

    onDisable() {
        this.removeListener();
    }
}
