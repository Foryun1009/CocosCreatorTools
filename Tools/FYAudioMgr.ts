import FYResMgr from "./FYResMgr";
import QQLMGameSDK from "../SDK/QQLMGameSDK";
import { FYE } from "./FYE";

export default class FYAudioMgr {
    public static readonly Instance: FYAudioMgr = new FYAudioMgr();
    private constructor() { }

    private arrayMusic = {};
    private arraySound = {};
    private _bMute = false;
    private _curType: FYE.MusicType = FYE.MusicType.MainBg;

    public init() {
        if (!QQLMGameSDK.Switch) {
            return;
        }
        // for (let i in FYResMgr.Instance.dictMusic) {
        //     let audioContext = new BK.Audio(0, "GameRes://" + FYResMgr.Instance.dictMusic[i].nativeUrl, -1);
        //     // let audioContext = BK.createAudioContext();
        //     // audioContext.src = "GameRes://" + FYResMgr.Instance.dictMusic[i].nativeUrl;
        //     // audioContext.loop = true;
        //     this.arrayMusicQQ[i] = audioContext;
        // }

        // for (let i in FYResMgr.Instance.dictSound) {
        //     let audioContext = BK.createAudioContext();
        //     audioContext.src = "GameRes://" + FYResMgr.Instance.dictSound[i].nativeUrl;
        //     this.arraySoundQQ[i] = audioContext;
        // }

        // this.playMusic(this._curType);
    }

    public getSound(type: FYE.SoundType) {
        if (type in this.arraySound) {
            return this.arraySound[type];
        } else {
            if (QQLMGameSDK.Switch) {
                let audioContext = BK.createAudioContext();
                audioContext.src = "GameRes://" + FYResMgr.Instance.dictSound[type].nativeUrl;
                this.arraySound[type] = audioContext;
            } else {
                let audioSource = new cc.AudioSource();
                audioSource.clip = FYResMgr.Instance.dictMusic[type];
                this.arraySound[type] = audioSource;
            }

            return this.arraySound[type];
        }
    }

    public getMusic(type: FYE.MusicType) {
        if (type in this.arrayMusic) {
            return this.arrayMusic[type];
        } else {
            if (QQLMGameSDK.Switch) {
                let audioContext = new BK.Audio(0, "GameRes://" + FYResMgr.Instance.dictMusic[type].nativeUrl, -1);
                // let audioContext = BK.createAudioContext();
                // audioContext.src = "GameRes://" + FYResMgr.Instance.dictMusic[type].nativeUrl;
                // audioContext.loop = true;
                this.arrayMusic[type] = audioContext;
            } else {
                let audioSource = new cc.AudioSource();
                audioSource.clip = FYResMgr.Instance.dictMusic[type];
                audioSource.loop = true;
                this.arrayMusic[type] = audioSource;
            }

            return this.arrayMusic[type];
        }
    }

    public playSound(type: C.SoundType) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        if (this._bMute) {
            return;
        }

        if (QQLMGameSDK.Switch) {
            let sound = this.getSound(type);
            sound.seek(0);
            sound.play();
        } else {
            let sound: cc.AudioSource = this.getSound(type);
            sound.play();
        }
    }

    public playMusic(type: FYE.MusicType) {
        if (this._bMute) {
            return;
        }

        console.log("---> 播放背景音乐 <---");

        if (QQLMGameSDK.Switch) {
            let music = this.getMusic(type);
            music.startMusic();
        } else {
            let music: cc.AudioSource = this.getMusic(type);
            music.play();
        }
        this._curType = type;


    }

    public resumePre() {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        if (this._bMute) {
            return;
        }
        let music = this.getMusic(this._curType);
        // music.play({ loop: true })
        music.startMusic();
    }

    public stopAllMusic() {
        if (!QQLMGameSDK.Switch) {
            return;
        }
        for (let i in this.arrayMusic) {
            this.getMusic(<FYE.MusicType>i).stop();
            // this.getMusic(i).stopMusic();
        }
    }

    public stopAllSound() {
        if (!QQLMGameSDK.Switch) {
            return;
        }
        for (let i in this.arraySound) {
            this.getSound(<FYE.SoundType>i).stop();
        }

        this.arraySound = {};
    }

    public destroyAll() {
        for (let i in this.arrayMusic) {
            this.arrayMusic[i].destroy();
        }

        for (let i in this.arraySound) {
            this.arraySound[i].destroy();
        }

        this.arrayMusic = {};
        this.arraySound = {};
    }

    /**
     * 静音
     * @param bMute 是否静音
     */
    public Mute(bMute) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        this._bMute = bMute;
        if (this._bMute) {
            this.destroyAll();
            // this.stopAllMusic();
            // this.stopAllSound();
            console.log("---> 静音")
        } else {
            this.playMusic(this._curType);
            console.log("---> 恢复声音")
        }
    }
}
