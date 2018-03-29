"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Sv {
}
exports.Sv = Sv;
var filename = 'data/local-server.json';
function getItems() {
    return new Promise((resolve, reject) => {
        fs_1.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}
exports.getItems = getItems;
function saveItems(items) {
    return new Promise((resolve, reject) => {
        fs_1.writeFile(filename, JSON.stringify(items), err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
exports.saveItems = saveItems;
