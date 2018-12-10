const { ccclass, property } = cc._decorator;

/**
 * SDK管理器
 */
export default class FYSDKMgr {
    public static readonly Instance: FYSDKMgr = new FYSDKMgr();
    private constructor() { }

    /**
     * 保存本地数据
     * @param key 关键字
     * @param value 值
     */
    public saveLocalData(key, value) {
        cc.sys.localStorage.setItem(key, value)
    }

    /**
     * 读取本地数据，没有返回null
     * @param key 关键字
     * @param defaultValue 默认值 当没有key对应的数据时，返回该值
     */
    public loadLocalData(key, defaultValue = "0") {
        let value = cc.sys.localStorage.getItem(key);
        return value || defaultValue;
    }

    /**
     * 保存本地json数据
     * @param key 关键字
     * @param jsonData jsonData
     */
    public saveLocalJsonData(key, jsonData) {
        cc.sys.localStorage.setItem(key, JSON.stringify(jsonData));
    }

    /**
     * 读取本地json数据，没有返回null
     * @param key 关键字
     */
    public loadLocalJsonData(key) {
        var data = JSON.parse(cc.sys.localStorage.getItem(key) || JSON.stringify({}))
        return data;
    }

    /**
     * 移除本地数据，没有返回null
     * @param key 关键字
     */
    public removeLocalData(key) {
        cc.sys.localStorage.removeItem(key);
    }

    /**
    * 移除所有本地数据
   
    */
    public removeAllLocalData() {
        cc.sys.localStorage.clear();
    }

    /**
     * 将资源路径转成带MD5的资源路径
     * @param path 资源路径
     */
    public Md5Pipe(path) {
        let _path = path
        if (cc.loader.md5Pipe) {
            _path = cc.loader.md5Pipe.transformURL(_path);
        }
        return _path;
    }
}
