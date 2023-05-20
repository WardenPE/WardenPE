import { LevelDB } from 'leveldb-zlib';
import { WorldProvider } from 'bedrock-provider';
import {
    join
} from 'path';

async function loadWorld() {
    const path = join(__dirname, `./Bedrock level/db`);
    console.log(`Loading world from ${path}`);
    const db = new LevelDB(path, { createIfMissing: false });
    await db.open();
    const wp = new WorldProvider(db, { dimension: 0 });
    async function requestChunks(x: number, z: number, radius: number) {
        const chunks = [];
        const cxStart: number = (x >> 4) - radius;
        const cxEnd: number = (x >> 4) + radius;
        const czStart: number = (z >> 4) - radius;
        const czEnd: number = (z >> 4) + radius;
        for (let cx = cxStart; cx < cxEnd; cx++) {
            for (let cz = czStart; cz < czEnd; cz++) {
                const cc = await wp.load(cx, cz, true)
                if (!cc) {
                    continue
                }
                const cbuf = await cc.networkEncodeNoCache()
                chunks.push({
                    x: cx,
                    z: cz,
                    sub_chunk_count: cc.sectionsLen,
                    cache_enabled: false,
                    blobs: [],
                    payload: cbuf
                })
            }
        }
        return chunks;
    }
    return { requestChunks }
}

export {
    loadWorld
}