
const { ccclass, property } = cc._decorator;

/**
 * 全局变量管理器
 */
@ccclass
export default class FYGlobalVarMgr {
    public static readonly Instance: FYGlobalVarMgr = new FYGlobalVarMgr();
    private constructor() { }

    /** 重置，切场景之后，要重新获取 */
    public reset() {
        this._nodeCanvas = null;
        this._canvas = null;
        this._nodeBottom = null;
        this._nodeCenter = null;
        this._nodeTop = null;
    }

    private _nodeCanvas: cc.Node = null;
    get NodeCanvas(): cc.Node {
        if (!this._nodeCanvas) {
            this._nodeCanvas = this._nodeCanvas = cc.director.getScene().getChildByName("Canvas");
        }
        return this._nodeCanvas;
    }

    private _canvas: cc.Canvas = null;
    /**
     * 获取Canvas对象
     */
    public get Canvas() {
        if (!this._canvas) {
            this._canvas = this.NodeCanvas.getComponent(cc.Canvas);
        }
        return this._canvas;
    }

    private _nodeBottom: cc.Node = null;
    /**
     * 获取Bottom节点
     */
    get NodeBottom(): cc.Node {
        if (!this._nodeBottom) {
            this._nodeBottom = this.NodeCanvas.getChildByName("Bottom");
        }
        return this._nodeBottom;
    }

    private _nodeCenter: cc.Node = null;
    /**
     * 获取Center节点
     */
    get NodeCenter(): cc.Node {
        if (!this._nodeCenter) {
            this._nodeCenter = this.NodeCanvas.getChildByName("Center");
        }
        return this._nodeCenter;
    }

    private _nodeTop: cc.Node = null;
    /**
     * 获取Top节点
     */
    get NodeTop(): cc.Node {
        if (!this._nodeTop) {
            this._nodeTop = this.NodeCanvas.getChildByName("Top");
        }
        return this._nodeTop;
    }

    private _nodeSub: cc.Node = null;
    /**
     * 获取Top节点
     */
    get NodeSub(): cc.Node {
        if (!this._nodeSub) {
            this._nodeSub = this.NodeCanvas.getChildByName("Sub");
        }
        return this._nodeSub;
    }

    private _nDesignSize: cc.Size = cc.Size.ZERO;
    /**
     * 设计尺寸
     */
    public get DesignSize() {
        if (this._nDesignSize.width == 0 && this._nDesignSize.height == 0) {
            this._nDesignSize = this.NodeCanvas.getComponent(cc.Canvas).designResolution;
        }
        return this._nDesignSize;
    }

    /**
     * 屏幕尺寸
     */
    public get WinSize() {
        return cc.winSize;
    }
}
