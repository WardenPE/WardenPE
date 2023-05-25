"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataPacket_1 = __importDefault(require("../DataPacket"));
class LevelChunkLoaderPacket extends DataPacket_1.default {
    constructor(client, x = 0, z = 0, sub_chunk_count = 0, cache_enabled = false, payload = []) {
        super('level_chunk', client);
        this.x = x;
        this.z = z;
        this.sub_chunk_count = sub_chunk_count;
        this.cache_enabled = cache_enabled;
        this.payload = payload;
    }
    getX() {
        return this.x;
    }
    getZ() {
        return this.z;
    }
    getSubChunkCount() {
        return this.sub_chunk_count;
    }
    getCacheEnabled() {
        return this.cache_enabled;
    }
    getPayload() {
        return this.payload;
    }
    encode() {
        return {
            x: this.getX(),
            z: this.getZ(),
            sub_chunk_count: this.getSubChunkCount(),
            cache_enabled: this.getCacheEnabled(),
            payload: this.getPayload()
        };
    }
}
exports.default = LevelChunkLoaderPacket;
