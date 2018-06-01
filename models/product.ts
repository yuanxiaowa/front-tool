import * as Path from 'path'
// @ts-ignore
import * as decompress from 'decompress'
// @ts-ignore
import * as decompressUnzip from 'decompress-unzip'
import { Glob } from 'glob';

var pName = 'product'
var ctx = Path.resolve('public', pName)

export function list() {
  return new Promise((resolve, reject) => {
    var g = new Glob(Path.join(ctx, '*'), {
      stat: true
    }, (err, files) => {
      if (err) {
        return reject(err)
      }
      var data = {
        ctx,
        items: files.filter(name => g.statCache[name].isDirectory()).map(path => {
          var name = Path.basename(path)
          var stat = g.statCache[path]
          return {
            name,
            path,
            url: `/${pName}/${name}`,
            zipUrl: `/${pName}/${name}.zip`,
            zipPath: path + '.zip',
            ctime: stat.ctimeMs,
            mtime: stat.mtimeMs
          }
        })
      }
      resolve(data)
    })
  })
}

export async function zip(path: string) {
  var dir = Path.dirname(path)
  var name = Path.basename(path, Path.extname(path))
  var output = Path.join(dir, name)
  await decompress(path, output, {
    plugins: [
      decompressUnzip()
    ]
  })
  return {
    name,
    path,
    url: `/${pName}/${name}`,
    zipUrl: `/${pName}/${name}.zip`,
    zipPath: path + '.zip'
  }
}