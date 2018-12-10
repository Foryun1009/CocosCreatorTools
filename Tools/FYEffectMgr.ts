import FYResMgr from "../Tools/FYResMgr";
import FYEffectItem from "../Tools/FYEffectItem";
import FYScheduleCtl from "../Tools/FYScheduleCtl";

const { ccclass, property } = cc._decorator;
/**
 * 特效管理器
 */
@ccclass
export default class FYEffectMgr {
    /** 单例 */
    public static readonly Instance: FYEffectMgr = new FYEffectMgr();
    private constructor() { }
    /** 特效容器 */
    private _effectContainer: cc.Node = null;

    /** 对象池 */
    private _dictEffectPool: { [key: string]: cc.NodePool } = {};

    /** 
     * 初始化
     */
    public init(effectContainer: cc.Node) {
        this._effectContainer = effectContainer;
    }

    /** 预加载特效 */
    public preLoad() {
    }

    /**
     * 播放特效
     * @param effectName 特效名字
     * @param v2Pos 特效位置
     * @param duration 特效持续时间
     */
    public playEffect(effectName: string, v2Pos: cc.Vec2, duration: number, parent = this._effectContainer) {
        let node = this.add(effectName, v2Pos);
        node.parent = parent;
        FYScheduleCtl.Instance.setScheduleOnce(function () {
            FYEffectMgr.Instance.remove(node);
        }, duration);
        return node;
    }

    /**
     * 添加特效
     * @param effectName 特效名字
     * @param v2Pos 特效位置
     */
    public add(effectName: string, v2Pos: cc.Vec2, parent = this._effectContainer) {
        let node: cc.Node = this.poolGet(effectName);
        if (node == null) {
            node = cc.instantiate(FYResMgr.Instance.loadEffect(effectName));
        }
        node.active = true;
        node.parent = parent;
        node.setPosition(v2Pos);
        node.getComponent(FYEffectItem).play();
        return node;
    }

    /**
     * 移除特效
     * @param nodeEffect 特效节点
     */
    public remove(nodeEffect: cc.Node) {
        this.poolPut(nodeEffect);
    }

    /**
     * 把特效放进对象池
     * @param nodeEffect 特效节点
     */
    public poolPut(nodeEffect: cc.Node) {
        if (this._dictEffectPool && this._dictEffectPool.hasOwnProperty(nodeEffect.name)) {
            // if (nodeEffect.name in this._dictEffectPool) {
            this._dictEffectPool[nodeEffect.name].put(nodeEffect);
        } else {
            this._dictEffectPool[nodeEffect.name] = new cc.NodePool();
            this._dictEffectPool[nodeEffect.name].put(nodeEffect);
        }
    }

    /**
     * 从对象池拿对象
     * @param effectName 特效名字
     */
    public poolGet(effectName: string) {
        if (this._dictEffectPool && this._dictEffectPool.hasOwnProperty(effectName) && this._dictEffectPool[effectName].size() > 0) {
            // if (effectName in this._dictEffectPool && this._dictEffectPool[effectName].size() > 0) {
            return this._dictEffectPool[effectName].get();
        }
        return null;
    }
}
