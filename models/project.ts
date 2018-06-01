import * as glob from 'glob'
import * as Path from 'path'
import { writeFile } from 'fs';
import DB from './db';

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

var db = new DB('data/project.json')
var list: any[]

export function getList() {
  if (list) {
    return list
  }
  return db.load()
}
export function addListItem(obj: any) {
  list.push(obj)
  db.save(list)
}