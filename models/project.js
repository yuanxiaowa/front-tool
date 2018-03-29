"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const Path = require("path");
const fs_1 = require("fs");
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
var filename = Path.resolve('data/project.json');
var list;
function getList() {
    if (list) {
        return list;
    }
    try {
        list = require(filename) || [];
    }
    catch (e) {
        list = [];
    }
    return list;
}
exports.getList = getList;
function addListItem(obj) {
    return new Promise((resolve, reject) => {
        list.push(obj);
        fs_1.writeFile(filename, JSON.stringify(list), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
exports.addListItem = addListItem;
