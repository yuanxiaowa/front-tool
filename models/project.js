"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const db_1 = require("./db");
function getMatches(pattern) {
    return new Promise((resolve, reject) => {
        glob(pattern, (err, matches) => {
            if (err) {
                return reject(err);
            }
            resolve(matches);
        });
    });
}
var db = new db_1.default('data/project.json');
var list;
function getList() {
    if (list) {
        return list;
    }
    return db.load();
}
exports.getList = getList;
function addListItem(obj) {
    list.push(obj);
    db.save(list);
}
exports.addListItem = addListItem;
