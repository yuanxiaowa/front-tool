"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ssh2_1 = require("ssh2");
function getSSH(opts) {
    var client = new ssh2_1.Client();
    client.connect(opts);
    return new Promise((resolve, reject) => {
        client.on('ready', () => {
            resolve(client);
        });
        client.on('error', reject);
    });
}
exports.getSSH = getSSH;
function exec() {
}
exports.exec = exec;
