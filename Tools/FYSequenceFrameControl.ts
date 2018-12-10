import FYUtility from "./FYUtility";

const { ccclass, property } = cc._decorator;
/**
 * 序列帧动画控制器
 */
@ccclass
export default class FYSequenceFrameControl extends cc.Component {
    /** 图片数组 */
    @property({
        type: Array(cc.Node),
        displayName: "图片数组"
    })
    arraySprite: Array<cc.Node> = [];
    /** 间隔时间 */
    @property({
        type: cc.Float,
        displayName: "间隔时间",
    })
    interval: number = 0.1;
    /** 延迟时间 */
    @property({
        type: cc.Float,
        displayName: "延迟时间",
    })
    delay: number = 0.1;
    /** 播放次数 */
    @property({
        type: cc.Integer,
        displayName: "播放次数",
    })
    playCount: number = -1;
    /** 是否启动就播放 */
    @property({
        displayName: "是否启动就播放"
    })
    isPlayOnLoad: boolean = false;
    /** 是否自动删除 */
    @property({
        displayName: "是否自动删除"
    })
    isAutoDestroy: boolean = false;
    /** 随机开始索引 */
    @property({
        displayName: "是否随机开始索引"
    })
    isRandomStartIndex: boolean = false;
    /** 当前图片索引 */
    private _curIndex = 0;
    /** 当前播放次数 */
    private _curPlayCount = 0;
    /** 执行完成回调 */
    private _callback: Function = null;

    updateSprite() {
        this._curIndex++;
        if (this._curIndex >= this.arraySprite.length) {
            // 一轮结束
            this._curIndex = 0;
            // 如果播放次数大于0才走逻辑，否则无限循环
            if (this.playCount > 0) {
                this._curPlayCount++;
                if (this._curPlayCount >= this.playCount) {
                    // 结束序列帧
                    this.stop();
                    // 执行完毕
                    if (this._callback) {
                        this._callback();
                    }
                    // 是否删除
                    if (this.isAutoDestroy) {
                        this.node.destroy();
                        this.destroy();
                    }
                    return;
                }
            }
        }
        this._curIndex = this._curIndex % this.arraySprite.length
        let index = (this._curIndex - 1 + this.arraySprite.length) % this.arraySprite.length;
        this.arraySprite[index].active = false;
        this.arraySprite[this._curIndex % this.arraySprite.length].active = true;
    }

    /** 播放序列帧 */
    public play() {
        this._curPlayCount = 0;
        this.stop();
        if (this.isRandomStartIndex) {
            this.arraySprite[0].active = false;
            this._curIndex = FYUtility.getRangeRandom(0, this.arraySprite.length - 1);
        }
        this.schedule(this.updateSprite, this.interval, cc.macro.REPEAT_FOREVER, this.delay);
    }

    /** 停止序列帧 */
    public stop() {
        this.unschedule(this.updateSprite);
    }

    /** 设置完成回调 */
    public setCompleteCallback(cb: Function) {
        this._callback = cb;
    }

    /** 获取当前索引 */
    public getCurIndex() {
        return this._curIndex;
    }

    /** 设置当前索引 */
    public setCurIndex(index) {
        this._curIndex = index;
        this._curIndex = this._curIndex % this.arraySprite.length
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        if (this.isPlayOnLoad) {
            this.play();
        }
    }

    // update (dt) {}
}
