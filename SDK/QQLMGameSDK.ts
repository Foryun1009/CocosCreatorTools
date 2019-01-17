import FYAudioMgr from "../Tools/FYAudioMgr";
import FYUtility from "../Tools/FYUtility";
import FYSDKMgr from "../Tools/FYSDKMgr";
import FYC from "../Tools/FYC";

export enum QQLMGameSDKRankType {
    /** 经典模式 */
    score = "score",
    /** 限时模式 */
    a1 = "a1",
    /** 每日挑战 */
    a2 = "a2",
    a3 = "a3",
    a4 = "a4",
    a5 = "a5",
    a6 = "a6",
    a7 = "a7",
    a8 = "a8",
    a9 = "a9",
    a10 = "a10",
    a11 = "a11",
    a12 = "a12",
    a13 = "a13",
    a14 = "a14",
    a15 = "a15",
    a16 = "a16"
}

export enum QQLMGameSDKSortType {
    /** 从大到小，即每次上报的分数都会与本周期的最高得分比较，如果大于最高得分则覆盖，否则忽略 */
    BigToSmall = 1,
    /** 从小到大，即每次上报的分数都会与本周期的最低得分比较，如果低于最低得分则覆盖，否则忽略 */
    SmallToBig = 2,
    /** 累积，即每次上报的积分都会累积到本周期已上报过的积分上（本质上是从大到小的一种特例） */
    AddUp = 3,
    /** 直接覆盖，每次上报的积分都会将本周期的得分覆盖，不管大小 */
    OverWrite = 4,

}
/** QQ厘米游戏SDK QQ轻游戏 */
export default class QQLMGameSDK {
    public static readonly Instance: QQLMGameSDK = new QQLMGameSDK();
    private constructor() { }

    public static readonly Switch: boolean = cc.sys.platform == cc.sys.QQ_PLAY;

    public gameStartTime: number = 0;

    /** 游戏版本号 */
    public systemInfo_gameVersion: string = "";
    /** 是否房主，1房主，0参加者 */
    public systemInfo_isMaster: number = 0;
    /** 房间号 */
    public systemInfo_roomId: number = 0;
    /** 游戏id */
    public systemInfo_gameId: number = 0;
    /** 系统版本 */
    public systemInfo_osVersion: string = "";
    /** 网络类型 1 电信 ，2 联通 ，3 移动 0: wifi或未知 */
    public systemInfo_networkType: number = 0;
    /** 取值为 ios或android */
    public systemInfo_platform: string = "";
    /** 当前用户的标识 */
    public systemInfo_openId: string = "";
    /** 手机qq版本 */
    public systemInfo_QQVer: string = "";
    /** 是否首次安装 1为首次安装 0非首次安装 */
    public systemInfo_isFirstInstall: number = 0;
    /** 当前聊天窗类型 1.双人聊天 4.群 5.讨论组 */
    public systemInfo_aioType: number = 0;
    /** 游戏启动入口 100:实时PK，200:聊天窗游戏消息 */
    public systemInfo_src: number = 0;
    /** 是否为该游戏管理账号用户，1是，0否 */
    public systemInfo_isWhiteUser: number = 0;
    /** 游戏类型 (手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏 */
    public systemInfo_gameType: number = 0;
    /** 具体机型 (手Q7.6.3及以上支持) 形如 "PRO 6 Plus" */
    public systemInfo_model: string = "";
    /** 性别 1 男 2 女 */
    public systemInfo_sex: number = 1;
    /** 仅在开发环境下可以，手q环境下无该字段 */
    public systemInfo_devPlatform: string = "";
    /** 扩展参数 */
    public systemInfo_gameParam: string = "";

    private _shareInviteIndex = 0;
    /** 分享索引 */
    public get shareInviteIndex() {
        if (this._shareInviteIndex < 1) {
            this._shareInviteIndex = parseInt(FYSDKMgr.Instance.loadLocalData(FYC.ShareInviteIndex, "1"));
        }
        return this._shareInviteIndex;
    }

    public set shareInviteIndex(value) {
        if (this._shareInviteIndex != value) {
            this._shareInviteIndex = value;
            FYSDKMgr.Instance.saveLocalData(FYC.ShareInviteIndex, this._shareInviteIndex);
        }
    }

