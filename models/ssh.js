"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const db = new db_1.default('data/ssh-server.json');
var infos;
db.load().then(items => {
    infos = items;
});
function getId() {
    return infos.reduce((state, item) => Math.max(item.id, state), 0);
}
function list() {
    return infos;
}
exports.list = list;
function findById(id) {
    return infos.find(item => item.id === id);
}
exports.findById = findById;
async function add(item) {
    var id = getId() + 1;
    Object.assign(item, {
        id
    });
    infos.push(item);
    db.save(infos);
    return infos;
}
exports.add = add;
