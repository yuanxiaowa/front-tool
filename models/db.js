"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
class DB {
    constructor(filename) {
        this.filename = filename;
    }
    save(data) {
        return fs_extra_1.writeJSON(this.filename, data);
    }
    async load() {
        try {
            return await fs_extra_1.readJSON(this.filename);
        }
        catch (e) {
            return [];
        }
    }
}
exports.default = DB;
