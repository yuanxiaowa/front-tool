import { writeJSON, readJSON } from 'fs-extra'

export default class DB<T> {
  constructor(public filename: string) { }
  save(data: T[]) {
    return writeJSON(this.filename, data)
  }
  async load(): Promise<T[]> {
    try {
      return await readJSON(this.filename)
    } catch (e) {
      return []
    }
  }
}