"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bedrock = __importStar(require("bedrock-protocol"));
const World_1 = require("./world/World");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = 19132;
        const server = bedrock.createServer({
            host: '0.0.0.0',
            port: port,
            version: '1.19.80',
            motd: {
                motd: '&aWardenPE',
            }
        });
        console.log('Server listening on port ' + port + '...');
        const world = yield (0, World_1.loadWorld)();
        const chunks = yield world.requestChunks(0, 0, 2);
        server.on('connect', (client) => {
            client.on('join', () => {
                console.log('Client joined', client.getUserData());
                client.write('resource_packs_info', {
                    must_accept: false,
                    has_scripts: false,
                    behaviour_packs: [],
                    texture_packs: []
                });
                client.write('resource_pack_stack', {
                    must_accept: false,
                    behavior_packs: [],
                    resource_packs: [],
                    game_version: '',
                    experiments: [],
                    experiments_previously_used: false
                });
                client.once('resource_pack_client_response', (rp) => __awaiter(this, void 0, void 0, function* () {
                    client.write('network_settings', { compression_threshold: 1 });
                    for (const chunk of chunks) {
                        client.queue('level_chunk', chunk);
                    }
                    setTimeout(() => {
                        client.write('play_status', { status: 'player_spawn' });
                    }, 6000);
                    client.on('tick_sync', (packet) => {
                        client.queue('tick_sync', {
                            request_time: packet.request_time,
                            response_time: BigInt(Date.now())
                        });
                    });
                }));
            });
        });
    });
}
startServer();
