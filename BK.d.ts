/**
 * Bricks Engine Official API
 */
declare interface Map<T> {
    [index: string]: T
}

declare interface GAMESTATUSINFO_DRESSINFO {
    "atlas": string,
    "json": string
}



declare interface GAMESTATUSINFO_DRESSINFO {
    "atlas": string,
    "json": string
}

declare interface GAMESTATUSINFO {
    "svrIp": string,       //游戏推荐ip。开发者可忽略
    "gameVersion": string, //游戏版本号
    "isMaster": number,    //是否房主，1房主，0参加者
    "dressPath": Array<GAMESTATUSINFO_DRESSINFO>,//厘米秀衣服路径
    "gameId": number,      //游戏id
    "osVersion": string,      //系统版本 "10.3"
    "networkType": number,      //网络类型 1 电信 ，2 联通 ，3 移动  0: wifi或未知
    "roomId": number,               //房间号
    "platform": string,    //取值为 "ios"或"android"
    "openId": string, //当前用户的标识
    "spriteDesignHeight": number,//厘米秀小人spine动画的设计高度
    "QQVer": string, //手机qq版本
    "isFirstPlay": number,                 //是否第一次玩 1.第一次玩，0非第一次玩
    "skltPath": GAMESTATUSINFO_DRESSINFO, //厘米秀小人spine骨骼
    "port": number,  //推荐端口 开发者可忽略,
    "gameMode": number,
    "aioType": number,
    "avGameId": number,
    "avAccountType": number,
    "avRoomId": number,
    "sessionId"?: number,
    "devPlatform"?: string, //仅在开发环境下可以，手q环境下无该字段
    "avAppId"?: number,
    "src": number,
    "commFlagBits": number,
    "isWhiteUser": number,
    "isFirstInstall":number,  //是否首次安装    1为首次安装 0非首次安装
}

/**
 * 全局变量
 */
declare var GameStatusInfo: GAMESTATUSINFO;


interface IFileSystemReadFileParam {
    path: string,
    encoding?: string
}


interface IFileSystemRead {
    file: Array<IFileSystemReadFileParam>,
    success?: (obj: object) => void,
    fail?: (obj: object) => void,
    complete?: () => void
}


interface IFileSystemWriteFileParam {
    path: string,
    encoding?: string,
    data: BK.Buffer
}

interface IFileSystemWriteOriginFileParam {
    path: string,
    encoding?: string,
    data: ArrayBuffer
}

interface IFileSystemWrite {
    file: Array<IFileSystemWriteOriginFileParam>,
    success?: (obj: object) => void,
    fail?: (obj: object) => void,
    complete?: () => void
}

interface IFileSystemZipParam {
    path: string,
    zipPath: string
}

interface IFileSystemZip {
    file: Array<IFileSystemZipParam>,
    success?: (obj: object) => void,
    fail?: (obj: object) => void,
    complete?: () => void
}

interface IFileSystemUnzipParam {
    path: string,
    zipPath: string
}

interface IFileSystemUnzip {
    file: Array<IFileSystemUnzipParam>,
    success?: (obj: object) => void,
    fail?: (obj: object) => void,
    complete?: () => void
}


interface IImageLoadParam {
    path: string,
    format: number
}

interface IImagesLoad {
    file: Array<IImageLoadParam>,
    success?: (obj: object) => void,
    fail?: (obj: object) => void,
    complete?: () => void
}

interface IImageLoadImageWithBase64
{
    buffer:ArrayBuffer | BK.Buffer
}

interface ISaveImage
{
    bitmap: ArrayBuffer, //位图数据
    width: number, //宽
    height: number,//高
    path: string, //路径
    ext: string, //后缀
    isFlipY?: number //是否上下翻转
}

interface ITextreLoadParam {
    path: string,
    format: number
}

interface ITextureLoad {
    file: Array<ITextreLoadParam>,
    success?: (obj: object) => void,
    fail?: (obj: object) => void,
    complete?: () => void
}


interface readDirParam {
    path: string,
    needDir?: boolean,
    success?: (obj: object) => void,
    fail?: (obj: object) => void,
    complete?: () => void
}

interface IReadDirInfo {
    errMsg?: string,
    files?: Array<string>
}

interface FileInfo {
    size: number,
    atime: number,
    mtime: number,
    ctime: number
}



/**
 * 加载图片参数
 */
interface IImageLoad {
    image: string | ArrayBuffer | BK.Buffer, 
    format?: number
}


declare class BKStorageEventLisener{
    private storageEmitter:EventEmitter;
    constructor();
    /**
     * 
     * 添加storage 监听回调
     * 
     * @param name 监听事件 ‘storage’
     * @param listener 监听回调
     */

    public addEventListener(name:string,listener:(...args: any[]) => void):void;
    /**
     * 
     * 移除storage 监听回调
     * 
     * @param name 监听事件 ‘storage’
     * @param listener 监听回调
     */
    public removeEventListener(name:string,listener:(...args: any[]) => void):void;

    /**
     * 
     * 分发storage事件
     * 
     * @param name 事件名称 ‘storage’
     * @param event 事件消息内容
     */
    public dispatchEvent(name:string,event:BKStorageEvent):void;
}

declare class BKStorage {

    public length:number;

    /**
     * 
     * storage 
     * 
     * @param type storage 类型
     */
    constructor(type:StorageType);

    /**
     * 
     * 获取对应索引的key
     * 
     * @param index 索引值
     */
    public key(index:number):string|null;

    /**
     * 
     * 获取key对应的value
     * 
     * @param key 要获取的key
     */
    public getItem(key:string):string|null;

    /**
     * 
     * 设置key的value
     * 
     * @param key 需要修改的key
     * @param value 需要设置的value
     */
    public setItem(key:string,value:string):void;

    /**
     * 
     * 要移除的key
     * 
     * @param key 要移除的key
     */
    public removeItem(key:string):void;

    /**
     * 清除当前storage 保存的数据 
     */
    public clear():void;

