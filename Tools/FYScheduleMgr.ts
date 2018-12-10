/** 定时器管理器 */
export default class FYScheduleMgr {
    public static readonly Instance: FYScheduleMgr = new FYScheduleMgr();
    private constructor() { }

    /**
     * 指定回调函数，调用对象等信息来添加一个新的定时器。
     * @param callback 回调
     * @param target 定时器添加的对象
     * @param interval 间隔时间
     * @param repeat 重复次数
     * @param delay 延迟时间
     */
    public schedule(callback: Function, target: any, interval: number, repeat: number, delay: number) {
        cc.director.getScheduler().schedule(callback, target, interval, repeat, delay, false);
    }

    /**
     * 指执行一次的定时器
     * @param callback 回调
     * @param target 定时器添加的对象
     * @param delay 延迟时间
     */
    public scheduleOnce(callback: Function, target: any, delay: number) {
        this.schedule(callback, target, 0, 0, delay);
    }

    /**
     * 取消定时器
     * @param callback 回调
     * @param target 定时器添加的对象
     */
    public unschedule(callback: Function, target: any) {
        cc.director.getScheduler().unschedule(callback, target);
    }

    /**
     * 取消所有定时器
     * @param target 定时器添加的对象
     */
    public unscheduleAllCallbacks(target: any) {
        cc.director.getScheduler().unscheduleAllForTarget(target);
    }
}
