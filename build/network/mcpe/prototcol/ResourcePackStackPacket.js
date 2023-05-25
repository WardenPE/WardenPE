"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataPacket_1 = __importDefault(require("./DataPacket"));
class ResourcePacksStackPacket extends DataPacket_1.default {
    constructor(client, must_accept, behaviour_packs, resource_packs, game_version, experiments, experiments_previously_used) {
        super('resource_pack_stack', client);
        this.must_accept = must_accept;
        this.behaviour_packs = behaviour_packs;
        this.resource_packs = resource_packs;
        this.game_version = game_version;
        this.experiments = experiments;
        this.experiments_previously_used = experiments_previously_used;
    }
    getMustAccept() {
        return this.must_accept;
    }
    getBehaviourPacks() {
        return this.behaviour_packs;
    }
    getResourcePacks() {
        return this.resource_packs;
    }
    getGameVersion() {
        return this.game_version;
    }
    getExperiments() {
        return this.experiments;
    }
    getExperimentsPreviouslyUsed() {
        return this.experiments_previously_used;
    }
    encode() {
        return {
            must_accept: this.getMustAccept(),
            behavior_packs: this.getBehaviourPacks(),
            resource_packs: this.getResourcePacks(),
            game_version: this.getGameVersion(),
            experiments: this.getExperiments(),
            experiments_previously_used: this.getExperimentsPreviouslyUsed()
        };
    }
}
exports.default = ResourcePacksStackPacket;
