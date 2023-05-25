abstract class DataPacket {

    name: string

    private _client: any
    constructor(name: string, client: any) {
        this.name = name
        this._client = client
    }

    getPacketName(): string {
        return this.name
    }

    getClient(): any {
        return this._client
    }

    protected abstract encode(): any

    handle(): void {
        this.getClient().write(this.getPacketName(), this.encode())
    }
}

export default DataPacket