    /**
     * 
     * @param url 绑定当前storage 到url
     */
    private bindUrl(url:string):void;

    [name:string]:any;
}


declare namespace BK {



    let fileSystem: FileSystem;
    let taskManager: TaskManager;
    let storageEventListener : BKStorageEventLisener;  
    let localStorage:BKStorage;
    let sessionStorage:BKStorage;
     function getStorageData(gameId:number):string;
    function setStorageData(data:string,gameId:number):void;
    interface SpriteNineInitParam{
        texture:BK.Texture 
        textureWidth?:number
        textureHeight?:number
        grid?:Grid
        offset?:BK.SpritePosition
        rotated?:boolean
    }

    interface Grid{
        top:number,
        bottom:number,
        left:number,
        right:number
    }

    enum RepeatMode{
        mirrorRepeat = 0,  //镜像重复
        repeatToEdge = 1,  //重复至边缘
        selfRepeat = 2  //重复整个图片
    }

    interface LoadSetParam{
        jsonPath:string; //图集json文件路径
        texturePath:string;  //图集png文件路径
        format?:number  //资源格式  （可选，默认为RGBA8888）6代表RGBA8888,4代表RGBA4444
        minFilter?:number //缩小采样方式  （可选，默认为1） 0最近采样 1线性采样
        magFilter?:number //放大采样方式  （可选，默认为1）0最近采样 1线性采样
        uWrap?:BK.RepeatMode //u轴重复方式    （可选，默认为1） 0镜像重复，1重复至边缘，2重复
        vWrap?:BK.RepeatMode //v轴重复方式    （可选，默认为1） 0镜像重复，1重复至边缘，2重复
    }

    interface SpriteInfo{
        filename:string
        width:number
        height:number
    }

    /**
     * 九宫图
     */
    class SpriteNine{

        constructor(initParam:SpriteNineInitParam)

        /**
         * 设置大小
         * @param size 
         */
        setSize(size:BK.SpriteSize):void

        /**
         * 设置位置
         * @param position 
         */
        setPosition(position:BK.SpritePosition):void
    }

    /**
     * 图集
     */
    class SpriteSetCache{

        /**
         * 加载图集
         * @param {LoadSetParam}param 
         */
        static loadSet(param:LoadSetParam):void

        /**
         * 从图集中获取精灵
         * @param {SpriteInfo} spriteInfo 
         */
        static getSprite(spriteInfo:SpriteInfo):BK.Sprite|null 

        /**
         * 根据图片路径移除图集
         * @param {string} texturePath 文件路径
         */
        static removeSet(texturePath:string):void

        /**
         * 根据图集文件中小图的名称获取大图的纹理
         * @param {string} filename 图集文件中小图的名称
         */
        static getTextureByFilename(filename:string):BK.Texture|null

        /**
         * 根据图集文件中小图名称，获取小图的位置信息
         * @param {string} filename 图集文件中小图的名字
         */
        static getFrameInfoByFilename(filename:string):SheetFrameInfo|null;

        /**
         * 根据图集文件中小图名称，获取小图的位置信息和大图的纹理对象
         * @param {string} filename 图集文件中小图的名字
         */
        static getTextureInfoByFilename(filename:string):TextureInfo|null;

        /**
         * 根据图集文件中小图名称，获取大图纹理路径名称
         * @param {string} filename 图集文件中小图的名字
         */
        static getTexturePathByFilename(filename:string) : string|null

        /**
         * 根据图集文件中小图名称，创建一个图集精灵对象
         * @param {SpriteInfo} spriteInfo 创建图集所需参数
         */
        static createSpriteSet(spriteInfo:SpriteInfo):BK.SpriteSet|null

    }

    interface SpriteSetInitParam{
        textureInfo:BK.TextureInfo;
        width?:number;
        height?:number;
        flipU?:number;
        flipV?:number;
        stretchX?:number;
        stretchY?:number;
    }

    class SpriteSet extends Sprite{
        constructor(initParam:BK.SpriteSetInitParam)
    }

    interface SheetRect{
        x:number,
        y:number,
        width:number,
        height:number
    }

    interface SheetSize{
        width:number,height:number
    }

    interface SheetPoint{
        x:number,y:number
    }

    interface SheetFrameInfo{
        filename:string,
        frame: SheetRect,
        rotated: boolean,
        trimmed: boolean,
        spriteSourceSize: SheetRect,
        sourceSize: SheetSize,
    }

    interface TextureInfo
    {
        texturePath:string,
        frameInfo:SheetFrameInfo,
        texture:BK.Texture|null
    }

    //AnimationSprite
    interface AnimationSpriteInfo{
        animationSprite:BK.AnimationSprite;
        count: number;
    }

    interface Anchor{
        x:number,
        y:number
    }

    interface SpritePosition{
        x:number,
        y:number
    }

    interface SpriteSize{
        width:number,
        height:number
    }

    interface AnimationSpritePlayParam{
        beginFrameIndex:number,
        repeatCount:number;
    }

    interface AnimationSpriteStopParam{
        frameIndex:number
    }

    /**
     * 帧动画
     */
    class AnimationSprite extends BK.Sprite{

        constructor(sheetTextureInfoArray:Array<BK.TextureInfo>)

        /**
         * 播放帧动画
         * @param {BK.AnimationSpritePlayParam} param 
         */
        play(param?:BK.AnimationSpritePlayParam):void


        /**
         * 停止帧动画 
         * @param {number} frameIndex 停止后要显示的帧序号  默认为当前帧
         */
        stop(frameIndex?:number):void

        /**
         * 设置显示的位置 默认{x:0, y:0}
         * @param {BK.SpritePosition} position 
         */
        setPosition(position:BK.SpritePosition):void

        /**
         * 设置显示的大小
         * @param {BK.SpriteSize} size 
         */
        setSize(size:BK.SpriteSize):void

