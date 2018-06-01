import { readFile, writeFile } from 'fs'
import DB from './db';
import { BrowserSyncInstance } from 'browser-sync';

export interface Sv {
  name: string
  dir: string
  port: number
  open: boolean
  proxy?: string[][]
}

export interface Opt extends Sv {
  instance?: BrowserSyncInstance
  urls?: string[]
}

var db = new DB<Sv>('data/local-server.json')
var items: Opt[]

db.load().then(arr => {
  items = arr
})

export function list(): Promise<Sv[]> {
  return db.load()
}

export function save() {
  return db.save(items.map(item => ({
    name: item.name,
    dir: item.dir,
    port: item.port,
    open: item.open,
    proxy: item.proxy
  })))
}

export function add(item: Sv) {
  items.push(item)
  return save()
}

export function findByDir(dir:string) {
  return <Opt>items.find(item => item.dir === dir)
}