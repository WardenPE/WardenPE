"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
class Config {
    constructor(filename = '', configType = 2, data = {}) {
        this.filename = filename;
        this.configType = configType;
        this.config = [];
        this.changed = false;
        this.load(data);
    }
    load(data) {
        if (!fs.existsSync(this.filename)) {
            this.config = data;
            this.save();
        }
        else {
            this.config = data;
        }
    }
    get(key) {
        for (const k in this.config) {
            if (k === key) {
                return this.config[k];
            }
        }
    }
    save() {
        let content = '';
        switch (this.configType) {
            case Config.PROPERTIES:
                content = this.writeProperties();
                break;
            case Config.JSON:
                content = JSON.stringify(this.config);
                break;
            case Config.YAML:
                content = yaml.dump(this.config);
                break;
        }
        fs.writeFileSync(this.filename, content);
        this.changed = false;
    }
    writeProperties() {
        let properties = '';
        for (const key in this.config) {
            if (typeof this.config[key] === 'boolean') {
                this.config[key] = this.config[key] ? 'on' : 'off';
            }
            properties += key + '=' + this.config[key] + '\n';
        }
        return properties;
    }
}
Config.PROPERTIES = 0;
Config.JSON = 1;
Config.YAML = 2;
exports.default = Config;
