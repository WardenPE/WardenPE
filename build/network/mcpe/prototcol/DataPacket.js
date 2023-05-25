"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataPacket {
    constructor(name, client) {
        this.name = name;
        this._client = client;
    }
    getPacketName() {
        return this.name;
    }
    getClient() {
        return this._client;
    }
    handle() {
        this.getClient().write(this.getPacketName(), this.encode());
    }
}
exports.default = DataPacket;
