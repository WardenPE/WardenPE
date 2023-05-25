"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextFormat_1 = __importDefault(require("./TextFormat"));
class BaseLog {
    constructor(logFile, timeZone, logDebug = true) {
        this.logFile = logFile;
        this.timeZone = timeZone;
        this.logDebug = logDebug;
    }
    info(message) {
        this.send(message, 0);
    }
    warn(message) {
        this.send(message, 1);
    }
    error(message) {
        this.send(message, 2);
    }
    send(message, level) {
        const date = new Date();
        const time = date.toLocaleString('en-US', { timeZone: this.timeZone });
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
        const content = this.format(BaseLog.FORMAT, time, TextFormat_1.default.GOLD, levelName, TextFormat_1.default.GOLD, message);
        if (this.logDebug) {
            console.log(content);
        }
        this.write(content);
    }
    write(content) {
        const fs = require('fs');
        fs.appendFileSync(this.logFile, content + '\n');
    }
    format(str, ...args) {
        return str.replace(/{(\d+)}/g, (match, index) => {
            const argIndex = parseInt(index, 10);
            return args[argIndex] !== undefined ? args[argIndex] : match;
        });
    }
}
BaseLog.FORMAT = TextFormat_1.default.AQUA + '[{0}] ' + TextFormat_1.default.RESET + '{1}[{2}/{3}]: {4}' + TextFormat_1.default.RESET;
exports.default = BaseLog;
