"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWorld = void 0;
const leveldb_zlib_1 = require("leveldb-zlib");
const bedrock_provider_1 = require("bedrock-provider");
const path_1 = require("path");
function loadWorld() {
    return __awaiter(this, void 0, void 0, function* () {
        const path = (0, path_1.join)(__dirname, `./Bedrock level/db`);
        console.log(`Loading world from ${path}`);
        const db = new leveldb_zlib_1.LevelDB(path, { createIfMissing: false });
        yield db.open();
        const wp = new bedrock_provider_1.WorldProvider(db, { dimension: 0 });
        function requestChunks(x, z, radius) {
            return __awaiter(this, void 0, void 0, function* () {
                const chunks = [];
                const cxStart = (x >> 4) - radius;
                const cxEnd = (x >> 4) + radius;
                const czStart = (z >> 4) - radius;
                const czEnd = (z >> 4) + radius;
                for (let cx = cxStart; cx < cxEnd; cx++) {
                    for (let cz = czStart; cz < czEnd; cz++) {
                        const cc = yield wp.load(cx, cz, true);
                        if (!cc) {
                            continue;
                        }
                        const cbuf = yield cc.networkEncodeNoCache();
                        chunks.push({
                            x: cx,
                            z: cz,
                            sub_chunk_count: cc.sectionsLen,
                            cache_enabled: false,
                            blobs: [],
                            payload: cbuf
                        });
                    }
                }
                return chunks;
            });
        }
        return { requestChunks };
    });
}
exports.loadWorld = loadWorld;
