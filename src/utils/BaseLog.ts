import TextFormat from "./TextFormat";

class BaseLog {

    static FORMAT: string = TextFormat.AQUA + '[{0}] ' + TextFormat.RESET + '{1}[{2}/{3}]: {4}' + TextFormat.RESET;
    private logFile: string;
    private timeZone: string;
    private logDebug: boolean;

    constructor(
        logFile: string,
        timeZone: string,
        logDebug: boolean = true
    ) {
        this.logFile = logFile;
        this.timeZone = timeZone;
        this.logDebug = logDebug;
    }

    public info(message: string) {
        this.send(message, 0);
    }

    public warn(message: string) {
        this.send(message, 1);
    }

    public error(message: string) {
        this.send(message, 2);
    }

    protected send(message: string, level: number): void {
        let date = new Date();
        let time = date.toLocaleString('en-US', { timeZone: this.timeZone });
        let levelName = 'INFO';
        switch (level) {
            case 0:
                levelName = 'INFO';
                break;
            case 1:
                levelName = 'WARN';
                break;
            case 2:
                levelName = 'ERROR';
                break;
        }
        let content = this.format(BaseLog.FORMAT, time, TextFormat.GOLD, levelName, TextFormat.GOLD, message);
        if (this.logDebug) {
            console.log(content);
        }
        this.write(content);
    }

    private write(content: string): void {
        const fs = require('fs');
        fs.appendFileSync(this.logFile, content + '\n');
    }

    protected format(str: string, ...args: any[]): string {
        return str.replace(/{(\d+)}/g, (match, index) => {
            const argIndex = parseInt(index, 10);
            return args[argIndex] !== undefined ? args[argIndex] : match;
        });
    }
}

export default BaseLog;