abstract class DataPacket {

    name: string;

    // @ts-ignore
    private _client: any;
    // @ts-ignore
    constructor(name: string, client) {
        this.name = name;
        this._client = client;
    }

    getPacketName(): string {
        return this.name;
    }

    getClient(): any {
        return this._client;
    }

    protected abstract encode(): any;

    handle(): void {
        this.getClient().write(this.getPacketName(), this.encode());
    }
}

export default DataPacket;