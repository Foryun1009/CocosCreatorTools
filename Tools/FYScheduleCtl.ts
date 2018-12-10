

const { ccclass, property } = cc._decorator;

@ccclass
export default class FYScheduleCtl extends cc.Component {
    private static _instance: FYScheduleCtl = null;
    /** 单例 */
    public static get Instance(): FYScheduleCtl {
        return FYScheduleCtl._instance;
    }

    public setSchedule(callback: Function, interval?: number, repeat?: number, delay?: number) {
        this.schedule(callback, interval, repeat, delay);
    }

    public cancelSchedule(callback: Function) {
        this.unschedule(callback);
    }

    public setScheduleOnce(callback: Function, delay?: number) {
        this.scheduleOnce(callback, delay);
    }

    // ----------------------------------------- 生命周期 -------------------------------------------------

    onLoad() {
        FYScheduleCtl._instance = this;
    }
}
