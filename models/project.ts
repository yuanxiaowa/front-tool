import * as glob from 'glob'
import * as Path from 'path'
import { writeFile, createReadStream, createWriteStream } from 'fs';
import { IncomingMessage } from 'http';

function getMatches(pattern: string) {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, matches) => {
      if (err) {
        return reject(err)
      }
      resolve(matches)
    })
  })
}

var filename = Path.resolve('data/project.json')
var list: any[]

export function getList() {
  if (list) {
    return list
  }
  try {
    list = require(filename) || []
  } catch (e) {
    list = []
  }
  return list
}
export function addListItem(obj: any) {
  return new Promise((resolve, reject) => {
    list.push(obj)
    writeFile(filename, JSON.stringify(list), (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}