import * as bedrock from "bedrock-protocol"
import ResourcePacksInfoPacket from "./network/mcpe/prototcol/ResourcePacksInfoPacket"
import ResourcePacksStackPacket from "./network/mcpe/prototcol/ResourcePackStackPacket"
import LevelChunkLoaderPacket from "./network/mcpe/prototcol/level/LevelChunkLoaderPacket"
import Config from "./utils/Config"
import BaseLog from "./utils/BaseLog"

class Server {

    private log: BaseLog

    constructor() {
        this.log = new BaseLog(
            'log.txt',
            'Asia/Ho_Chi_Minh',
            true
        )
    }

    getLogger(): BaseLog {
        return this.log
    }

    async createConfig(): Promise<Config> {
        const serverCfg = new Config(
            './server.properties',
            Config.PROPERTIES,
            {
                'server-name': 'WardenPE',
                'server-ip': '0.0.0.0',
                'server-port': 19132,
                'gamemode': 0,
                'difficulty': 1,
                'allow-cheats': true,
                'max-players': 20,
                'white-list': true,
                'server-type': 'normal',
                'spawn-protection': 16,
                'view-distance': 32,
                'tick-distance': 4,
                'level-name': 'world',
                'level-seed': ''
            }
        )
        this.getLogger().info('Server config loaded!')
        return serverCfg
    }

    async startServer() {
        const serverCfg = await this.createConfig()
        const server = bedrock.createServer({
            host: serverCfg.get('server-ip'),
            port: serverCfg.get('server-port'),
            version: '1.19.80',
            maxPlayers: serverCfg.get('max-players'),
            motd: {
                motd: serverCfg.get('server-name'),
                levelName: serverCfg.get('level-name'),
            }
        })
        this.getLogger().info('Server listening on port ' + serverCfg.get('server-port') + '...')
        server.on('connect', (client) => {
            client.on('join', () => {
                console.log('Client joined', client.getUserData())
                const resourcePacksInfoPacket = new ResourcePacksInfoPacket(
                    client,
                    false,
                    false,
                    [],
                    []
                )
                const resourcePacksStackPacket = new ResourcePacksStackPacket(
                    client,
                    false,
                    [],
                    [],
                    '',
                    [],
                    false
                )
                let chunks = null
                try {
                    chunks = require(`./../world/chunks_flat.json`).data
                } catch (e) {
                    console.log(e)
                }
                for (const chunk of chunks) {
                    const levelChunkLoaderPacket = new LevelChunkLoaderPacket(
                        client,
                        chunk.x,
                        chunk.z,
                        chunk.sub_chunk_count,
                        chunk.cache_enabled,
                        chunk.payload.data
                    )
                    levelChunkLoaderPacket.handle()
                }
                resourcePacksInfoPacket.handle()
                resourcePacksStackPacket.handle()
            })
        })
    }
}

export default Server