        /**
         * 锚点  默认{x:0,y:0}
         * 默认为图片左下角
         * @param anchor 
         */
        setAnchor(anchor:BK.Anchor):void

        /**
         * 设置帧动画 每一帧的时长，单位为秒  默认为1/30
         * @param {number} duration 每帧时长 单位：秒
         */
        setFrameDuration(duration:number):void

        /**
         * 暂停帧动画 可以通过resume()恢复
         */
        pause():void

        /**
         * 继续帧动画
         */
        resume():void

        /**
         * 每播放完成一次时回调
         * @param completeCallback 
         */
        setCompleteCallback(completeCallback:(info:BK.AnimationSpriteInfo)=>void):void

        /**
         * 全部播放完成时回调
         * @param endCallback 
         */
        setEndCallback(endCallback:(info:BK.AnimationSpriteInfo)=>void):void
    }

    /**
     * 保持屏幕常亮所需参数
     */
    interface KeepScreenOnParam {
        isKeepOn: boolean  //true为保持常亮  false为取消常亮
    }

    class Device {

        /**
         * 保持屏幕常亮
         * @param {KeepScreenOnParam} param 
         */
        static keepScreenOn(param: KeepScreenOnParam): void;

    }


    /**
     * 二维码生成成功回调
     */
    interface SuccessResult {
        path: string;
    }

    /**
     * 二维码生成失败回调
     */
    interface FailResult {
        msg: string;
    }

    /**
     * 二维码颜色参数
     */
    interface RGBA {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    /**
     * 二维码纠错等级
     */
    enum QRErrorCorrectLevel {
        L = 1,
        M = 0,
        Q = 3,
        H = 2
    }

    /**
     * 二维码生成所需配置
     */
    interface QRCodeConfig {
        width?: number;//默认值 256
        height?: number; //默认值 256
        colorDark?: RGBA; //默认值 {r:0.0,g:0.0,b:0.0,a:1.0}
        colorLight?: RGBA;//默认值 {r:1.0,g:1.0,b:1.0,a:1.0}
        correctLevel?: QRErrorCorrectLevel; //默认值 2
    }

    /**
     * 异步生成二维码所需参数
     */
    interface QRCodeParam {
        path: string;  //图片生成位置  只能在GameSandBox://目录及其子目录
        content: string;  //二维码内容
        config?: QRCodeConfig;  //二维码生成所需参数
        success: (succObj: SuccessResult) => void;
        fail: (err: Error) => void;
        complete?: () => void;
    }

    /**
     * 同步生成二维码所需参数
     */
    interface QRCodeSyncParam {
        path: string;  //图片生成位置  只能在GameSandBox://目录及其子目录
        content: string;  //二维码内容
        config?: QRCodeConfig;  //二维码生成所需参数
    }

    class QRCode {
        /**
         * 生成二维码图片到指定位置  同步
         * @param {QRCodeSyncParam} param
         */
        static makeQRCodeToFileSync(param: QRCodeSyncParam): void;

        /**
         * 生成二维码图片到指定位置  异步
         * @param {QRCodeParam} param
         */
        static makeQRCodeToFile(param: QRCodeParam): void;
    }


    interface Error {
        msg: string;
    }

    /**
     * 加密失败结果
     */
    interface CryptError {
        msg: string;
    }

    /**
     * 加密成功结果
     */
    interface CryptResult {
        data: string;
    }

    interface CryptCommonParam {
        success: (succObj: CryptResult) => void;
        fail: (failObj: CryptError) => void;
        complete?: () => void;
    }

    /**
     * MD5加密参数
     */
    interface CryptParam extends CryptCommonParam {
        data: string;
    }

    /**
     * HAMC-MD5加密参数
     */
    interface HMACParam extends CryptCommonParam {
        key: string;
        data: string;
    }

    interface CryptSyncParam {
        data: string | Array<number>;
    }

    interface HMACSyncParam {
        key: string | Array<number>;
        data: string | Array<number>;
    }

    class Crypt {

        /**
         * 对data进行md5加密  结果以小写十六进制串形式回调
         * @param {CryptParam} param data必须为字符串
         */
        static md5ToHex(param: CryptParam): void

        /**
         * 对data进行md5加密 并将加密后的结果进行Base64转化
         * @param {CryptParam} param data必须为字符串
         */
        static md5ToBase64(param: CryptParam): void

        /**
         * 通过key对data进行HMAC-MD5加密， 结果以小写十六进制串形式回调
         * @param {HMACParam} param data和key必须为字符串
         */
        static hmacMd5ToHex(param: HMACParam): void

        /**
         * 通过key对data进行HMAC-MD5加密，并将结果进行Base64转化
         * @param {HMACParam} param data和key必须为字符串
         */
        static hmacMd5ToBase64(param: HMACParam): void

        /**
         * 将data进行sha1加密 并将结果以小写十六进制串回调
         * @param {CryptParam} param data必须为字符串
         */
        static sha1ToHex(param: CryptParam): void
        /**
         * 将data进行sha1加密 并将结果进行Base64转化
         * @param {CryptParam} param data必须为字符串
         */
        static sha1ToBase64(param: CryptParam): void

        /**
         * 使用key对data进行Hmac-sha1加密 并将结果以小写十六进制串回调
         * @param {HMACParam} param data和key必须为字符串
         */
        static hmacSha1ToHex(param: HMACParam): void

        /**
         * 使用key对data进行Hmac-sha1加密 并将结果进行Base64转化
         * @param {HMACParam} param data和key必须为字符串
         */
        static hmacSha1ToBase64(param: HMACParam): void

        /**
         * 对data进行md5加密  结果以小写十六进制串形式返回  同步方法
         * @param {CryptSyncParam} param
         */
        static md5ToHexSync(param: CryptSyncParam): string

        /**
         * 对data进行md5加密 并将加密后的结果进行Base64转化  同步方法
         * @param {CryptSyncParam} param
         */
        static md5ToBase64Sync(param: CryptSyncParam): string


