import DB from "./db";

interface Info {
  id: number,
  username: string
  password: string
  port: number
  host: string
}
const db = new DB<Info>('data/ssh-server.json')

var infos: Info[]

db.load().then(items => {
  infos = items
})

function getId() {
  return infos.reduce((state, item) => Math.max(item.id, state), 0);
}

export function list() {
  return infos
}

export function findById(id: number) {
  return infos.find(item => item.id === id)
}

export async function add(item:Info) {
  var id = getId() + 1
  Object.assign(item, {
    id
  })
  infos.push(item)
  db.save(infos)
  return infos
}