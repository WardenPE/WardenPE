import DataPacket from "./DataPacket";

class StartGamePacket extends DataPacket {

    constructor(
        client: any,
        private entity_id: number = 0,
        private runtimeentity_id: number = 0,
        private player_gamemode: number = 0,
        private player_position: any = {
            x: 0,
            y: 0,
            z: 0
        },
        private pitch: number = 0,
        private yaw: number = 0,
        private seed: number = 0,
        private biome_type: number = 0,
        private biome_nameprivate : string = '',
        private dimension: number = 0,
        private generator: number = 0,
        private world_gamemode: number = 0,
        private difficulty: number = 0,
        private spawn_position: any = {
            x: 0,
            y: 0,
            z: 0
        },
        private permission_level: number = 0,
        private world: any
    ){
        super('start_game', client);
    }

    getEntityId(): number {
        return this.entity_id;
    }

    getRuntimeEntityId(): number {
        return this.runtimeentity_id;
    }

    getPlayerGamemode(): number {
        return this.player_gamemode;
    }

    getPlayerPosition(): any {
        return this.player_position;
    }

    getPitch(): number {
        return this.pitch;
    }

    getYaw(): number {
        return this.yaw;
    }

    getSeed(): number {
        return this.seed;
    }

    getBiomeType(): number {
        return this.biome_type;
    }

    getBiomeName(): string {
        return this.biome_nameprivate;
    }

    getDimension(): number {
        return this.dimension;
    }

    getGenerator(): number {
        return this.generator;
    }

    getWorldGamemode(): number {
        return this.world_gamemode;
    }

    getDifficulty(): number {
        return this.difficulty;
    }

    getSpawnPosition(): any {
        return this.spawn_position;
    }

    getPermissionLevel(): number {
        return this.permission_level;
    }

    getWorld(): any {
        return this.world;
    }

    getWorldName(): string {
        return "world";
    }

    protected encode(): any {
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
        }
    }
}

export default StartGamePacket;