        /**
         * 通过key对data进行HMAC-MD5加密， 结果以小写十六进制串形式返回  同步方法
         * @param {HMACSyncParam} param
         */
        static hmacMd5ToHexSync(param: HMACSyncParam): string

        /**
         * 通过key对data进行HMAC-MD5加密，并将结果进行Base64转化  同步方法
         * @param {HMACSyncParam} param
         */
        static hmacMd5ToBase64Sync(param: HMACSyncParam): string


        /**
         * 将data进行sha1加密 并将结果以小写十六进制串返回  同步方法
         * @param {CryptSyncParam} param
         */
        static sha1ToHexSync(param: CryptSyncParam): string
        /**
         * 将data进行sha1加密 并将结果进行Base64转化  同步方法
         * @param {CryptSyncParam} param
         */
        static sha1ToBase64Sync(param: CryptSyncParam): string

        /**
     * 使用key对data进行Hmac-sha1加密 并将结果以小写十六进制串返回  同步方法
     * @param {HMACSyncParam} param
     */
        static hmacSha1ToHexSync(param: HMACSyncParam): string


        /**
         * 使用key对data进行Hmac-sha1加密 并将结果进行Base64转化 同步方法
         * @param {HMACSyncParam} param
         */
        static hmacSha1ToBase64Sync(param: HMACSyncParam): string


    }

    /**
     * 分享回调参数
     */
    interface ShareResult {
        retCode: number,
        shareDest: number,
        isFirstShare: boolean
    }

    /**
     * 网络状态
     */
    enum NetworkState {
        'NoneToMobileNetwork' = 1,
        'NoneToWifi' = 2,
        'MobileNetworkToWifi' = 3,
        'MobileNetworkToNone' = 4,
        'WifiToNone' = 5,
        'WifiToMobileNetwork' = 6,
    }

    /**
     * 网络状态回调参数
     */
    interface NetworkChangeResult {
        state: NetworkState;
    }

    /**
     * 监听游戏退到后台的事件
     * 用户按home键将手Q退至后台
     * @param callback 监听函数
     */
    export function onEnterBackground(callback: () => void): void;

    /**
     * 取消监听游戏退到后台的事件
     * @param callback 待取消的监听函数
     */
    export function offEnterBackground(callback: () => void): void;

    /**
     * 监听游戏回到前台的事件
     * 手Q进程从后台回到前台
     * @param callback 监听函数
     */
    export function onEnterForeground(callback: () => void): void;

    /**
     * 取消监听游戏回到前台的事件
     * @param callback 待取消的监听函数
     */
    export function offEnterForeground(callback: () => void): void;

    /**
     * 监听游戏关闭事件
     * 开发者需处理销毁动作：上报用户成绩
     * @param callback 监听函数
     */
    export function onGameClose(callback: () => void): void;

    /**
     * 取消监听游戏关闭事件
     * @param callback 待取消的监听函数
     */
    export function offGameClose(callback: () => void): void;

    /**
     * 监听分享事件
     * @param callback 监听函数
     */
    export function onGameShare(callback: () => void): void;

    /**
     * 取消监听分享事件
     * @param callback 待取消的监听函数
     */
    export function offGameShare(callback: () => void): void;

    /**
     * 监听分享完成事件
     * 不代表分享成功，可能是分享失败或取消分享了，需判断retCode字段
     * @param callback 监听函数
     */
    export function onGameShareComplete(callback: (res: ShareResult) => void): void;

    /**
     * 取消监听分享完成事件
     * @param callback 待取消的监听函数
     */
    export function offGameShareComplete(callback: (res: ShareResult) => void): void;

    /**
     * 监听网络变化事件
     * @param callback 监听函数
     */
    export function onNetworkChange(callback: (res: NetworkChangeResult) => void): void;

    /**
     * 取消监听网络变化事件
     * @param callback 待取消的监听函数
     */
    export function offNetworkChange(callback: (res: NetworkChangeResult) => void): void;

    /**
     * 监听最大化事件
     * @param callback 监听函数
     */
    export function onMaximize(callback: () => void): void;

    /**
     * 取消监听最大化事件
     * @param callback 待取消的监听函数
     */
    export function offMaximize(callback: () => void): void;

    /**
     * 监听最小化事件  用户点击"收起游戏"
     * @param callback 监听函数
     */
    export function onMinimize(callback: () => void): void;

    /**
     * 取消监听最小化事件
     * @param callback 待取消的监听函数
     */
    export function offMinimize(callback: () => void): void;

    export class EmitData {
        event: string;
        once: boolean;
        listener: (...args: any[]) => void;
        constructor(event: string, listener: (...args: any[]) => void, once: boolean);
    }
    export class EventEmitter {
        private _emits;
        constructor();
        private __emit_get;
        private __emit_exists;
        private __emit_put;
        private __emit_remove;
        /**
         * 添加 listener 函数到名为 eventName 的事件的监听器数组的末尾。
         * 注意:多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加与调用多次。
         * @param event
         * @param listener
         */
        on(eventName: string, listener: (...args: any[]) => void): this;
        /**
         * 添加一个单次 listener 函数到名为 eventName 的事件
         * @param eventName
         * @param listener
         */
        once(eventName: string, listener: (...args: any[]) => void): this;
        /**
         * 从名为 eventName 的事件的监听器数组中移除指定的 listener。
         * @param eventName
         * @param listener
         */
        off(eventName: string, listener: (...args: any[]) => void): this;
        /**
         * 同步地调用每个注册到名为 eventName 事件的监听
         * 如果事件有监听器，则返回 true ，否则返回 false
         * @param eventName
         * @param args
         */
        emit(eventName: string, ...args: any[]): boolean;
    }


    export class Script {

        /**
         * 
         */
        static getTouchModeAll: number;

        /**
         * 渲染模式
         */
        static renderMode: number;

        /**
         * 输出log
         * @static
         * @param {number} level 
         * @param {number} errCode 
         * @param {string} info 
         * 
         * @memberof Script
         */
        static log(level: number, errCode: number, info: string): void;

