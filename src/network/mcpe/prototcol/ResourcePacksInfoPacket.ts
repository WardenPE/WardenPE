import DataPacket from "./DataPacket";

class ResourcePacksInfoPacket extends DataPacket {

    constructor(
        client: any,
        private must_accept: boolean = false,
        private has_scripts: boolean = false,
        private behaviour_packs: any[] = [],
        private texture_packs: any[] = []
    ) {
        super('resource_packs_info', client);
    }

    getMustAccept(): boolean {
        return this.must_accept;
    }

    getHasScripts(): boolean {
        return this.has_scripts;
    }

    getBehaviourPacks(): any[] {
        return this.behaviour_packs;
    }

    getTexturePacks(): any[] {
        return this.texture_packs;
    }

    protected encode(): any {
        return {
            must_accept: this.getMustAccept(),
            has_scripts: this.getHasScripts(),
            behaviour_packs: this.getBehaviourPacks(),
            texture_packs: this.getTexturePacks()
        }
    }
}

export default ResourcePacksInfoPacket;