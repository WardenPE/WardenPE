"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataPacket_1 = __importDefault(require("./DataPacket"));
class StartGamePacket extends DataPacket_1.default {
    constructor(client, entity_id = 0, runtimeentity_id = 0, player_gamemode = 0, player_position = {
        x: 0,
        y: 0,
        z: 0
    }, pitch = 0, yaw = 0, seed = 0, biome_type = 0, biome_nameprivate = '', dimension = 0, generator = 0, world_gamemode = 0, difficulty = 0, spawn_position = {
        x: 0,
        y: 0,
        z: 0
    }, permission_level = 0, world) {
        super('start_game', client);
        this.entity_id = entity_id;
        this.runtimeentity_id = runtimeentity_id;
        this.player_gamemode = player_gamemode;
        this.player_position = player_position;
        this.pitch = pitch;
        this.yaw = yaw;
        this.seed = seed;
        this.biome_type = biome_type;
        this.biome_nameprivate = biome_nameprivate;
        this.dimension = dimension;
        this.generator = generator;
        this.world_gamemode = world_gamemode;
        this.difficulty = difficulty;
        this.spawn_position = spawn_position;
        this.permission_level = permission_level;
        this.world = world;
    }
    getEntityId() {
        return this.entity_id;
    }
    getRuntimeEntityId() {
        return this.runtimeentity_id;
    }
    getPlayerGamemode() {
        return this.player_gamemode;
    }
    getPlayerPosition() {
        return this.player_position;
    }
    getPitch() {
        return this.pitch;
    }
    getYaw() {
        return this.yaw;
    }
    getSeed() {
        return this.seed;
    }
    getBiomeType() {
        return this.biome_type;
    }
    getBiomeName() {
        return this.biome_nameprivate;
    }
    getDimension() {
        return this.dimension;
    }
    getGenerator() {
        return this.generator;
    }
    getWorldGamemode() {
        return this.world_gamemode;
    }
    getDifficulty() {
        return this.difficulty;
    }
    getSpawnPosition() {
        return this.spawn_position;
    }
    getPermissionLevel() {
        return this.permission_level;
    }
    getWorld() {
        return this.world;
    }
    getWorldName() {
        return "world";
    }
    encode() {
        return {
            entity_id: this.getEntityId(),
            runtime_entity_id: this.getRuntimeEntityId(),
            player_gamemode: this.getPlayerGamemode(),
            player_position: this.getPlayerPosition(),
            rotation: {
                x: this.getPitch(),
                y: this.getYaw()
            },
            seed: this.getSeed(),
            biome_type: this.getBiomeType(),
            biome_name: this.getBiomeName(),
            dimension: this.getDimension(),
            generator: this.getGenerator(),
            world_gamemode: this.getWorldGamemode(),
            difficulty: this.getDifficulty(),
            spawn_position: this.getSpawnPosition(),
            achievements_disabled: true,
            editor_world: false,
            day_cycle_stop_time: 1,
            edu_offer: 0,
            edu_features_enabled: false,
            edu_product_uuid: "",
            rain_level: 0,
            lightning_level: 0,
            has_confirmed_platform_locked_content: false,
            is_multiplayer: true,
            broadcast_to_lan: true,
            xbox_live_broadcast_mode: 8,
            platform_broadcast_mode: 8,
            enable_commands: true,
            is_texturepacks_required: false,
            gamerules: require('./../../../../world/gamerules.json').gamerules,
            experiments: [],
            experiments_previously_used: false,
            bonus_chest: false,
            map_enabled: false,
            permission_level: this.getPermissionLevel(),
            server_chunk_tick_range: 4,
            has_locked_behavior_pack: false,
            has_locked_resource_pack: false,
            is_from_locked_world_template: false,
            msa_gamertags_only: false,
            is_from_world_template: false,
            is_world_template_option_locked: false,
            only_spawn_v1_villagers: false,
            persona_disabled: false,
            custom_skins_disabled: false,
            emote_chat_muted: false,
            game_version: "*",
            limited_world_width: 0,
            limited_world_length: 0,
            is_new_nether: false,
            edu_resource_uri: {
                button_name: "",
                link_uri: "",
            },
            experimental_gameplay_override: false,
            chat_restriction_level: "none",
            disable_player_interactions: false,
            level_id: this.getWorldName(),
            world_name: this.getWorldName(),
            premium_world_template_id: "00000000-0000-0000-0000-000000000000",
            is_trial: false,
            movement_authority: "server",
            rewind_history_size: 0,
            server_authoritative_block_breaking: false,
            current_tick: [-1, -1],
            enchantment_seed: 0,
            block_properties: [],
            itemstates: require('./../../../resources/items.json').itemstates,
            multiplayer_correlation_id: "",
            server_authoritative_inventory: true,
            engine: "WardenPE",
            property_data: {
                type: "compound",
                name: "",
                value: {},
            },
            block_pallette_checksum: [0, 0],
            world_template_id: "00000000-0000-0000-0000-000000000000",
            client_side_generation: false,
        };
    }
}
exports.default = StartGamePacket;
