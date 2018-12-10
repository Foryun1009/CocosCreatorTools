
const { ccclass, property } = cc._decorator;
/**
 * 补间动画管理器
 */
@ccclass
export default class FYTweenMgr {
	/**
      * 移动到目标位置。
      * @param target 目标对象
      * @param duration 持续时间
      * @param x x坐标
      * @param y y坐标
      * @param delayTime 延迟时间
      * @return 动画句柄
	*/
    static moveTo(target: cc.Node, duration: number, x: number, y: number, delayTime: number = 0, callback?: Function): cc.ActionInterval {
        if (target instanceof cc.Node) {

            let action = cc.moveTo(duration, x, y);
            var finished = cc.callFunc(function (target) {
                if (callback) {
                    callback();
                }
            }, this, 0);
            let seq = cc.sequence(cc.delayTime(delayTime), action, finished);
            target.runAction(seq);
            return seq;
        }
        return null;
    }

	/**
      * 移动目标距离。
      * @param target 目标对象
      * @param duration 持续时间
      * @param x x坐标
      * @param y y坐标
      * @param delayTime 延迟时间
      * @return 动画句柄
	*/
    static moveBy(target: cc.Node, duration: number, x: number, y: number, delayTime: number = 0, callback?: Function): cc.ActionInterval {
        if (target instanceof cc.Node) {

            let action = cc.moveBy(duration, x, y);
            var finished = cc.callFunc(function (target) {
                if (callback) {
                    callback();
                }
            }, this, 0);
            let seq = cc.sequence(cc.delayTime(delayTime), action, finished);
            target.runAction(seq);
            return seq;
        }
        return null;
    }

    /**
     * 旋转指定角度
     * @param target 目标对象
     * @param duration 持续时间
     * @param rotate 旋转角度
     * @param delayTime 延迟时间
     * @param callback 完成回调
     */
    static rotateBy(target: cc.Node, duration: number, rotate: number, delayTime: number = 0, callback?: Function): cc.ActionInterval {
        if (target instanceof cc.Node) {

            let action = cc.rotateBy(duration, rotate);
            var finished = cc.callFunc(function (target) {
                if (callback) {
                    callback();
                }
            }, this, 0);
            let seq = cc.sequence(cc.delayTime(delayTime), action, finished);
            target.runAction(seq);
            return seq;
        }
        return null;
    }

    /**
     * 缩放到指定大小
     * @param target 目标对象
     * @param duration 持续时间
     * @param x x轴缩放大小
     * @param y y轴缩放大小
     * @param delayTime 延迟时间
     * @param callback 回调
     */
    static scaleTo(target: cc.Node, duration: number, x: number, y: number, delayTime: number = 0, callback?: Function): cc.ActionInterval {
        if (target instanceof cc.Node) {

            let action = cc.scaleTo(duration, x, y);
            var finished = cc.callFunc(function (target) {
                if (callback) {
                    callback();
                }
            }, this, 0);
            let seq = cc.sequence(cc.delayTime(delayTime), action, finished);
            target.runAction(seq);
            return seq;
        }
        return null;
    }

    /**
     * 缩放到指定大小
     * @param target 目标对象
     * @param duration 持续时间
     * @param x x轴缩放大小
     * @param y y轴缩放大小
     * @param delayTime 延迟时间
     * @param callback 回调
     */
    static scaleBigAndSmall(target: cc.Node, duration: number, delayTime: number = 0, forever = false, callback?: Function): cc.ActionInterval {
        if (target instanceof cc.Node) {

            let actionBig = cc.scaleTo(duration / 2, 1.1, 1.1);
            let actionSmall = cc.scaleTo(duration / 2, 0.9, 0.9);
            var finished = cc.callFunc(function (target) {
                if (callback) {
                    callback();
                }
            }, this, 0);
            let seq = cc.sequence(cc.delayTime(delayTime), actionBig, actionSmall, finished);
            if (forever) {
                seq.repeatForever();
            }
            target.runAction(seq);
            return seq;
        }
        return null;
    }

    static scaleBigAndNormal(target: cc.Node, duration: number, x: number, y: number, delayTime: number = 0, forever = false, callback?: Function): cc.ActionInterval {
        if (target instanceof cc.Node) {

            let actionBig = cc.scaleTo(duration / 2, x, y);
            let actionSmall = cc.scaleTo(duration / 2, 1, 1);
            var finished = cc.callFunc(function (target) {
                if (callback) {
                    callback();
                }
            }, this, 0);
            let seq = cc.sequence(cc.delayTime(delayTime), actionBig, actionSmall, finished);
            if (forever) {
                seq.repeatForever();
            }
            target.runAction(seq);
            return seq;
        }
        return null;
    }

    /**
     * 等待多久
     * @param target 目标对象
     * @param duration 持续时间
     * @param callback 回调函数
     */
    static waitBy(target: cc.Node, duration: number, callback: Function): cc.ActionInterval {
        if (target instanceof cc.Node) {

            let action = cc.fadeTo(duration, target.opacity);
            var finished = cc.callFunc(function (target) {
                if (callback) {
                    callback();
                }
            }, this, 0);
            let seq = cc.sequence(action, finished);
            target.runAction(seq);
            return seq;
        }
        return null;
    }

    /**
     * 关闭目标对象所有动画
     * @param target 目标对象
     */
    static stopAllActions(target: cc.Node) {
        if (target instanceof cc.Node) {
            target.stopAllActions();
        }
    }

    /**
     * 关闭目标对象的指定动画
     * @param target 目标对象
     * @param action 动画
     */
    static stopAction(target: cc.Node, action: cc.Action) {
        if (target instanceof cc.Node) {
            target.stopAction(action);
        }
    }
}
