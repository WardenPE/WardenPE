import DataPacket from "../DataPacket"

class LevelChunkLoaderPacket extends DataPacket {

    constructor(
        client: any,
        private x: number = 0,
        private z: number = 0,
        private sub_chunk_count: number = 0,
        private cache_enabled: boolean = false,
        private payload: any[] = [],
    ) {
        super('level_chunk', client)
    }

    getX(): number {
        return this.x
    }

    getZ(): number {
        return this.z
    }

    getSubChunkCount(): number {
        return this.sub_chunk_count
    }

    getCacheEnabled(): boolean {
        return this.cache_enabled
    }

    getPayload(): any[] {
        return this.payload
    }

    protected encode(): any {
        return {
            x: this.getX(),
            z: this.getZ(),
            sub_chunk_count: this.getSubChunkCount(),
            cache_enabled: this.getCacheEnabled(),
            payload: this.getPayload()
        }
    }

    handle() {
        this.getClient().queue(this.getPacketName(), this.encode());
    }
}

export default LevelChunkLoaderPacket