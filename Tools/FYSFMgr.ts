import FYResMgr from "../Tools/FYResMgr";
import FYSequenceFrameControl from "../Tools/FYSequenceFrameControl";

const { ccclass, property } = cc._decorator;
/** 序列帧管理器 */
@ccclass
export default class FYSFMgr {
    public static readonly Instance: FYSFMgr = new FYSFMgr();
    private constructor() { }

    /** 对象池 */
    private _dictSFPool: { [key: string]: cc.NodePool } = {};

    /**
     * 把对象放进对象池
     * @param node 节点
     */
    public poolPut(node: cc.Node) {
        if (this._dictSFPool && this._dictSFPool.hasOwnProperty(node.name)) {
            this._dictSFPool[node.name].put(node);
        } else {
            this._dictSFPool[node.name] = new cc.NodePool();
            this._dictSFPool[node.name].put(node);
        }
    }

    /**
     * 从对象池拿对象
     * @param nodeName 名字
     */
    public poolGet(nodeName: string): cc.Node {
        if (this._dictSFPool && this._dictSFPool.hasOwnProperty(nodeName) && this._dictSFPool[nodeName].size() > 0) {
            return this._dictSFPool[nodeName].get();
        } else {
            return cc.instantiate(FYResMgr.Instance.loadSequenceFrame(nodeName));
        }
    }

    /**
     * 播放序列帧
     * @param sfName 序列帧名字
     * @param v2Pos 位置
     * @param parent 父对象
     */
    public playSF(sfName: string, v2Pos: cc.Vec2, parent: cc.Node) {
        let sfNode = this.poolGet(sfName);
        sfNode.parent = parent;
        sfNode.setPosition(v2Pos);

        let sf = sfNode.getComponent(FYSequenceFrameControl);
        let self = this;
        sf.setCompleteCallback(function () {
            self.poolPut(sfNode);
        });
        sf.play();
    }
}
