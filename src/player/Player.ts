import * as bedrock from 'bedrock-protocol'
class Player extends bedrock.Player {

    readonly MOVES_PER_TICK = 2
    readonly MOVE_BACKLOG_SIZE = 100 * this.MOVES_PER_TICK //100 ticks backlog (5 seconds)

    readonly MAX_CHAT_CHAR_LENGTH = 512

    readonly MAX_CHAT_BYTE_LENGTH = this.MAX_CHAT_CHAR_LENGTH * 4
    readonly MAX_REACH_DISTANCE_CREATIVE = 13
    readonly MAX_REACH_DISTANCE_SURVIVAL = 7
    readonly MAX_REACH_DISTANCE_ENTITY_INTERACTION = 8

    readonly TAG_FIRST_PLAYED = "FirstPlayed" //TAG_Long
    readonly TAG_LAST_PLAYED = "LastPlayed" //TAG_Long
    readonly TAG_GAME_MODE = "PlayerGameType" //TAG_Int
    readonly TAG_SPAWN_WORLD = "SpawnLevel" //TAG_String
    readonly TAG_SPAWN_X = "SpawnX" //TAG_Int
    readonly TAG_SPAWN_Y = "SpawnY" //TAG_Int
    readonly TAG_SPAWN_Z = "SpawnZ" //TAG_Int
    readonly TAG_LEVEL = "Level" //TAG_String
    readonly TAG_LAST_KNOWN_XUID = "LastKnownXUID" //TAG_String

    protected usedChunks: any[] = []
    private activeChunkGenerationRequests: any[] = []
    /**
     * @var true[] chunkHash => dummy
     * @phpstan-var array<int, true>
     */
    protected loadQueue: any[] = []
    protected nextChunkOrderRun = 5

    /** @var true[] */
    private tickingChunks: any[] = []

    protected viewDistance = -1
    protected spawnThreshold = 0
    protected spawnChunkLoadCount = 0
    protected chunksPerTick = 0
    // protected ChunkSelector $chunkSelector;
    // protected ChunkLoader $chunkLoader;
    // protected ChunkTicker $chunkTicker;

    /** @var bool[] map: raw UUID (string) => bool */
    protected hiddenPlayers: any[] = []

    protected moveRateLimit: number = 10 * this.MOVES_PER_TICK
    protected lastMovementProcess: number|null = null

    protected inAirTicks = 0
    /** @var float */
    protected stepHeight = 0.6

    private respawnLocked = false

    //TODO: Abilities
    protected autoJump = true
    protected allowFlight = false
    protected blockCollision = true
    protected flying = false

    /** @phpstan-var positive-int|null  */
    protected lineHeight: number|null = null
    protected locale = "en_US"

    protected startAction = -1
    /** @var int[] ID => ticks map */
    protected usedItemsCooldown: any[] = []

    private lastEmoteTick = 0

    protected formIdCounter = 0
    /** @var Form[] */
    protected forms: any[] = []

    protected displayName = ""

    protected authenticated = false

    protected firstPlayed = 0

    protected lastPlayed = 0

    getUserName(): string {
        return <string>this.profile?.name
    }

    getDisplayName(): string {
        return this.displayName
    }

    getXuid(): string {
        return this.profile?.xuid as string
    }

    hasAuthenticated(): boolean {
        return this.authenticated
    }

    getFirstPlayed(): number {
        return this.firstPlayed
    }

    getLastPlayed(): number {
        return this.lastPlayed
    }
}

export default Player