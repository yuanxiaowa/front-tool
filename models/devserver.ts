import { readFile, writeFile } from 'fs'

export class Sv {
  name: string
  dir: string
  port: number
  open: boolean
  proxy?: string[][]
}

var filename = 'data/local-server.json';
export function getItems(): Promise<Sv[]> {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(data))
    })
  })
}

export function saveItems(items: Sv[]): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(filename, JSON.stringify(items), err => {
      if (err) {
        return reject(err)
      }
      resolve();
    })
  })
}