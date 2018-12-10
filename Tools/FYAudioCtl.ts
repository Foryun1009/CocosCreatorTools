import FYUtility from "./FYUtility";

const { ccclass, property } = cc._decorator;
/** 音乐控制器 */
@ccclass
export default class FYAudioCtl extends cc.Component {
    /** 音效数组 */
    @property({
        type: Array(cc.AudioSource),
        displayName: "音效数组",
    })
    arraySound: Array<cc.AudioSource> = [];
    /** 音乐数组 */
    @property({
        type: Array(cc.AudioSource),
        displayName: "音乐数组"
    })
    arrayMusic: Array<cc.AudioSource> = [];

    private static _instance: FYAudioCtl = null;
    /** 单例 */
    public static get Instance(): FYAudioCtl {
        return FYAudioCtl._instance;
    }

    _bOpenSound = true;
    _bOpenMusic = true;

    _nPlayingMusic = -1;

    /**
     * 播放音效
     * @param type 音效类型
     */
    playSound(type: number) {
        if (this.arraySound[type] && this._bOpenSound) {
            FYUtility.log("-----------playSound------", type)
            //this.arraySound[type].setCurrentTime(0);
            //console.log(this.arraySound[type].)

            //消除方块的声音
            // let audioNode = FYUtility.addChild(this.node, this.arraySound[type].node);
            // let audioClip = audioNode.getComponent(cc.AudioSource);
            // audioClip.play();

            // let nLength = audioClip.getDuration();
            // console.log("-----------nLength------", nLength);
            // this.scheduleOnce(function () {
            //     audioClip.destroy();
            // }, 2.0);
            this.arraySound[type].setCurrentTime(0);
            this.arraySound[type].play();
        }
    }


    //curPlayingMusicObj: cc.Node = null;
    /**
     * 播放音乐
     * @param type 音乐类型
     */
    playMusic(type: number) {
        if (this._nPlayingMusic != type) {
            if (this.arrayMusic[this._nPlayingMusic]) {
                this.arrayMusic[this._nPlayingMusic].stop();
            }
            if (this.arrayMusic[type]) {
                this.arrayMusic[type].play();
            }
            this._nPlayingMusic = type;
        }
        // console.log("--------------play--before---", type, this._nPlayingMusic);
        // if (this.arrayMusic[type] && this._bOpenMusic) {
        //     if (this._nPlayingMusic != type && this.arrayMusic[this._nPlayingMusic]) {
        //         console.log("--------------stop-----", this._nPlayingMusic);
        //         // this.curPlayingMusicObj.destroy();
        //         this.arrayMusic[this._nPlayingMusic].stop();
        //     }
        //     if (this._nPlayingMusic != type) {
        //         console.log("--------------play-----", type);

        //         this.arrayMusic[type].play();
        //         // this.curPlayingMusicObj = FYUtility.addChild(this.node, this.arrayMusic[type].node);
        //         // let audioPlayingClip = this.curPlayingMusicObj.getComponent(cc.AudioSource);
        //         // audioPlayingClip.play();
        //     }
        // }
        // this._nPlayingMusic = type;
        // console.log("--------------after-----", this._nPlayingMusic);
    }

    rewindMusic() {

        if (this.arrayMusic[this._nPlayingMusic]) {
            this.arrayMusic[this._nPlayingMusic].resume()
        }
        // if (this._bOpenMusic) {
        //     this.arrayMusic[0].play()
        // }
        // if (this.arrayMusic[this._nPlayingMusic]) {
        //     //this.curPlayingMusicObj.destroy();
        //     //this.arrayMusic[this._nPlayingMusic].stop()
        //     // this.curPlayingMusicObj = FYUtility.addChild(this.node, this.arrayMusic[this._nPlayingMusic].node);
        //     // let audioPlayingClip = this.curPlayingMusicObj.getComponent(cc.AudioSource);
        //     // audioPlayingClip.play();
        //     this.arrayMusic[this._nPlayingMusic].play()
        // }

    }


    pauseSound(type: number) {
        if (this.arraySound[type]) {
            this.arraySound[type].pause();
        }
    }

    pauseMusic(type: number) {
        if (this.arrayMusic[type]) {
            this.arrayMusic[type].pause();
        }
    }

    stopSound(type: number) {
        if (this.arraySound[type]) {
            this.arraySound[type].stop();
        }
    }

    stopMusic(type: number) {
        if (this.arrayMusic[type]) {
            this.arrayMusic[type].stop();
        }
    }

    /**
     * 改变音效音量
     * @param nVolume 音频源的音量（0.0 ~ 1.0）
     */
    changeSoundVolume(nVolume: number) {
        for (let i = 0; i < this.arraySound.length; i++) {
            if (this.arraySound[i]) {
                this.arraySound[i].volume = nVolume;
            }

        }
    }

    /**
     * 改变音乐音量
     * @param nVolume 音频源的音量（0.0 ~ 1.0）
     */
    changeMusicVolume(nVolume: number) {
        for (let i = 0; i < this.arrayMusic.length; i++) {
            if (this.arrayMusic[i]) {
                this.arrayMusic[i].volume = nVolume;
                this.arrayMusic[i].play();
            }
        }
    }

    onLoad() {
        FYAudioCtl._instance = this;
    }
}
