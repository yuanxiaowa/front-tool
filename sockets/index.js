"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shell_1 = require("../utils/shell");
const IO = require("socket.io");
function default_1(srv) {
    var io = IO(srv);
    io.on('connection', socket => {
        function writeData(data) {
            socket.send(data.toString());
        }
        var stream;
        socket.once('login', async (data) => {
            try {
                var term = await shell_1.getSSH(data);
                socket.once('disconnect', () => {
                    term.end();
                    term.destroy();
                });
                await new Promise((resolve, reject) => {
                    term.shell((err, _stream) => {
                        if (err) {
                            return reject(err);
                        }
                        stream = _stream;
                        stream.on('data', writeData).stderr.on('data', writeData);
                        socket.on('message', data => {
                            stream.write(data);
                        });
                        socket.emit('success');
                    });
                });
            }
            catch (e) {
                socket.emit('failed', e.message);
            }
        });
    });
}
exports.default = default_1;
