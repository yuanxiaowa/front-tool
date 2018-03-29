"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const svn_tool2_1 = require("svn-tool2");
var svn_tool2_2 = require("svn-tool2");
exports.getStatus = svn_tool2_2.status;
exports.addFiles = svn_tool2_2.add;
exports.delFiles = svn_tool2_2.del;
exports.update = svn_tool2_2.update;
exports.commit = svn_tool2_2.commit;
exports.log = svn_tool2_2.log;
exports.info = svn_tool2_2.info;
exports.resolveFiles = svn_tool2_2.resolve;
exports.merge = svn_tool2_2.merge;
exports.mergeinfo = svn_tool2_2.mergeinfo;
var conf = {
    paths: []
};
var confFileName = process.cwd() + '/.conf';
function init() {
    try {
        conf = JSON.parse(fs_1.readFileSync(confFileName, 'utf8'));
    }
    catch (e) {
    }
}
function writeConf() {
    fs_1.writeFile(confFileName, JSON.stringify(conf), () => { });
}
init();
function getPaths() {
    return conf.paths;
}
exports.getPaths = getPaths;
function addPath(path, name) {
    var item = conf.paths.find(item => item.path === path);
    if (!item) {
        conf.paths.push({ path, name });
    }
    else {
        item.name = name;
    }
    writeConf();
}
exports.addPath = addPath;
async function getStructures(url, baseName) {
    var branches = [];
    var tags = [];
    var trunks = [];
    try {
        branches = await svn_tool2_1.getBranches(url, baseName);
    }
    catch (e) { }
    try {
        tags = await svn_tool2_1.getTags(url, baseName);
    }
    catch (e) { }
    try {
        trunks = await svn_tool2_1.getTrunks(url, baseName);
    }
    catch (e) { }
    return {
        branches,
        tags,
        trunks
    };
}
exports.getStructures = getStructures;