    /** 获取系统信息 */
    public getSystemInfo() {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        let systemInfo = GameStatusInfo;
        QQLMGameSDK.Instance.systemInfo_gameVersion = systemInfo.gameVersion;
        // QQLMGameSDK.Instance.systemInfo_isMaster = systemInfo.isMaster;   //使用厘米秀房间时才有效
        // QQLMGameSDK.Instance.systemInfo_roomId = systemInfo.roomId; //使用厘米秀房间时才有效
        QQLMGameSDK.Instance.systemInfo_osVersion = systemInfo.osVersion;
        QQLMGameSDK.Instance.systemInfo_networkType = systemInfo.networkType;
        QQLMGameSDK.Instance.systemInfo_gameId = systemInfo.gameId;

        QQLMGameSDK.Instance.systemInfo_platform = systemInfo.platform;
        QQLMGameSDK.Instance.systemInfo_openId = systemInfo.openId;
        QQLMGameSDK.Instance.systemInfo_QQVer = systemInfo.QQVer;

        QQLMGameSDK.Instance.systemInfo_isFirstInstall = systemInfo.isFirstInstall;
        QQLMGameSDK.Instance.systemInfo_aioType = systemInfo.aioType;
        QQLMGameSDK.Instance.systemInfo_src = systemInfo.src;
        QQLMGameSDK.Instance.systemInfo_isWhiteUser = systemInfo.isWhiteUser;
        QQLMGameSDK.Instance.systemInfo_gameType = systemInfo.gameType;
        QQLMGameSDK.Instance.systemInfo_model = systemInfo.model;
        QQLMGameSDK.Instance.systemInfo_sex = systemInfo.sex;

        QQLMGameSDK.Instance.systemInfo_gameParam = systemInfo.gameParam;

        console.log("---> gameVersion = " + QQLMGameSDK.Instance.systemInfo_gameVersion);
        console.log("---> openId = " + QQLMGameSDK.Instance.systemInfo_openId);
        console.log("---> QQVer = " + QQLMGameSDK.Instance.systemInfo_QQVer);
        console.log("---> gameParam = " + QQLMGameSDK.Instance.systemInfo_gameParam);

    }

