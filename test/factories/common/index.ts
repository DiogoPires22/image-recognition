import { promises } from 'fs'
import path from 'path'

export const factoryBase64Image = async (): Promise<string> => {
  const contents = await promises.readFile(path.resolve(__dirname, 'dog01.jpg'), { encoding: 'base64' })
  return contents
}
