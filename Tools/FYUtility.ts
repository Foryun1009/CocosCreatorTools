
const { ccclass, property } = cc._decorator;

@ccclass
export default class FYUtility {
    /**
     * 
     * @param sprite 要换图片的精灵
     * @param atlasPath 图集路径 resources目录下
     * @param picName 图片名
     */
    static changeSpriteFrame(sprite: cc.Sprite, atlasPath: string, picName: string) {
        cc.loader.loadRes(atlasPath, cc.SpriteAtlas, function (err, atlas) {
            if (atlas instanceof cc.SpriteAtlas) {
                let frame = atlas.getSpriteFrame(picName);
                sprite.spriteFrame = frame;
            }
        }
        );
    }

    /**
     * 获取不重复的随机数
     * @param minValue 最小值
     * @param maxValue 最大值
     * @param valueNum 随机个数
     */
    static getRandomValueDif(minValue: number, maxValue: number, valueNum: number) {
        // 全部随机数值  
        let allNums = new Array;

        // 判断获取随机数个数  
        let size = valueNum ? (valueNum > maxValue - minValue + 1 ? maxValue - minValue + 1 : valueNum) : 1;

        // 生成随机数值区间数组  
        for (let i = minValue, k = 0; i <= maxValue; i++ , k++) {
            allNums[k] = i;
        }

        let arr = []

        // 随机从数组里面取值
        allNums.sort(function () { return 0.5 - Math.random(); });
        for (let j = 0; j < size; j++) {
            let index = Math.floor(Math.random() * allNums.length);
            arr.push(allNums[index]);
            let tmp = allNums[index];
            allNums[index] = allNums[allNums.length - 1];
            allNums[allNums.length - 1] = tmp;
            allNums.pop();
        }

        return arr;
    }

    /**
     * 获取范围内的随机数
     * @param minValue 最小值
     * @param maxValue 最大值
     */
    static getRangeRandom(minValue: number, maxValue: number) {
        // 获取数组从第一个开始到指定个数的下标区间  
        return FYUtility.getRandomValueDif(minValue, maxValue, 1)[0];
    }

    static addChild(parent: cc.Node, child: cc.Node, pos: cc.Vec2 = cc.Vec2.ZERO, active: boolean = true) {
        if (parent == undefined || child == undefined) {
            cc.error("---------->>>>>>>>>parent is undefined", parent == undefined);
            cc.error("---------->>>>>>>>>child is undefined", child == undefined);
            return
        }
        let p: cc.Vec2 = cc.Vec2.ZERO
        if (pos != undefined) {
            p = pos
        }
        let activeSelf: boolean = true
        if (active != undefined) {
            activeSelf = active
        }
        let addItem = cc.instantiate(child)
        addItem.parent = parent
        addItem.position = pos
        addItem.active = active
        return addItem;
    }


    /**
     * 获取屏幕宽度
     */
    static getCanvasWidth(): number {
        return cc.Canvas.instance.node.width;
    }

    /**
     * 获取屏幕高度
     */
    static getCanvasHeight(): number {
        return cc.Canvas.instance.node.height;
    }

    /**
     * 加载场景
     * @param sceneName 场景名字
     */
    static loadScene(sceneName: string) {
        cc.director.loadScene(sceneName);
    }

    /**
     * 是否启用物理系统
     * @param enabled 开关
     */
    static enablePhysicsSystem(enabled: boolean) {
        cc.director.getPhysicsManager().enabled = enabled;
    }

    /**
     * 是否启用碰撞系统
     * @param enabled 开关
     */
    static enableCollisionSystem(enabled: boolean) {
        cc.director.getCollisionManager().enabled = enabled;
    }

    /**
     * 将储存成为字符串的时间 转化成为date类型 
     * @param dateString date 通过toLocaleDateString()转化成的string 
     */
    static convertDateFromString(dateString) {
        if (dateString) {
            var arrData = dateString.split(" ");
            var sdate = arrData[0].split('/');
            var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
            return date;
        }
    }

    /**
     * 获取当前周的周一零点的时间戳
     */
    static getMonTimeByNowTime() {
        let now = new Date();
        let day = now.getDay();
        if (day == 0) { day = 7 };
        now.setHours(0, 0, 0, 0);
        let monDate = new Date(now.getTime() - (day - 1) * 24 * 60 * 60 * 1000)
        let time = monDate.getTime();
        return time;
    }

