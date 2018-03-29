import { Server } from 'http'
import { getSSH } from '../utils/shell'
import { Client, ClientChannel } from 'ssh2'
import * as IO from 'socket.io'

export default function (srv: Server) {
  var io = IO(srv);

  io.on('connection', socket => {
    function writeData(data: string | Buffer) {
      socket.send(data.toString())
    }
    var stream: ClientChannel;
    socket.once('login', async data => {
      try {
        var term = await getSSH(data);
        socket.once('disconnect', () => {
          term.end();
          term.destroy();
        })
        await new Promise((resolve, reject) => {
          term.shell((err, _stream) => {
            if (err) {
              return reject(err);
            }
            stream = _stream;
            stream.on('data', writeData).stderr.on('data', writeData)
            socket.on('message', data => {
              stream.write(data);
            })
            socket.emit('success');
          })
        })
      } catch (e) {
        socket.emit('failed', e.message);
      }
    })
  })
}