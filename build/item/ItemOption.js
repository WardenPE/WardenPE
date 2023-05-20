"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testedVersions = exports.validateOptions = exports.Versions = exports.CURRENT_VERSION = exports.MIN_VERSION = exports.defaultOptions = void 0;
const mcData = __importStar(require("minecraft-data"));
const MIN_VERSION = '1.16.201';
exports.MIN_VERSION = MIN_VERSION;
const CURRENT_VERSION = '1.19.80';
exports.CURRENT_VERSION = CURRENT_VERSION;
const Versions = Object.fromEntries(mcData.versions.bedrock
    .filter(e => e.releaseType === 'release')
    .map(e => [e.minecraftVersion, e.version]));
exports.Versions = Versions;
const skippedVersionsOnGithubCI = [
    '1.16.210',
    '1.17.10',
    '1.17.30',
    '1.18.11',
    '1.19.10',
    '1.19.20',
    '1.19.30',
    '1.19.40',
    '1.19.50',
    '1.19.60',
    '1.19.63',
];
const testedVersions = process.env.CI
    ? Object.keys(Versions).filter((v) => !skippedVersionsOnGithubCI.includes(v))
    : Object.keys(Versions);
exports.testedVersions = testedVersions;
const defaultOptions = {
    version: CURRENT_VERSION,
    autoInitPlayer: true,
    offline: false,
    connectTimeout: 9000,
    raknetBackend: 'raknet-native',
    useRaknetWorkers: true,
    compressionAlgorithm: 'deflate',
    compressionLevel: 7,
    compressionThreshold: 512,
};
exports.defaultOptions = defaultOptions;
function validateOptions(options) {
    if (!Versions[options.version]) {
        console.warn('Supported versions', Versions);
        throw new Error(`Unsupported version ${options.version}`);
    }
    options.protocolVersion = Versions[options.version];
    if (options.protocolVersion < MIN_VERSION) {
        throw new Error(`Protocol version < ${MIN_VERSION} : ${options.protocolVersion}, too old`);
    }
    if (options.useNativeRaknet === true)
        options.raknetBackend = 'raknet-native';
    if (options.useNativeRaknet === false)
        options.raknetBackend = 'jsp-raknet';
}
exports.validateOptions = validateOptions;
