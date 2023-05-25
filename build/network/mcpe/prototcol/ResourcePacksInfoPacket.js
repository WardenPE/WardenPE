"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataPacket_1 = __importDefault(require("./DataPacket"));
class ResourcePacksInfoPacket extends DataPacket_1.default {
    constructor(client, must_accept = false, has_scripts = false, behaviour_packs = [], texture_packs = []) {
        super('resource_packs_info', client);
        this.must_accept = must_accept;
        this.has_scripts = has_scripts;
        this.behaviour_packs = behaviour_packs;
        this.texture_packs = texture_packs;
    }
    getMustAccept() {
        return this.must_accept;
    }
    getHasScripts() {
        return this.has_scripts;
    }
    getBehaviourPacks() {
        return this.behaviour_packs;
    }
    getTexturePacks() {
        return this.texture_packs;
    }
    encode() {
        return {
            must_accept: this.getMustAccept(),
            has_scripts: this.getHasScripts(),
            behaviour_packs: this.getBehaviourPacks(),
            texture_packs: this.getTexturePacks()
        };
    }
}
exports.default = ResourcePacksInfoPacket;