        /**
         * 执行其他js脚本文件
         * 
         * @static
         * @param {string} scriptPath 
         * 
         * @memberof Script
         */
        static loadlib(scriptPath: string): void;

        /**
         * 设置堆栈错误回调
         * @param callback 
         */
        static setErrorObserver(callback: (message: string, stacktrace: string) => void): void;

        /**
         * 分包加载
         * @param scriptPath 
         */
        static innerLoadLib(scriptPath: string): void;
    }

    /**
     * 控制台打印接口
     */
    export class Console {

        /**
         * release版本输出信息
         * @param msg 信息
         */
        static log(...msg: any[]): void;

        /**
         * debug版本输出信息
         * @param msg 信息
         */
        static debug(...msg: any[]): void;

        /**
         * release版本输出错误信息
         * @param msg 错误信息
         */
        static error(...msg: any[]): void;

        /**
         * 开始计时
         * @param label 标签，用于辨识计时器
         */
        static time(label: string): void;

        /**
         * 结束计时，并打印经过的时间
         * @param label 标签，用于辨识计时器
         */
        static timeEnd(label: string): void;
    }

    /**
     *  广告系统
     */
    namespace Advertisement {
        /**
         * banner组件样式
         */
        interface BannerStyle {
            x: number;
            y: number;
            width?: number;
            height?: number;
        }
        /**
         * banner类型
         */
        const enum BannerViewId {
            STATIC = 1001,
            DYNAMIC = 1002,
            SDK = 1003
        }
        /**
         * banner组件创建参数
         */
        interface BannerParam {
            viewId?: BannerViewId;
            style?: BannerStyle;
        }
        const enum BannerErrorCode {
            Node = 0,
            InterNal = 1,
            Frequency = 2,
            Network = 3,
            InvalidRequest = 4,
            NoFill = 5,
            Server = 6,
            FormatMisMatch = 7
        }
        interface AdError {
            msg: string;
            code: BannerErrorCode | number;
        }
        class BannerAd extends EmitterEvent {
            bannerId: number;
            param: BannerParam;
            isLoadSucc: boolean;
            ssoCMD: any;
            useNative: boolean;
            needAutoShow: boolean;
            _innerGameBanner: BK.AdBannerHandler | undefined;
            static _bannerId(): any;
            /**
             * 构造函数
             * @param param
             */
            constructor(param: BannerParam);
            /**
             * 展示
             */
            show(): void;
            /**
             * 隐藏
             */
            hide(): void;
            /**
             * 销毁
             */
            destory(): void;
            /**
             * 监听拉取失败事件
             *
             * @param func
             */
            onError(func: (err: AdError) => void): void;
            /**
             * 移除拉取失败事件
             * @param func
             */
            offError(func: (err: AdError) => void): void;
            /**
             * 监听加载成功回调
             *
             * @param func
             */
            onLoad(func: () => void): void;
            /**
             * 取消监听加载成功回调
             * @param func
             */
            offLoad(func: () => void): void;
            private fetch;
            private _sendSso;
            private _ssoLoad;
            private _ssoShow;
            private _ssoClose;
            private _ssoHide;
        }
        /**
         * 创建banner 广告组件
         * @param param 参数
         */
        function createBannerAd(param: BannerParam): BannerAd;
        class VideoAd extends EmitterEvent {
            handle: BK.AdVideoHandler | undefined;
            autoShow: boolean;
            constructor();
            /**
             * 展示
             */
            show(): void;
            /**
             * 监听视频开始播放事件
             * @param callback
             */
            onPlayStart(callback: () => void): void;
            /**
             * 取消视频开始播放事件
             * @param callback
             */
            offPlayStart(callback: () => void): void;
            /**
             * 监听视频结束播放事件
             * @param callback
             */
            onPlayFinish(callback: () => void): void;
            /**
             * 取消视频结束播放事件
             * @param callback
             */
            offPlayFinish(callback: () => void): void;
            /**
             * 监听加载成功事件
             * @param callback
             */
            onLoad(callback: () => void): void;
            /**
             * 取消加载成功事件
             * @param callback
             */
            offLoad(callback: (...args: any[]) => void): void;
            /**
             * 监听错误事件回调
             * @param callback
             */
            onError(callback: (err: AdError) => void): void;
            /**
             * 取消监听错误
             * @param callback
             */
            offError(callback: (...args: any[]) => void): void;
            /**
             * 监听关闭
             * @param callback
             */
            onClose(callback: (...args: any[]) => void): void;
            /**
             * 取消监听关闭
             * @param callback
             */
            offClose(callback: (...args: any[]) => void): void;
        }
        function createVideoAd(): VideoAd;
    }

    namespace UI {

        /**
         * 失败回调的参数
         */
        export interface Error {
            msg: string;
        }

        /**
         * 公共回调参数
         */
        export interface CommonParam {
            complete?: () => void;
        }

        /**
         * 显示键盘  参数
         */
        export interface ShowKeyboardParam extends CommonParam {
            defaultText?: string;
        }

        /**
         * 更新键盘  参数
         */
        export interface UpdateKeyboardParam extends CommonParam {
            text: string;
        }

        /**
         * 监听回调  参数
         */
        export interface KeyboardData {
            text: string;
        }


        /**
         * 监听键盘输入事件
         * @param inputListener 监听事件的回调函数
         */
        export function onKeyboardInput(inputListener: (data: KeyboardData) => void): void;

        /**
         * 取消监听键盘输入事件
         * @param inputListener 监听事件回调函数
         */
        export function offKeyboardInput(inputListener: (data: KeyboardData) => void): void;

        /**
         * 监听用户点击确认按钮时的事件
         * @param confirmListener 监听事件的回调函数
         */
        export function onKeyboardConfirm(confirmListener: (data: KeyboardData) => void): void;

