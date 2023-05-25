import * as bedrock from 'bedrock-protocol';
class Player extends bedrock.Player {

    readonly MOVES_PER_TICK = 2;
    readonly MOVE_BACKLOG_SIZE = 100 * this.MOVES_PER_TICK; //100 ticks backlog (5 seconds)

    readonly MAX_CHAT_CHAR_LENGTH = 512;

    readonly MAX_CHAT_BYTE_LENGTH = this.MAX_CHAT_CHAR_LENGTH * 4;
    readonly MAX_REACH_DISTANCE_CREATIVE = 13;
    readonly MAX_REACH_DISTANCE_SURVIVAL = 7;
    readonly MAX_REACH_DISTANCE_ENTITY_INTERACTION = 8;

    readonly TAG_FIRST_PLAYED = "FirstPlayed"; //TAG_Long
    readonly TAG_LAST_PLAYED = "LastPlayed"; //TAG_Long
    readonly TAG_GAME_MODE = "PlayerGameType"; //TAG_Int
    readonly TAG_SPAWN_WORLD = "SpawnLevel"; //TAG_String
    readonly TAG_SPAWN_X = "SpawnX"; //TAG_Int
    readonly TAG_SPAWN_Y = "SpawnY"; //TAG_Int
    readonly TAG_SPAWN_Z = "SpawnZ"; //TAG_Int
    readonly TAG_LEVEL = "Level"; //TAG_String
    readonly TAG_LAST_KNOWN_XUID = "LastKnownXUID"; //TAG_String

    protected usedChunks : any[] = [];
    private activeChunkGenerationRequests : any[] = [];
    /**
     * @var true[] chunkHash => dummy
     * @phpstan-var array<int, true>
     */
    protected loadQueue : any[] = [];
    protected nextChunkOrderRun : number = 5;

    /** @var true[] */
    private tickingChunks : any[] = [];

    protected viewDistance : number = -1;
    protected spawnThreshold : number = 0;
    protected spawnChunkLoadCount : number = 0;
    protected chunksPerTick : number = 0;
    // protected ChunkSelector $chunkSelector;
    // protected ChunkLoader $chunkLoader;
    // protected ChunkTicker $chunkTicker;

    /** @var bool[] map: raw UUID (string) => bool */
    protected hiddenPlayers : any[] = [];

    protected moveRateLimit : number = 10 * this.MOVES_PER_TICK;
    protected lastMovementProcess : number|null = null;

    protected inAirTicks : number = 0;
    /** @var float */
    protected stepHeight : number = 0.6;

    private respawnLocked : boolean = false;

    //TODO: Abilities
    protected autoJump : boolean = true;
    protected allowFlight : boolean = false;
    protected blockCollision : boolean = true;
    protected flying : boolean = false;

    /** @phpstan-var positive-int|null  */
    protected lineHeight : number|null = null;
    protected locale : string = "en_US";

    protected startAction : number = -1;
    /** @var int[] ID => ticks map */
    protected usedItemsCooldown : any[] = [];

    private lastEmoteTick : number = 0;

    protected formIdCounter : number = 0;
    /** @var Form[] */
    protected forms : any[] = [];

    protected displayName : string = "";

    protected authenticated : boolean = false;

    protected firstPlayed : number = 0;

    protected lastPlayed : number = 0;

    getUserName() : string {
        // @ts-ignore
        return this.profile?.name;
    }

    getDisplayName() : string {
        return this.displayName;
    }

    getXuid() : string {
        return <string>this.profile?.xuid;
    }

    hasAuthenticated() : boolean {
        return this.authenticated;
    }

    getFirstPlayed() : number {
        return this.firstPlayed;
    }

    getLastPlayed() : number {
        return this.lastPlayed;
    }
}

export default Player;