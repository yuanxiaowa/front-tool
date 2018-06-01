import * as Path from 'path'
import { readFileSync, writeFile } from 'fs'
import {
  getBranches,
  getTags,
  getTrunks
} from 'svn-tool2'
import {
  LsFile
} from 'svn-tool2/structures'
import DB from './db';
export {
  status as getStatus,
  add as addFiles,
  del as delFiles,
  update,
  commit,
  log,
  info,
  resolve as resolveFiles,
  merge,
  mergeinfo
} from 'svn-tool2'

interface Conf {
  paths: { name: string, path: string }[]
}

var conf: Conf = {
  paths: []
}

var db = new DB<Conf>('.conf')

function writeConf() {
  // @ts-ignore
  return db.save(conf)
}
db.load().then(items => {
  // @ts-ignore
  conf = items
})

export function getPaths() {
  return conf.paths;
}
export function addPath(path: string, name: string) {
  var item = conf.paths.find(item => item.path === path);
  if (!item) {
    conf.paths.push({ path, name });
  } else {
    item.name = name;
  }
  writeConf();
}
export async function getStructures(url: string, baseName?: string) {
  var branches: LsFile[] = [];
  var tags: LsFile[] = [];
  var trunks: LsFile[] = [];
  try {
    branches = await getBranches(url, baseName);
  } catch (e) { }
  try {
    tags = await getTags(url, baseName);
  } catch (e) { }
  try {
    trunks = await getTrunks(url, baseName);
  } catch (e) { }
  return {
    branches,
    tags,
    trunks
  }
}