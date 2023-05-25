import * as fs from 'fs';
import * as yaml from 'js-yaml';
import BaseLog from "./BaseLog";
class Config {

    static PROPERTIES: number = 0;
    static JSON: number = 1;
    static YAML: number = 2;

    private config: any[] = [];

    private changed: boolean = false;

    constructor(
        private filename: string = '',
        private configType: number = 2, // YAML
        data: any = {}
    ) {
        this.load(data);
    }

    private load(data: any[]): void {
        if (!fs.existsSync(this.filename)) {
            this.config = data;
            this.save();
        } else {
            this.config = data;
        }
    }

    public get(key: string): any {
        for (let k in this.config) {
            if (k === key) {
                return this.config[k];
            }
        }
    }

    public save(): void {
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
        fs.writeFileSync(this.filename, content)
        this.changed = false;
    }

    private writeProperties(): string {
        let properties = '';
        for (let key in this.config) {
            if (typeof this.config[key] === 'boolean') {
                this.config[key] = this.config[key] ? 'on' : 'off';
            }
            properties += key + '=' + this.config[key] + '\n';
        }
        return properties;
    }
}

export default Config;