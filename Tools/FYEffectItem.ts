
const { ccclass, property } = cc._decorator;
/**
 * 特效Item
 */
@ccclass
export default class FYEffectItem extends cc.Component {
    /**
     * 动作列表
     */
    @property({
        type: Array(cc.Animation),
        displayName: "动作列表"
    })
    public listAnimation: Array<cc.Animation> = [];
    /**
     * 特效列表
     */
    @property({
        type: Array(cc.ParticleSystem),
        displayName: "特效列表"
    })
    public listParticleSystem: Array<cc.ParticleSystem> = [];

    public play() {
        for (let i = 0; i < this.listAnimation.length; i++) {
            this.listAnimation[i].node.active = true;
            this.listAnimation[i].play();
        }

        for (let i = 0; i < this.listParticleSystem.length; i++) {
            this.listParticleSystem[i].node.active = true;
            this.listParticleSystem[i].resetSystem();
        }
    }

    public stop() {
        for (let i = 0; i < this.listAnimation.length; i++) {
            this.listAnimation[i].node.active = false;
            this.listAnimation[i].stop();
        }

        for (let i = 0; i < this.listParticleSystem.length; i++) {
            this.listParticleSystem[i].node.active = false;
            this.listParticleSystem[i].stopSystem();
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

}
