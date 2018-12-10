import FYMessenger from "./FYMessenger";
import FYGlobalVarMgr from "./FYGlobalVarMgr";
import FYUtility from "./FYUtility";
import FYBaseUIPanel from "./FYBaseUIPanel";
import FYLog from "./FYLog";

const { ccclass, property } = cc._decorator;
/**
 * UI管理器
 */
@ccclass
export default class FYUIMgr {
    public static readonly Instance: FYUIMgr = new FYUIMgr();
    private constructor() { }
    /** 正在加载UI预制 */
    public static readonly MsgPreLoadUIProgress = "PreLoadUIProgress";
    /** 图集加载完毕 */
    public static readonly MsgPreLoadUIComplete = "PreLoadUIComplete";

    /** UI预制字典 */
    private _dictUIPrefab = {};
    /** UI界面字典 */
    private _dictUIPanel: { [key: string]: FYBaseUIPanel } = {};

    /**
     * 预加载UI预制 路径是resources/prefabs/UI
     */
    public preLoad() {
        let self = this;
        cc.loader.loadResDir("prefabs/UI", cc.Prefab, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYUIMgr.MsgPreLoadUIProgress, completedCount, totalCount)
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self._dictUIPrefab[assets[i]._name] = assets[i].data;
                }
                FYMessenger.Instance.send(FYUIMgr.MsgPreLoadUIComplete);
            });
    }

    /**
     * 显示界面
     * @param uiName 界面名字
     * @param parent 父对象
     * @param param 参数
     */
    public show(uiName, parent = FYGlobalVarMgr.Instance.NodeTop, ...param) {
        if (!parent) {
            parent = FYGlobalVarMgr.Instance.NodeTop;
        }
        if (!this._dictUIPrefab[uiName]) {
            FYLog.error(uiName + " is not prelaod");
            return;
        }

        if (this._dictUIPanel[uiName]) {
            this._dictUIPanel[uiName].setActive(true);
        } else {
            this._dictUIPanel[uiName] = FYUtility.addChild(parent, this._dictUIPrefab[uiName]).getComponent(FYBaseUIPanel);
        }
        this._dictUIPanel[uiName].node.setSiblingIndex(this._dictUIPanel[uiName].node.parent.childrenCount);
        FYMessenger.Instance.send(uiName, param);
    }

    /**
     * 隐藏界面
     * @param uiName 界面名字
     */
    public hide(uiName) {
        if (this._dictUIPanel[uiName]) {
            this._dictUIPanel[uiName].setActive(false);
        }
    }

    /**
     * 关闭界面
     * @param uiName 界面名字
     */
    public close(uiName) {
        if (this._dictUIPanel[uiName]) {
            this._dictUIPanel[uiName].node.destroy();
            delete this._dictUIPanel[uiName];
        }
    }

}
