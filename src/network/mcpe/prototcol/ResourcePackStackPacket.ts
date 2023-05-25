import DataPacket from "./DataPacket";

class ResourcePacksStackPacket extends DataPacket {

    constructor(
        client: any,
        private must_accept: boolean,
        private behaviour_packs: any[],
        private resource_packs: any[],
        private game_version: string,
        private experiments: any[],
        private experiments_previously_used: boolean
    ) {
        super('resource_pack_stack', client);
    }

    getMustAccept() : boolean {
        return this.must_accept;
    }

    getBehaviourPacks() : any[] {
        return this.behaviour_packs;
    }

    getResourcePacks() : any[] {
        return this.resource_packs;
    }

    getGameVersion() : string {
        return this.game_version;
    }

    getExperiments(): any[] {
        return this.experiments;
    }

    getExperimentsPreviouslyUsed(): boolean {
        return this.experiments_previously_used;
    }

    protected encode(): any {
        return {
            must_accept: this.getMustAccept(),
            behavior_packs: this.getBehaviourPacks(),
            resource_packs: this.getResourcePacks(),
            game_version: this.getGameVersion(),
            experiments: this.getExperiments(),
            experiments_previously_used: this.getExperimentsPreviouslyUsed()
        }
    }
}

export default ResourcePacksStackPacket;