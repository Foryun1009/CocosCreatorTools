import FYMessenger from "./FYMessenger";

const {ccclass, property} = cc._decorator;
/** 特效控制器 */
@ccclass
export default class FYEffectControl extends cc.Component {
    @property({
        type: cc.ParticleSystem
    })
    public partical: cc.ParticleSystem = null;

    public playPartical(){
        this.partical.node.active = true;
        this.partical.resetSystem();
    }

    public stopPartical(){
        this.partical.node.active = false;
        this.partical.stopSystem();
    }
    

    start () {
        
    }

    
}
