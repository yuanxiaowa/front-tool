import { Client } from 'ssh2'

interface Opt {
  host: string
  username: string
  password: string
  port: number
}

export function getSSH(opts: Opt): Promise<Client> {
  var client = new Client();
  client.connect(opts);
  return new Promise((resolve, reject) => {
    client.on('ready', () => {
      resolve(client)
    });
    client.on('error', reject);
  })
}

export function exec() {

}