        /**
         * 取消监听用户点击确认按钮时的事件
         * @param confirmListener 监听事件的回调函数
         */
        export function offKeyboardConfirm(confirmListener: (data: KeyboardData) => void): void;

        /**
         * 显示输入键盘
         * @param {ShowKeyboardParam} param 显示键盘所需的参数
         */
        export function showKeyboard(param?: ShowKeyboardParam): void;

        /**
         * 收起键盘
         * @param {CommonParam} param 收起键盘所需的参数
         */
        export function hideKeyboard(param: CommonParam): void;

        /**
         * 更新输入框的文字
         * @param {UpdateKeyboardParam} param 更新键盘所需的参数
         */
        export function updateKeyboard(param: UpdateKeyboardParam): void;

        /**
         * 展示 toast 组件，默认 2000 毫秒之后消失
         * @param object 展示 toast 所需要参数
         */
        export function showToast(object:any): void;

        /**
         * 隐藏 toast 组件
         * @param object 隐藏 toast 所需要参数
         */
        export function hideToast(object:any): void;


        /**
         * 展示 loading 组件 
         * @param object 展示 loading 所需要参数
         */
        export function showLoading(object:any): void;

        /**
         * 隐藏 loading 组件
         * @param object 隐藏 loading 所需要参数
         */
        export function hideLoading(object:any): void;


        /**
         * 展示 alert 组件
         * @param object 展示 alert 所需要参数
         */
        export function showAlert(object:any): void;
    }

    /**
     * 音频相关参数
     */
    export namespace Audio {
        /**
         * 回调结果
         */
        interface Result {
            code?: number
            cmd?: string
            data?: Result
        }
        interface AudioPara {
            src?: string
            type?: string
            id?: number
            loop?: boolean
            autoPlay?: boolean
            volume?: number
            muted?: boolean
            duration?: number
            currentTime?: number
            leftVolume?: number
            rightVolume?: number
            complete?: Function
            loopCount?: number
            event?: number
            paused?: boolean
            data?: AudioPara
            auto?: boolean
            audo?: boolean
            message?: string
            code?: number
        }
    }

    /**
     * 老的音频接口
     */
    export class Audio {

        /**
         *
         * @param type  声音类型 0表示背景音乐，1表示特效音乐
         * @param musicPath 音乐路径 以GameRes://为前缀
         * @param loopCount 重复次数 -1为循环播放
         */
        constructor(type: number, musicPath: string, loopCount: number);

        //播放
        startMusic(cb: () => void): void;

        //暂停
        pauseMusic(): void;

        //继续播放
        resumeMusic(): void;

        //停止播放
        stopMusic(): void;

        /**
         * 开关
         */
        static switch: boolean;

    }
    /**
     * 音频管理类
     * 
     */
    export class AudioManager {
        /**
         * 暂停所有音频
         */
        static pauseAllAudio(): void;
        /**
         * 恢复所有音频
         */
        static resumeAllAudio(): void;
        /**
         * 销毁所有音频
         */
        static destroyAllAudio(): void;
    }

    /**
     * 音频新接口
     */
    export class AudioElement extends EventEmitter {
        currentTime: number;
        duration: number;
        /**
         * 是否在load完成之后自动播放
         */
        autoplay: boolean;
        paused: boolean;
        /**
         * 音量 0到1浮点数
         */
        volume: number;
        muted: boolean;
        src: string;
        loop: boolean;
        pause(): void;
        /**
         *
         * @param {BK.Audio.AudioPara} para
         * {complete:Function} 播放结束的回调，用于获取effect播放的音频id
         */
        play(para?: BK.Audio.AudioPara): void;

        /**
         * 销毁音频对象释放资源
         */
        destroy(): void;
        seek(time: number): void;
        load(): void;

        /**
         * 支持的音频格式，目前只支持mp3
         * @param {string} type
         */
        canPlayType(type: string): void;


        /**
         * effect 接口 恢复音乐
         * id 播放的音频id
         */
        resume(id?: number): void;

        /**
         * effect 接口 停止音乐
         * id 播放的音频id
         */
        stop(id?: number): void;
    }

    /**
     * 音频被中断
     * @returns {void}
     */
    export function onAudioInterruptionStart(callback: Function): void;

    /**
     * 音频中断取消
     * @returns {void}
     */
    export function onAudioInterruptionEnd(callback: Function): void;

    /**
     * 创建音频对象，新的音频对象
     * @param para
     * @returns {AudioElement}
     */
    export function createAudioContext(para?: any): AudioElement;

    export namespace Http {

        export interface HttpRequestOptions {
            /** 请求URL, 必填 */
            url: string;
            /** 请求方法, 默认GET */
            method?: string;
            /** 请求头 */
            headers?: Map<string>;
            /** 请求体 */
            body?: string | ArrayBuffer;
            /**
             * 请求成功回调, 成功仅代表HTTP请求完成, 不等同于请求成功200
             * @param succObj
             */
            success?: (succObj: SuccessObject) => void;
            /**
             * 请求失败回调, 如连接超时等网络错误
             * @param errObj
             */
            fail?: (errObj: ErrorObject) => void;
            /**
             * 请求结束回调, 无论请求成功失败都会调用
             */
            complete?: () => void;
            /**
             * 上传进度
             * @param curr     当前进度
             * @param total    总进度
             */
            uploadProgress?: (curr: number, total: number) => void;
            /**
             * 下载进度
             * @param curr     当前进度
             * @param total    总进度, 响应头无Content-Length时为-1
             */
            downloadProgress?: (curr: number, total: number) => void;
        }

        export interface SuccessObject {
            /** 响应码 */
            statusCode: number;
            /**
             * 响应头
             * QQ 7.8.0以下 headers为{}
             */
            headers: Map<string>;

            /**
             * 以字符串形式读取响应体, 请求发生错误时返回空字符串''
             * 没有缓存, 每次调用都会重新读取返回新对象, 不会返回前一次读取的对象
             */
            text(): string;