    /**
     * 获取昵称
     * @param callback 回调
     */
    public getNick(callback) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        BK.MQQ.Account.getNick(QQLMGameSDK.Instance.systemInfo_openId, function (openId, nick) {
            cc.log("nick:" + nick);
            if (callback) {
                callback(nick);
            }
        });
    }

    /**
     * 获取头像
     * @param sprite 设置头像图片的Sprite
     */
    public getHead(sprite: cc.Sprite) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        let absolutePath = "GameSandBox://_head/" + QQLMGameSDK.Instance.systemInfo_openId + ".jpg";
        let isExit = BK.fileSystem.accessSync(absolutePath);
        cc.log(absolutePath + " is exit :" + isExit);
        //如果指定目录中存在此图像就直接显示否则从网络获取
        if (isExit) {
            FYUtility.loadOnlineImage(absolutePath, "jpg", sprite);
        } else {
            BK.MQQ.Account.getHeadEx(QQLMGameSDK.Instance.systemInfo_openId, function (oId, imgPath) {
                cc.log("openId:" + oId + " imgPath:" + imgPath);
                FYUtility.loadOnlineImage(imgPath, "jpg", sprite);
            }.bind(this));
        }
    }

    public getShareQuery() {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        console.log("---> gameParam = " + QQLMGameSDK.Instance.systemInfo_gameParam);

        let gameParam = QQLMGameSDK.Instance.systemInfo_gameParam;
        if (gameParam == undefined || gameParam == null) {
            return "";
        }
        let query = {};

        if (gameParam.match("form=")) {
            if (gameParam.match("&")) {
                let split1 = gameParam.split("&");
                for (let i = 0; i < split1.length; i++) {
                    let split2 = split1[i].split("=");
                    query[split2[0]] = split2[1];
                }
            } else {
                let split1 = gameParam.split("=");
                query[split1[0]] = split1[1];
            }
        } else {
            query = gameParam
        }

        return query;
    }

    public saveGameStartTime() {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        QQLMGameSDK.Instance.gameStartTime = (new Date()).getTime();
    }

    /**
     * 更新排行信息
     * @param rankType 排行类型
     * @param value 更新排行数据
     * @param sortType 排序类型
     */
    public updateRankInfo(rankType: QQLMGameSDKRankType, value: number, sortType: QQLMGameSDKSortType) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        let dictSocreInfo = {};
        let dictAttr = {};
        if (rankType == QQLMGameSDKRankType.score) {
            dictSocreInfo = {
                score: value //分数，类型必须是整型数 这个字段一定需要 不然后报错
            }
            dictAttr = {
                score: {
                    type: 'rank',
                    order: sortType
                }
            }
        } else if (rankType == QQLMGameSDKRankType.a1) {
            dictSocreInfo = {
                score: 0, //分数，类型必须是整型数 这个字段一定需要 不然后报错
                a1: value
            }
            dictAttr = {
                score: {
                    type: 'rank',
                    order: sortType
                },
                a1: {
                    type: 'rank',
                    order: sortType
                }
            }
        } else if (rankType == QQLMGameSDKRankType.a2) {
            dictSocreInfo = {
                score: 0, //分数，类型必须是整型数 这个字段一定需要 不然后报错
                a2: value
            }
            dictAttr = {
                score: {
                    type: 'rank',
                    order: sortType
                },
                a2: {
                    type: 'rank',
                    order: sortType
                }
            }
        }

        let data = {
            userData: [
                {
                    openId: QQLMGameSDK.Instance.systemInfo_openId,
                    startMs: QQLMGameSDK.Instance.gameStartTime.toString(),    //必填，游戏开始时间，单位为毫秒，字符串类型
                    endMs: ((new Date()).getTime()).toString(),  //必填，游戏结束时间，单位为毫秒，字符串类型
                    scoreInfo: dictSocreInfo,
                },
            ],
            // type 描述附加属性的用途
            // order 排序的方式，
            // 1: 从大到小，即每次上报的分数都会与本周期的最高得分比较，如果大于最高得分则覆盖，否则忽略
            // 2: 从小到大，即每次上报的分数都会与本周期的最低得分比较，如果低于最低得分则覆盖，否则忽略
            // 3: 累积，即每次上报的积分都会累积到本周期已上报过的积分上（本质上是从大到小的一种特例）
            // 4: 直接覆盖，每次上报的积分都会将本周期的得分覆盖，不管大小
            // 如score字段对应，上个属性.
            attr: dictAttr,
        };

        // gameMode: 游戏模式，如果没有模式区分，直接填 1
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        BK.QQ.uploadScoreWithoutRoom(1, data, function (errCode, cmd, data) {
            // 返回错误码信息
            if (errCode !== 0) {
                BK.Script.log(1, 1, '上传分数失败!错误码：' + errCode);
            } else {
                BK.Script.log(1, 1, '上传分数成功：' + data);
            }
        });
    }

    /**
     * 获取排行信息
     * @param rankType 排行类型
     * @param sortType 排序类型
     * @param callback 回调
     */
    public getRankInfo(rankType: QQLMGameSDKRankType, sortType: QQLMGameSDKSortType, callback: Function) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        // 当前不支持一次同时拉取多个排行榜，需要拉取多次，而且必须等上一个拉取回来后才能拉取另外一个排行榜
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        BK.QQ.getRankListWithoutRoom(rankType, sortType, 0, function (errCode, cmd, data) {
            // 返回错误码信息
            if (errCode !== 0) {
                BK.Script.log(1, 1, '获取排行榜数据失败!错误码：' + errCode);
                return;
            }
            if (data && callback) {
                //var rd = {
                //    url: '',            // 头像的 url
                //    nick: '',           // 昵称
                //    score: 1,           // 分数
                //    selfFlag: false,    // 是否是自己
                //};
                callback(data.data.ranking_list);
            } else if (callback) {
                callback(null);
            }
        });
    }

    /**
     * 保存游戏数据
     * @param arrayData 数据
     */
    public saveGameData(arrayData) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        // 存储游戏个人私有数据
        var data = {
            modeDatas: arrayData,
        }
        // 保存个人数据
        BK.QQ.saveGameData(data, function (errCode, cmd, data) {
            BK.Script.log(1, 1, 'saveGameData : ' + errCode + ', ' + cmd + ', ' + JSON.stringify(data));
        });
    }

    /**
     * 加载游戏数据
     * @param callback 回调
     */
    public loadGameData(callback: Function) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        // 拉取游戏个人私有数据
        BK.QQ.loadGameData(function (errCode, cmd, data) {
            // 这里返回的 data，就是上面存储游戏个人私有数据时候传入的 data
            let d = JSON.stringify(data);
            BK.Script.log(1, 1, 'loadGameData : ' + errCode + ', ' + cmd + ', ' + d);
            if (callback) {
                callback(d);
            }
        });

    }

    /**
     * 分享
     * @param picUrl 图片网络地址
     * @param title 分享标题
     * @param summary 分享内容
     * @param extendInfo 分享参数
     * @param success 成功回调
     * @param fail 失败回调
     * @param complete 完成回调
     */
    public share(picUrl: string, title: string, summary: string, extendInfo: string, success: Function, fail: Function, complete: Function) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        // BK.QQ.shareToArk(0, summary, picUrl, true, extendInfo, function (errCode, cmd, data) {
        //     console.log("================ ", errCode);
        //     if (errCode == 0) {
        //         if (data.ret == 0) {
        //             console.log("=========== 分享 成功");
        //             if (success) {
        //                 success();
        //             }
        //         } else {
        //             console.log("============= 分享 失败");
        //             if (fail) {
        //                 fail();
        //             }
        //         }
        //     }
        //     if (complete) {
        //         complete();
        //     }
        // });

        BK.Share.share({
            qqImgUrl: picUrl,
            title: title,
            summary: summary,
            extendInfo: extendInfo,
            success: function (succObj) {
                BK.Console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
                if (success) {
                    success(JSON.stringify(succObj.data));
                }
            },
            fail: function (failObj) {
                BK.Console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
                if (fail) {
                    fail(JSON.stringify(failObj.msg));
                }
            },
            complete: () => {
                BK.Console.log('分享完成，不论成功失败');
                if (complete) {
                    complete();
                }
            }
        });

    }

    /**
     * 分享图循环的分享
     * @param picURLPrefix 分享图地址前缀 "http://www.foryun.wang/sharePic/share_invite_"
     * @param picURLSuffix 分享图地址后缀 ".gif"
     * @param maxIndex 分享图最大索引 3
     * @param title 分享标题
     * @param summary 分享内容
     * @param extendInfo 分享参数
     * @param success 分享成功回调
     * @param fail 分享失败回调
     * @param complete 分享完成回调
     */
    public shareLoopPic(picURLPrefix: string, picURLSuffix: string, maxIndex: number, title: string, summary: string, extendInfo: string, success: Function, fail: Function, complete: Function) {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        // let path = "http://www.foryun.wang/sharePic/share_invite_" + QQLMGameSDK.Instance.shareInviteIndex + ".gif";
        let path = picURLPrefix + QQLMGameSDK.Instance.shareInviteIndex + picURLSuffix;
        console.log("---> 分享图");
        console.log(path);
        QQLMGameSDK.Instance.share(path, title, summary, extendInfo, function (res) {
            QQLMGameSDK.Instance.shareInviteIndex++;
            if (QQLMGameSDK.Instance.shareInviteIndex > maxIndex) {
                QQLMGameSDK.Instance.shareInviteIndex = 1;
            }
            console.log("-----------每日分享成功", res);
            if (success) {
                success();
            }
        }, fail, complete);
    }

    /**
     * 创建视频广告
     * @param callback 回调
     */
    public createVideoAd(callback: Function) {
        if (!QQLMGameSDK.Switch) {
            if (callback) {
                callback(true);
            }
            return;
        }
        console.log("createVideoAd");
        FYAudioMgr.Instance.destroyAll();
        let state = false;

        let videoAd = BK.Advertisement.createVideoAd();
        videoAd.onLoad(function () {
            //加载成功
            BK.Script.log(1, 1, "onLoad")
        });

        videoAd.onPlayStart(function () {
            //开始播放
            BK.Script.log(1, 1, "onPlayStart")
        });

        videoAd.onPlayFinish(function () {
            //播放结束
            BK.Script.log(1, 1, "onPlayFinish");
            state = true;
            videoAd = null;
        });

        videoAd.onError(function (err) {
            //加载失败
            BK.Script.log(1, 1, "onError code:" + err.code + " msg:" + err.msg);
            videoAd = null;
        });

        videoAd.onClose(function () {
            //广告关闭
            BK.Script.log(1, 1, "onClose");
            if (callback) {
                callback(state);
            }
            FYAudioMgr.Instance.resumePre();
            videoAd = null;
        });

        videoAd.show();
    }

    /**
     * 创建banner 默认在最下面居中
     */
    public createBannerAd() {
        if (!QQLMGameSDK.Switch) {
            return;
        }

        var banner = BK.Advertisement.createBannerAd({
            viewId: 1003,
            style: { x: 0, y: 0 }
        });
        banner.onLoad(function () {
            //广告加载成功
        });
        banner.onError(function (err) {
            //加载失败
            var msg = err.msg;
            var code = err.code;
        });
        banner.show();
    }

    public addEnterForegroundCB(cb) {
        if (!QQLMGameSDK.Switch) {
            return;
        }
        console.log("---> addEnterForegroundCB")
        BK.onEnterForeground(cb);
    }

    public addEnterBackgroundCB(cb) {
        if (!QQLMGameSDK.Switch) {
            return;
        }
        console.log("---> addEnterBackgroundCB")
        BK.onEnterBackground(cb);
    }

    public removeEnterForegroundCB(cb) {
        if (!QQLMGameSDK.Switch) {
            return;
        }
        console.log("---> removeEnterForegroundCB")
        BK.offEnterForeground(cb);
    }

    public removeEnterBackgroundCB(cb) {
        if (!QQLMGameSDK.Switch) {
            return;
        }
        console.log("---> removeEnterBackgroundCB")
        BK.offEnterBackground(cb);
    }
}
