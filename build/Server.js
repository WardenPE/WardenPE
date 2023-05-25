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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bedrock = __importStar(require("bedrock-protocol"));
const ResourcePacksInfoPacket_1 = __importDefault(require("./network/mcpe/prototcol/ResourcePacksInfoPacket"));
const ResourcePackStackPacket_1 = __importDefault(require("./network/mcpe/prototcol/ResourcePackStackPacket"));
const LevelChunkLoaderPacket_1 = __importDefault(require("./network/mcpe/prototcol/level/LevelChunkLoaderPacket"));
const Config_1 = __importDefault(require("./utils/Config"));
const BaseLog_1 = __importDefault(require("./utils/BaseLog"));
const Warden_1 = __importDefault(require("./Warden"));
class Server {
    constructor() {
        this.log = new BaseLog_1.default('log.txt', 'Asia/Ho_Chi_Minh', true);
    }
    getLogger() {
        return this.log;
    }
    createConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverCfg = new Config_1.default('./server.properties', Config_1.default.PROPERTIES, {
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
            });
            this.getLogger().info('Server config loaded!');
            return serverCfg;
        });
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverCfg = yield this.createConfig();
            const server = bedrock.createServer({
                host: serverCfg.get('server-ip'),
                port: serverCfg.get('server-port'),
                version: Warden_1.default.warden_version,
                maxPlayers: serverCfg.get('max-players'),
                motd: {
                    motd: serverCfg.get('server-name'),
                    levelName: serverCfg.get('level-name'),
                }
            });
            this.getLogger().info('Server listening on port ' + serverCfg.get('server-port') + '...');
            server.on('connect', (client) => {
                client.on('join', () => {
                    console.log('Client joined', client.getUserData());
                    const resourcePacksInfoPacket = new ResourcePacksInfoPacket_1.default(client, false, false, [], []);
                    const resourcePacksStackPacket = new ResourcePackStackPacket_1.default(client, false, [], [], '', [], false);
                    resourcePacksInfoPacket.handle();
                    resourcePacksStackPacket.handle();
                    client.once(`resource_pack_client_response`, (rp) => __awaiter(this, void 0, void 0, function* () {
                        client.write(`network_settings`, {
                            compression_threshold: 1,
                        });
                        let chunks = null;
                        try {
                            chunks = require(`./../world/chunks_flat.json`).data;
                        }
                        catch (e) {
                            console.log(e);
                        }
                        for (const chunk of chunks) {
                            const levelChunkLoaderPacket = new LevelChunkLoaderPacket_1.default(client, chunk.x, chunk.z, chunk.sub_chunk_count, chunk.cache_enabled, chunk.payload.data);
                            levelChunkLoaderPacket.handle();
                        }
                    }));
                });
            });
        });
    }
}
exports.default = Server;