            /**
             * 以JSON对象形式读取响应体, 已经经过JSON.parse解析, 请求发生错误或响应体为空时返回null
             * 没有缓存, 每次调用都会重新读取返回新对象, 不会返回前一次读取的对象
             */
            jsonObject<T = any>(): T;

            /**
             * 以ArrayBuffer形式读取响应体, 请求发生错误时返回大小为0的ArrayBuffer
             * 没有缓存, 每次调用都会重新读取返回新对象, 不会返回前一次读取的对象
             */
            arrayBuffer(): ArrayBuffer;
        }

        export interface ErrorObject {
            /** 错误原因, 用于调试, 不适合直接展示给用户 */
            msg: string;
        }

        /**
         * 发起HTTP请求
         * @param options HTTP请求参数 包括url, method, headers, body和回调函数
         */
        export function request(options: HttpRequestOptions): void;
    }

    export interface SsoRequestOptions {
        reqCmd: string,                 // 请求命令字，必选
        respCmd?: string,               // 响应命令字，可选，默认同reqCmd
        data?: any,                     // 请求数据包，可选
        isListener?: boolean            // 是否监听，可选，默认为true
        success?: (succObj: {
            code: number,
            cmd: string,
            data: any,
        }) => void
        fail?: (failObj: {
            code: number,
            cmd: string,
            data: any,
        }) => void
        complete?: () => void
    }

    export class SsoRequest extends EmitterEvent {

        /**
         * sso请求
         * @param options sso请求参数
         */
        static request(options: SsoRequestOptions): SsoRequest;
    }

    /**
     * 分享接口
     */
    export namespace Share {

        export interface ShareOptions {
            title?: string,         // 分享标题，可选，默认为'轻游戏'
            summary?: string,       // 分享内容，可选，默认为'一起来玩游戏吧~'
            extendInfo?: string,    // 扩展信息，可选，默认为‘’
            qqImgUrl: string,       // 分享到QQ的图片网络链接，必选，仅支持网络链接
            socialPicPath?: string, // 分享到空间、微信、朋友圈的图片本地路径，可选，默认为游戏二维码，仅支持本地路径
            msgUrl?: string,        // 详情页的网络链接，分享链接必选
            isToFriend?: boolean,   // 是否发送给好友，可选
            range?: {               // 截图范围
                x: number,          // 横坐标
                y: number,          // 纵坐标
                width: number,      // 宽
                height: number,     // 高
            },
            success?: (succObj: {
                code: number,
                data: any,
            }) => void,
            fail?: (failObj: {
                code: number,
                msg: string,
            }) => void,
            complete?: () => void,
        }

        /**
         * 基础分享接口
         * @param options 截图参数，imgUrl必选，且必须是网络链接
         */
        export function share(options: ShareOptions): void;

        /**
         * 分享H5链接
         * @param options 截图参数，imgUrl必选，且必须是网络链接
         */
        export function shareLink(options: ShareOptions): void;
    }

    export class Ticker {

        /**
         * 每调用60次所需的秒时
         * 1代表 1秒调用60次。2代表2秒内调用60 。即1代表60帧/秒 2代表 30帧/秒
         * @type {number}
         * @memberof Ticker
         */
        interval: number;


        /**
         * 暂停
         * true代表暂停，flase代表运行
         *
         * @type {boolean}
         * @memberof Ticker
         */
        paused: boolean;

        /**
         * Creates an instance of Ticker.
         *
         * @memberof Ticker
         */
        constructor();
        /**
         * 销毁函数
         *
         *
         * @memberof Ticker
         */
        dispose(): void;


        /**
         * 设置定时回调函数
         *
         * @param {(ts:number,duration:number)=>void} callback
         *
         * @memberof Ticker
         */
        setTickerCallBack(callback: (ts: number, duration: number) => void): void;
    }

    /**
     * 代码实现在brick.js
     */
    export class MainTicker extends Ticker {
        /**
         * 添加定时回调函数
         *
         * @param {(ts:number, duration:number,obj?:any)=>void} callback
         * @param {*} [obj]
         * @memberof MainTicker
         */
        add(callback: (ts: number, duration: number, obj?: any) => void, obj?: any): void;

        /**
         * 移除绑定
         *
         * @param {*} [obj]
         * @memberof MainTicker
         */
        remove(obj?: any): void;

        /**
         *
         * @param func 回调函数
         * @param millsecond 等候时间，单位为毫秒
         * @param obj （选填）绑定对象
         */
        setTimeout(func: (ts: number, dt: number, object: any) => void, millsecond: number, obj?: any): void;

        /**
         * 移除绑定对象对应的回调函数
         *
         * @param {*} obj
         */
        removeTimeout(obj: any): void;
    }
    export class Director {
        /**
         * 屏幕比例
         */
        static screenScale: number;

        /**
         * 屏幕逻辑大小
         */
        static renderSize: Size;

        /**
         * 屏幕实际像素大小
         */
        static screenPixelSize: Size;

        /**
         * 根节点
         */
        static root: Node;

        /**
         * 帧率
         */
        static fps: number;

        /**
         * 全局定时器
         */
        static ticker: BK.MainTicker;

        /**
         * 是否保持屏幕常量
         */
        static isKeepScreenOn: boolean

        static setQAVDelegate(delegate: any): void;

        /**
         * 附着一个物理引擎中的space至全局环境中
         *
         * @param {BK.Physics.Space} attachSpace
         *
         * @memberof Director
         */
        attachSpace(attachSpace: BK.Physics.Space): void;


        //android特有方法
        static tickerPause(): void;
        //android特有方法
        static tickerResume(): void;

        static queryDeviceInfo(): void

    }

    class FileSystem {
        /**
         * 
         * 批量异步读取文件
         * 
         * @param object 读文件参数接口
         */
        public readFile(object: IFileSystemRead): void;

        /**
         * 
         * 批量异步写文件
         * 
         * @param object 写文件参数接口
         */
        public writeFile(object: IFileSystemWrite): void;

