const sharp = require('sharp')
const fs = require('fs')
const { promisify } = require('util')

const writeFileAsync = promisify(fs.writeFile)

const writeIt = async () => {

  const { xmp: beforeXMP } = await sharp('./25_20200203165057_197360_7F295EF9_source.png')
    .metadata()

  const myBuff = await sharp('./25_20200203165057_197360_7F295EF9_source.png')
    .withMetadata()
    .toBuffer()

  await writeFileAsync(`./results.png`, myBuff)

  const { xmp: afterXMP } = await sharp('./results.png').metadata()

  console.log(`The xmp data is ${JSON.stringify(afterXMP)}`)

  console.log(`Are they equal? ${beforeXMP.equals(afterXMP)}`)
}

writeIt()
