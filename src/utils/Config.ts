import * as fs from 'fs'
import * as yaml from 'js-yaml'
class Config {

    static PROPERTIES = 0
    static JSON = 1
    static YAML = 2

    private config: any[] = []

    private changed = false

    constructor(
        private filename: string = '',
        private configType: number = 2, // YAML
        data: any = {}
    ) {
        this.load(data)
    }

    private load(data: any[]): void {
        if (!fs.existsSync(this.filename)) {
            this.config = data
            this.save()
        } else {
            this.config = data
        }
    }

    get(key: string): any {
        for (const k in this.config) {
            if (k === key) {
                return this.config[k]
            }
        }
    }

    save(): void {
        let content = ''
        switch (this.configType) {
            case Config.PROPERTIES:
                content = this.writeProperties()
                break
            case Config.JSON:
                content = JSON.stringify(this.config)
                break
            case Config.YAML:
                content = yaml.dump(this.config)
                break
        }
        fs.writeFileSync(this.filename, content)
        this.changed = false
    }

    private writeProperties(): string {
        let properties = ''
        for (const key in this.config) {
            if (typeof this.config[key] === 'boolean') {
                this.config[key] = this.config[key] ? 'on' : 'off'
            }
            properties += key + '=' + this.config[key] + '\n'
        }
        return properties
    }
}

export default Config