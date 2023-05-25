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
Object.defineProperty(exports, "__esModule", { value: true });
const bedrock = __importStar(require("bedrock-protocol"));
class Player extends bedrock.Player {
    constructor() {
        super(...arguments);
        this.MOVES_PER_TICK = 2;
        this.MOVE_BACKLOG_SIZE = 100 * this.MOVES_PER_TICK;
        this.MAX_CHAT_CHAR_LENGTH = 512;
        this.MAX_CHAT_BYTE_LENGTH = this.MAX_CHAT_CHAR_LENGTH * 4;
        this.MAX_REACH_DISTANCE_CREATIVE = 13;
        this.MAX_REACH_DISTANCE_SURVIVAL = 7;
        this.MAX_REACH_DISTANCE_ENTITY_INTERACTION = 8;
        this.TAG_FIRST_PLAYED = "FirstPlayed";
        this.TAG_LAST_PLAYED = "LastPlayed";
        this.TAG_GAME_MODE = "PlayerGameType";
        this.TAG_SPAWN_WORLD = "SpawnLevel";
        this.TAG_SPAWN_X = "SpawnX";
        this.TAG_SPAWN_Y = "SpawnY";
        this.TAG_SPAWN_Z = "SpawnZ";
        this.TAG_LEVEL = "Level";
        this.TAG_LAST_KNOWN_XUID = "LastKnownXUID";
        this.usedChunks = [];
        this.activeChunkGenerationRequests = [];
        this.loadQueue = [];
        this.nextChunkOrderRun = 5;
        this.tickingChunks = [];
        this.viewDistance = -1;
        this.spawnThreshold = 0;
        this.spawnChunkLoadCount = 0;
        this.chunksPerTick = 0;
        this.hiddenPlayers = [];
        this.moveRateLimit = 10 * this.MOVES_PER_TICK;
        this.lastMovementProcess = null;
        this.inAirTicks = 0;
        this.stepHeight = 0.6;
        this.respawnLocked = false;
        this.autoJump = true;
        this.allowFlight = false;
        this.blockCollision = true;
        this.flying = false;
        this.lineHeight = null;
        this.locale = "en_US";
        this.startAction = -1;
        this.usedItemsCooldown = [];
        this.lastEmoteTick = 0;
        this.formIdCounter = 0;
        this.forms = [];
        this.displayName = "";
        this.authenticated = false;
        this.firstPlayed = 0;
        this.lastPlayed = 0;
    }
    getUserName() {
        var _a;
        return (_a = this.profile) === null || _a === void 0 ? void 0 : _a.name;
    }
    getDisplayName() {
        return this.displayName;
    }
    getXuid() {
        var _a;
        return (_a = this.profile) === null || _a === void 0 ? void 0 : _a.xuid;
    }
    hasAuthenticated() {
        return this.authenticated;
    }
    getFirstPlayed() {
        return this.firstPlayed;
    }
    getLastPlayed() {
        return this.lastPlayed;
    }
}
exports.default = Player;
