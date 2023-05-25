import * as bedrock from 'bedrock-protocol';
import ResourcePacksInfoPacket from "./network/mcpe/prototcol/ResourcePacksInfoPacket";
import ResourcePacksStackPacket from "./network/mcpe/prototcol/ResourcePackStackPacket";
import LevelChunkLoaderPacket from "./network/mcpe/prototcol/level/LevelChunkLoaderPacket";
async function startServer() {
    const port = 19132;
    const server = bedrock.createServer({
        host: '0.0.0.0',
        port: port,
        version: '1.19.80',
        motd: {
            motd: '&aWardenPE',
            levelName: 'world',
        }
    });
    console.log('Server listening on port ' + port + '...')
    server.on('connect', (client) => {
        client.on('join', () => {
            console.log('Client joined', client.getUserData())
            const resourcePacksInfoPacket = new ResourcePacksInfoPacket(
                client,
                false,
                false,
                [],
                []
            );
            const resourcePacksStackPacket = new ResourcePacksStackPacket(
                client,
                false,
                [],
                [],
                '',
                [],
                false
            );
            let chunks = null;
            try {
                chunks = require(`./../world/chunks_flat.json`).data;
            } catch (e) {
                console.log(e);
            }
            for (const chunk of chunks) {
                const levelChunkLoaderPacket = new LevelChunkLoaderPacket(
                    client,
                    chunk.x,
                    chunk.z,
                    chunk.sub_chunk_count,
                    chunk.cache_enabled,
                    chunk.payload.data
                );
                levelChunkLoaderPacket.handle();
            }
            resourcePacksInfoPacket.handle();
            resourcePacksStackPacket.handle();
        })
    })
}

startServer();