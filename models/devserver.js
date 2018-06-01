"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
var db = new db_1.default('data/local-server.json');
var items;
db.load().then(arr => {
    items = arr;
});
function list() {
    return db.load();
}
exports.list = list;
function save() {
    return db.save(items.map(item => ({
        name: item.name,
        dir: item.dir,
        port: item.port,
        open: item.open,
        proxy: item.proxy
    })));
}
exports.save = save;
function add(item) {
    items.push(item);
    return save();
}
exports.add = add;
function findByDir(dir) {
    return items.find(item => item.dir === dir);
}
exports.findByDir = findByDir;
