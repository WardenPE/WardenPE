import * as bedrock from 'bedrock-protocol';
import {loadWorld} from "./world/World";
import {
    getInfo
} from "./item/Item";

async function startServer() {
    const port = 19132;
    const server = bedrock.createServer({
        host: '0.0.0.0',
        port: port,
        version: '1.19.80',
        motd: {
            motd: '&aWardenPE',
        }
    });
    console.log('Server listening on port ' + port + '...')
    const world = await loadWorld();
    const chunks = await world.requestChunks(0, 0, 2);
    server.on('connect', (client) => {
        client.on('join', () => {
            console.log('Client joined', client.getUserData())
            client.write('resource_packs_info', {
                must_accept: false,
                has_scripts: false,
                behaviour_packs: [],
                texture_packs: []
            })
            client.write('resource_pack_stack', {
                must_accept: false,
                behavior_packs: [],
                resource_packs: [],
                game_version: '',
                experiments: [],
                experiments_previously_used: false
            })
            client.once('resource_pack_client_response', async rp => {
            })
        })
    })
}

startServer();