import { readFileSync, writeFile } from 'fs'
import {
  getBranches,
  getTags,
  getTrunks
} from 'svn-tool2'
import {
  Ls
} from 'svn-tool2/structures'
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

var confFileName = process.cwd() + '/.conf';
function init() {
  try {
    conf = JSON.parse(readFileSync(confFileName, 'utf8'));
  } catch (e) {
  }
}
function writeConf() {
  writeFile(confFileName, JSON.stringify(conf), () => { })
}
init();

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
  var branches: Ls[] = [];
  var tags: Ls[] = [];
  var trunks: Ls[] = [];
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