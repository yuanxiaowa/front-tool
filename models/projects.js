"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const Path = require("path");
function getMatches(pattern, matchBase = false) {
    return new Promise((resolve, reject) => {
        glob(pattern, { matchBase }, (err, matches) => {
            if (err) {
                return reject(err);
            }
            resolve(matches);
        });
    });
}
function getImages(dir) {
    return getMatches(Path.join(dir, '**/*.{png|jpg|svg|gif|webp|ico}'));
}
exports.getImages = getImages;
function getProjects(dir) {
    return getMatches(Path.join(dir, 'src/projects/*'), true);
}
exports.getProjects = getProjects;
function getModules(dir) {
    return getMatches(Path.join(dir, 'modules/*'));
}
exports.getModules = getModules;
