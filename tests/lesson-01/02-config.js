"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentFileName = getEnvironmentFileName;
function getEnvironmentFileName(envName) {
    if (envName === 'dev')
        return 'dev.json';
    if (envName === 'staging')
        return 'staging.json';
    if (envName === 'production')
        return 'production.json';
    throw new Error('Environment name invalid!');
}