    /**
     * 获取当前时间是否是同一天
     */
    static isSameDay(time1, time2 = Date.now()) {
        let t1 = Number(time1);
        let t2 = Number(time2)
        if (t1 && t2) {
            let date1 = new Date(t1);
            let date2 = new Date(t2);
            let tick1 = date1.setHours(0, 0, 0, 0);
            let tick2 = date2.setHours(0, 0, 0, 0);
            //console.log("tick1: " + tick1, "  tick2: " + tick2);
            //console.log("time1: " + time1, "  time2: " + time2, "  是否同一天：", tick1 == tick2)
            return tick1 == tick2;
        }
        //console.log("time1: " + time1, "  time2: " + time2, "  是否同一天：", false)
        return false;
    }

    static getDictionaryCount(_dict) {
        let count = 0;
        for (let n in _dict) {
            count++;
        }
        return count;
    }

    static formatTime(_seconds) {
        _seconds = parseInt(_seconds);
        let hours, mins, seconds;
        let result = '';
        seconds = _seconds % 60;
        mins = _seconds % 3600 / 60;
        hours = _seconds / 3600;

        if (hours)
            result = `${FYUtility.PadZero(hours)}:${FYUtility.PadZero(mins)}:${FYUtility.PadZero(seconds)}`
        else {
            result = `${FYUtility.PadZero(mins)}:${FYUtility.PadZero(seconds)}`
        }
        //console.log(result)  
        return result;
    }

    static formatTime2(_mSeconds) {
        _mSeconds = parseInt(_mSeconds);
        let hours, mins, seconds, mSeconds;
        let result = '';
        mSeconds = Math.floor((_mSeconds - Math.floor(_mSeconds / 1000) * 1000) / 10);
        seconds = mSeconds / 1000 % 60;
        mins = _mSeconds / 1000 % 3600 / 60
        hours = _mSeconds / 1000 / 3600;

        result = `${FYUtility.PadZero(seconds)}:${FYUtility.PadZero(mSeconds)}`
        //console.log(result)  
        return result;
    }

    static PadZero(str) {
        //补零  
        return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
    }

    static getMonthWeek() {
        let nowDate = new Date();
        let aYear = nowDate.getFullYear();
        let bWeekDay = nowDate.getDay();
        let cDays = nowDate.getDate();

        let w = nowDate.getDay();
        let d = nowDate.getDate();
        return Math.ceil((d + 6 - w) / 7);
    }

    static log(msg: string | any, ...subst: any[]) {
        return;
        cc.log(msg, subst);
    }

    static changeParentKeepPos(target: cc.Node, nodeParent: cc.Node) {
        let worldPos = target.parent.convertToWorldSpaceAR(target.position);
        let localPos = nodeParent.parent.convertToNodeSpaceAR(worldPos);
        // let srcPos = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        // let targetPos = nodeParent.convertToNodeSpaceAR(srcPos);
        target.parent = nodeParent;
        target.setPosition(localPos);
    }

    static httpGet(url, reqData, callback) {
        url += "?";
        for (let item in reqData) {
            url += item + "=" + reqData[item] + "&";
        }
        console.log(url)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    // console.log(response)
                    if (response) {
                        let responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        console.log("返回数据不存在")
                        callback(false);
                    }
                } else {
                    console.log("请求失败")
                    callback(false);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    static httpPost(url, reqData, callback) {
        // console.log(url)
        // console.log(reqData)
        //1.拼接请求参数
        var param = reqData;
        // for (var item in reqData) {
        //     param += item + "=" + reqData[item] + "&";
        // }
        console.log(param)
        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    //console.log(response)
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        console.log("返回数据不存在")
                        callback(false);
                    }
                } else {
                    console.log("请求失败")
                    callback(false);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(param);//reqData为字符串形式： "key=value"
    }
	
	/**
     * 加载远程图片
     * @param url 远程图片地址
     * @param imageType 图片类型 jpg png
     * @param sprite 精灵对象
     */
    static loadOnlineImage(url: string, imageType: string, sprite: cc.Sprite) {
        cc.loader.load({ url: url, type: imageType }, function (err, tex) {
            let spriteFrame = new cc.SpriteFrame(tex);
            sprite.spriteFrame = spriteFrame;
        });
    }
}
