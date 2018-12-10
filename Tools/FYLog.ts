const { ccclass, property } = cc._decorator;
/** 日志管理器 */
@ccclass
export default class FYLog {
    /** Log switch */
    public static enable = true;

    public static assert(condition?: boolean, message?: string, ...data: any[]): void {
        if (FYLog.enable) {
            console.assert(condition, message, ...data);
        }
    }

    public static clear(): void {
        if (FYLog.enable) {
            console.clear();
        }
    }

    public static count(label?: string): void {
        if (FYLog.enable) {
            console.count(label);
        }
    }

    public static debug(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.debug(message, ...optionalParams);
        }
    }

    public static dir(value?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.dir(value, ...optionalParams);
        }
    }

    public static dirxml(value: any): void {
        if (FYLog.enable) {
            console.dirxml(value);
        }
    }

    public static error(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.error(message, ...optionalParams);
        }
    }

    public static exception(message?: string, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.exception(message, ...optionalParams);
        }
    }

    public static group(groupTitle?: string, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.group(groupTitle, ...optionalParams);
        }
    }

    public static groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.groupCollapsed(groupTitle, ...optionalParams);
        }
    }

    public static groupEnd(): void {
        if (FYLog.enable) {
            console.groupEnd();
        }
    }

    public static info(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.info(message, ...optionalParams);
        }
    }

    public static log(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.log(message, ...optionalParams);
        }
    }

    public static markTimeline(label?: string): void {
        if (FYLog.enable) {
            console.markTimeline(label);
        }
    }

    public static msIsIndependentlyComposed(element: Element): boolean {
        if (FYLog.enable) {
            return console.msIsIndependentlyComposed(element);
        }
    }

    public static profile(reportName?: string): void {
        if (FYLog.enable) {
            console.profile(reportName);
        }
    }

    public static profileEnd(): void {
        if (FYLog.enable) {
            console.profileEnd();
        }
    }

    public static select(element: Element): void {
        if (FYLog.enable) {
            console.select(element);
        }
    }

    public static table(...tabularData: any[]): void {
        if (FYLog.enable) {
            console.table(...tabularData);
        }
    }

    public static time(label?: string): void {
        if (FYLog.enable) {
            console.time(label);
        }
    }

    public static timeEnd(label?: string): void {
        if (FYLog.enable) {
            console.timeEnd(label);
        }
    }

    public static timeStamp(label?: string): void {
        if (FYLog.enable) {
            console.timeStamp(label);
        }
    }

    public static timeline(label?: string): void {
        if (FYLog.enable) {
            console.timeline(label);
        }
    }

    public static timelineEnd(label?: string): void {
        if (FYLog.enable) {
            console.timelineEnd(label);
        }
    }

    public static warn(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.warn(message, ...optionalParams);
        }
    }

}
