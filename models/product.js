"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
// @ts-ignore
const decompress = require("decompress");
// @ts-ignore
const decompressUnzip = require("decompress-unzip");
const glob_1 = require("glob");
var pName = 'product';
var ctx = Path.resolve('public', pName);
function list() {
    return new Promise((resolve, reject) => {
        var g = new glob_1.Glob(Path.join(ctx, '*'), {
            stat: true
        }, (err, files) => {
            if (err) {
                return reject(err);
            }
            var data = {
                ctx,
                items: files.filter(name => g.statCache[name].isDirectory()).map(path => {
                    var name = Path.basename(path);
                    var stat = g.statCache[path];
                    return {
                        name,
                        path,
                        url: `/${pName}/${name}`,
                        zipUrl: `/${pName}/${name}.zip`,
                        zipPath: path + '.zip',
                        ctime: stat.ctimeMs,
                        mtime: stat.mtimeMs
                    };
                })
            };
            resolve(data);
        });
    });
}
exports.list = list;
async function zip(path) {
    var dir = Path.dirname(path);
    var name = Path.basename(path, Path.extname(path));
    var output = Path.join(dir, name);
    await decompress(path, output, {
        plugins: [
            decompressUnzip()
        ]
    });
    return {
        name,
        path,
        url: `/${pName}/${name}`,
        zipUrl: `/${pName}/${name}.zip`,
        zipPath: path + '.zip'
    };
}
exports.zip = zip;
