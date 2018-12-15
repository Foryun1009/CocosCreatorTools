import FYScheduleMgr from "./FYScheduleMgr";
import FYLog from "./FYLog";

/** 文本动画管理器 */
export default class FYTextTweenMgr {
    public static readonly Instance: FYTextTweenMgr = new FYTextTweenMgr();
    private constructor() { }
    /** Label对象 */
    private _labContent: cc.Label = null;
    /** 文本的内容 */
    private _strContent: string = "";
    /** 文本头扩展字符串 */
    private _strHeadEx: string = "";
    /** 最大高度 */
    private _nMaxHeight: number = 0;
    /** 文本当前索引 */
    private _nContentIndex: number = 0;
    /** 每个字符的间隔时间 */
    private _nEachWordInterval: number = 0.1;
    /** 动画回调句柄 */
    private _handlerTextTweenCB: Function = null;
    /** 动画播放完毕回调句柄 */
    private _handlerTextTweenFinishCB: Function = null;

    /**
     * 初始化Label对象
     * @param label 要显示文本的Label
     * @param maxHeight 文本最大高度
     */
    public initLabel(label: cc.Label, maxHeight: number) {
        this._labContent = label;
        this._nMaxHeight = maxHeight;
        if (this._labContent instanceof cc.Label) {
            this._labContent.node.anchorY = 1;
            this._labContent.verticalAlign = cc.Label.VerticalAlign.TOP;
            this._labContent.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        }
    }

    /**
     * 初始化文本对象
     * @param text 要显示在Label的文本
     */
    public initText(text: string) {
        this._strContent = text;
        this._nContentIndex = 0;
        this._strHeadEx = "";
    }

    /**
     * 初始化每个字符的间隔时间
     * @param eachWordInterval 每个字符的间隔时间
     */
    public initEachWordInterval(eachWordInterval: number) {
        this._nEachWordInterval = eachWordInterval;
    }

    /**
     * 清空文本
     */
    public clearLabel() {
        this._labContent.string = "";
        this._labContent.verticalAlign = cc.Label.VerticalAlign.TOP;
        this._labContent.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
    }

    /**
     * 文本动画回调
     */
    private textTweenCB() {
        this._nContentIndex++;
        this._labContent.string = this._strHeadEx + this._strContent.substring(0, this._nContentIndex);
        FYLog.log("刷新文本 _nContentIndex = " + this._nContentIndex + ", _nEachWordInterval = " + this._nEachWordInterval + ", _strContent = " + this._strContent.length);
        FYLog.log("高度" + this._labContent.lineHeight);

        if (this._labContent.node.height > this._nMaxHeight) {
            // 如果超过最大高度，则固定高度，文本上移
            this._labContent.verticalAlign = cc.Label.VerticalAlign.BOTTOM;
            this._labContent.overflow = cc.Label.Overflow.CLAMP;
            this._labContent.node.height = this._nMaxHeight;
        }

        if (this._nContentIndex == this._strContent.length && this._handlerTextTweenFinishCB) {
            // 动画播放完毕
            this._handlerTextTweenFinishCB();
        }
    }

    /**
     * 播放文本动画回调
     * @param cb 文本动画回调
     */
    public playTextTween(cb: Function, bClearLabel?: boolean) {
        this._handlerTextTweenFinishCB = cb;

        if (!this._labContent || !this._strContent.length || this._strContent.length == 0) {
            if (this._handlerTextTweenFinishCB) {
                this._handlerTextTweenFinishCB();
            }
            return;
        }

        if (bClearLabel) {
            this.clearLabel();
        }

        // 把文本头部的空格提取出来，不占用动画时长
        let num = this._strContent.length;
        this._strContent = this._strContent.trim();
        for (let i = 0; i < num - this._strContent.length; i++) {
            this._strHeadEx += " ";
        }

        this._handlerTextTweenCB = this.textTweenCB.bind(this)
        FYScheduleMgr.Instance.schedule(this._handlerTextTweenCB, this._labContent, this._nEachWordInterval, this._strContent.length - 1 - this._nContentIndex, 0);
    }

    /**
     * 改变每个字符的间隔时间 在动画播放过程中更改 会立即改变动画速度
     * @param eachWordInterval 每个字符的间隔时间
     */
    public changeEachWordInterval(eachWordInterval: number) {
        this._nEachWordInterval = eachWordInterval;
        FYScheduleMgr.Instance.unschedule(this._handlerTextTweenCB, this._labContent);
        this.playTextTween(this._handlerTextTweenFinishCB);
    }



}