        /**
         * 
         * 批量异步压缩文件
         * 
         * @param object 压缩文件参数接口
         */
        public zip(object: IFileSystemZip): void;

        /**
         * 
         * 批量异步解压文件
         * 
         * @param object 解压文件接口
         */
        public unzip(object: IFileSystemZip): void;

        /**
         * 
         * 同步读取文件
         * 
         * @param filePath 文件路径
         */
        public readFileSync(filePath: string): ArrayBuffer;

        /**
         * 
         * 同步写文件
         * 
         * @param filePath 文件路径
         * @param data 文件内容
         */
        public writeFileSync(filePath: string, data: ArrayBuffer | string): void;

        /**
         * 
         * 同步压缩文件
         * 
         * @param srcPath 待压缩路径
         * @param targetZip 压缩包路径
         */
        public zipSync(srcPath: string, targetZip: string): void;

        /**
         * 
         * 同步解压文件
         * 
         * @param srcZip 待解压包路径
         * @param targetPath 解压路径
         */
        public unzipSync(srcZip: string, targetPath: string): void;

        /**
         * 
         * 创建目录
         * 
         * @param dirPath 目录路径
         */
        public makeDirSync(dirPath: string): void;

        /**
         * 
         * 删除文件
         * 
         * @param filePath 文件路径
         */
        public unlinkSync(filePath: string): void;

        /**
         * 
         * 拷贝文件
         * 
         * @param srcPath 源文件路径
         * @param destPath 目标文件路径
         */
        public copyFileSync(srcPath: string, destPath: string): void;

        /**
         * 
         * 文件是否存在
         * 
         * @param path 文件路径
         */
        public accessSync(path: string): boolean;

        /**
         * 
         * 路径是否是目录
         * 
         * @param path 文件或目录路径
         */
        public isDirectory(path: string): boolean;

        /**
         * 
         * 获取文件信息
         * 
         * @param file 文件路径
         */
        public getFileInfoSync(file: string): FileInfo;

        /**
         * 
         * 读取目录
         * 
         * @param object 读文件接口参数
         */
        public readDir(object: readDirParam): void;
    }


    class Image {

        buffer: BK.Buffer;
        format?: number;
        width: number;
        height: number;

        /**
         * 
         * @param config 加载图片参数接口
         */
        static loadImages(config: IImagesLoad): void;

        /**
         * 
         * @param buffer 将要加载的已经过base64编码的数据
         */
        static loadImageWithBase64(object:IImageLoadImageWithBase64 | ArrayBuffer | BK.Buffer):BK.Image|null;

        /**
        * 加载图片
        */
        static loadImage(object:IImageLoad|ArrayBuffer|BK.Buffer| any,format?:number): BK.Image;

        /**
         * 保存图片
         * @param bitmap 
         * @param width 
         * @param height 
         * @param path 
         * @param ext 
         * @param isFlipY 
         */
        static saveImage(object:ISaveImage|BK.Buffer|ArrayBuffer,
            width: number, //宽
            height: number,//高
            path: string, //路径
            ext: string, //后缀
            isFlipY?: number ): void;



        /**
         * info 异步加载图片列表 
         */
        static loadImageAsync(info:Array<any>):number;

        /**
         * 
         * 释放image 数据
         * 
         * @param buffer 需要释放的image数据
         */
        static dispose(buffer:BK.Buffer):void;

    }

    export interface FailInfo {
        code: FailCode                    // 状态码
        msg: string                     // 命令字
    }

    const enum FailCode {
        DEV_NO_SUPPORT = -1,  //开发工程下不支持分包
        QQ_NO_SUPPORT = -2,   //QQ版本不支持
        CONFIG_ERROR = -3,    //gameConfig.json配置无分包相应字段
        LOAD_FAILD = -4       //加载子包失败
    }

    interface LoadSubPackageParam {
        name: string, //子包名
        success?: () => void,
        fail?: (info: FailInfo) => void,
        complete?: () => void,
    }

    interface LoadSubPackageParam {
        name: string, //子包名
        success?: () => void,
        fail?: (info: FailInfo) => void,
        complete?: () => void,
    }

    export class SubPackageTask {
        constructor(packName: string)
        onProgressUpdate(callback: (progress: number) => void): void
    }

    /**
     * 分包加载
     * @param param 
     */
    export function loadSubpackage(param: LoadSubPackageParam): SubPackageTask;

    /**
     * 是否H5游戏
     */
    var isBrowser:boolean;


    interface SystemInfo {
        gameVersion: string,    //游戏版本号
        isMaster: number,       //是否房主，1房主，0参加者
        roomId: number,         //房间号
        gameId: number,         //游戏id
        osVersion: string,      //系统版本 10.3
        networkType: number,    //网络类型 1 电信 ，2 联通 ，3 移动  0: wifi或未知
        platform: string,       //取值为 ios或android
        openId: string,         //当前用户的标识
        QQVer: string,          //手机qq版本
        isFirstInstall:number,  //是否首次安装    1为首次安装 0非首次安装
        aioType:number,         //当前聊天窗类型    1.双人聊天 4.群 5.讨论组
        src: number,            //游戏启动入口    100:实时PK，200:聊天窗游戏消息
        isWhiteUser: number,    //是否为白名单用户，1是，0否
        gameType:number,        //游戏类型    (手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏
        model:string,           //具体机型    (手Q7.6.3及以上支持) 形如 "PRO 6 Plus"
        sex:number ,            //性别    1 男 2 女
        devPlatform?: string,   //仅在开发环境下可以，手q环境下无该字段
    }
    /**
     * 获取系统信息
     */
    function getSystemInfoSync() : SystemInfo;


    interface InnerViewOption 
    {
        orientation?:number, //1（默认，竖屏）2.横屏（home键在左边）3.横屏 （home键在右边）
        openId?:string, //默认是自己
        transparent?: boolean,     //是否透明
        url:string
    }
}