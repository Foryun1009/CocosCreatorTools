import FYMessenger from "./FYMessenger";

const { ccclass, property } = cc._decorator;
/** 资源管理器 */
@ccclass
export default class FYResMgr {
    /** 单例 */
    public static readonly Instance: FYResMgr = new FYResMgr();
    private constructor() { }
    /** 加载图集中 */
    public static readonly MsgPreLoadAtlasProgress = "PreLoadAtlasProgress";
    /** 加载特效资源中 */
    public static readonly MsgPreLoadEffectProgress = "MsgPreLoadEffectProgress";
    /** 加载序列帧资源中 */
    public static readonly MsgPreLoadSequenceFrameProgress = "MsgPreLoadSequenceFrameProgress";
    /** 加载其他资源中 */
    public static readonly MsgPreLoadOtherProgress = "MsgPreLoadOtherProgress";
    /** 加载图集完毕 */
    public static readonly MsgPreLoadAtlasComplete = "PreLoadAtlasComplete";
    /** 加载特效资源完毕 */
    public static readonly MsgPreLoadEffectComplete = "PreLoadEffectComplete";
    /** 加载序列帧资源完毕 */
    public static readonly MsgPreLoadSequenceFrameComplete = "MsgPreLoadSequenceFrameComplete";
    /** 加载其他资源完毕 */
    public static readonly MsgPreLoadOtherComplete = "MsgPreLoadOtherComplete";
    /** 加载资源完毕 */
    public static readonly MsgPreLoadComplete = "PreLoadComplete";

    /** 图集字典 */
    public dictAtlas = {};
    /** 特效字典 */
    public dictEffect = {};
    /** 序列帧字典 */
    public dictSequenceFrame = {};
    /** 其他资源字典 */
    public dictOther = {};

    /**
     * 预加载图集
     */
    public preLoadAltlas() {
        let self = this;
        cc.loader.loadResDir("atlas", cc.SpriteAtlas, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadAtlasProgress, completedCount, totalCount);
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    for (let name in assets[i]._spriteFrames) {
                        self.dictAtlas[assets[i]._spriteFrames[name]._name] = assets[i]._spriteFrames[name];
                    }

                }

                FYMessenger.Instance.send(FYResMgr.MsgPreLoadAtlasComplete);
            });
    }

    /**
     * 预加载特效
     */
    public preLoadEffect() {
        let self = this;
        cc.loader.loadResDir("prefabs/Effect", cc.Prefab, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadEffectProgress, completedCount, totalCount)
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictEffect[assets[i]._name] = assets[i].data;
                }
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadEffectComplete);
            });
    }

    /**
     * 预加载序列帧
     */
    public preLoadSequenceFrame() {
        let self = this;
        cc.loader.loadResDir("prefabs/SequenceFrame", cc.Prefab, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadSequenceFrameProgress, completedCount, totalCount)
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictSequenceFrame[assets[i]._name] = assets[i].data;
                }
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadSequenceFrameComplete);
            });
    }

    /**
     * 预加载其他资源
     */
    public preLoadOther() {
        let self = this;
        cc.loader.loadResDir("prefabs/Other", cc.Prefab, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadOtherProgress, completedCount, totalCount)
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictOther[assets[i]._name] = assets[i].data;
                }
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadOtherComplete);
            });
    }

    /**
     * 加载图片
     * @param spriteFrameName 图片名
     */
    public loadSpriteFrame(spriteFrameName) {
        if (spriteFrameName in this.dictAtlas) {
            return this.dictAtlas[spriteFrameName];
        }
        return null;
    }

    /**
     * 加载特效
     * @param effectName 特效名字
     */
    public loadEffect(effectName: string) {
        if (effectName in this.dictEffect) {
            return this.dictEffect[effectName];
        }
        return null;
    }

    /**
     * 播放序列帧
     * @param sequenceFrame 序列帧动画名字
     */
    public loadSequenceFrame(sequenceFrame: string) {
        if (sequenceFrame in this.dictSequenceFrame) {
            return this.dictSequenceFrame[sequenceFrame];
        }
        return null;
    }

    /**
     * 加载其他资源
     * @param otherName 其他资源名字
     */
    public loadOther(otherName: string): cc.Node {
        if (otherName in this.dictOther) {
            return this.dictOther[otherName];
        }
    }
}
