"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const ItemOption_1 = require("./ItemOption");
function getInfo(version) {
    class Item {
        constructor(obj) {
            this.networkId = 0;
            this.runtimeId = 0;
            this.count = 0;
            this.metadata = 0;
            Object.assign(this, obj);
            this.version = version;
        }
        static fromBedrock(obj) {
            var _a, _b, _c, _d, _e;
            if (ItemOption_1.Versions[version] >= ItemOption_1.Versions['1.16.220']) {
                return new Item({
                    networkId: obj.network_id,
                    stackId: obj.stack_id,
                    blockRuntimeId: obj.block_runtime_id,
                    count: obj.count,
                    metadata: obj.metadata,
                    nbt: obj.extra.nbt,
                });
            }
            else {
                return new Item({
                    networkId: obj.runtime_id,
                    sackId: (_a = obj.item) === null || _a === void 0 ? void 0 : _a.network_id,
                    count: ((_b = obj.item) === null || _b === void 0 ? void 0 : _b.auxiliary_value) & 0xff,
                    metadata: ((_c = obj.item) === null || _c === void 0 ? void 0 : _c.auxiliary_value) >> 8,
                    nbt: (_e = (_d = obj.item) === null || _d === void 0 ? void 0 : _d.nbt) === null || _e === void 0 ? void 0 : _e.nbt,
                });
            }
        }
        toBedrock() {
            if (ItemOption_1.Versions[version] >= ItemOption_1.Versions['1.16.220']) {
                return {
                    network_id: this.networkId,
                    count: this.count,
                    metadata: this.metadata,
                    has_stack_id: this.stackId,
                    stack_id: this.stackId,
                    extra: {
                        has_nbt: !!this.nbt,
                        nbt: { version: 1, nbt: this.nbt },
                        can_place_on: [],
                        can_destroy: [],
                        blocking_tick: 0,
                    },
                };
            }
            else {
                return {
                    runtime_id: this.runtimeId,
                    item: {
                        network_id: this.networkId,
                        auxiliary_value: (this.metadata << 8) | (this.count & 0xff),
                        has_nbt: !!this.nbt,
                        nbt: { version: 1, nbt: this.nbt },
                        can_place_on: [],
                        can_destroy: [],
                        blocking_tick: 0,
                    },
                };
            }
        }
    }
}
exports.getInfo = getInfo;
