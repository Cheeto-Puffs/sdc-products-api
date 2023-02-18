const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
// .env file exists 1 directory outside of this once.
require('dotenv').config({
  path: `../.env`
});

const readStream = fs.createReadStream(process.env.INPATH)
const writeStream = fs.createWriteStream(process.env.OUTPATH)

// initialize a header row for the new csv
writeStream.write('id,styleId,url,thumbnail_url\n');

readStream
  // delimit on single quotes instead of the default double quotes
  .pipe(csv({ quote: '\'' }))
  .on('data', (chunk) => {
    const cleanChunk = { ...chunk };

    // removes all double quotes + backslash chars from URL
    cleanChunk.url = cleanChunk.url.replaceAll(/"|/g, '');
    cleanChunk.thumbnail_url = cleanChunk.thumbnail_url.replaceAll(/"|/g, '');

    // re-wrap url and thumbnail url in double quotes
    cleanChunk.url = `"${cleanChunk.url}"`;
    cleanChunk.thumbnail_url = `"${cleanChunk.thumbnail_url}"`;

    // construct a clean row
    const cleanRow = `${cleanChunk.id},${cleanChunk.styleId},${cleanChunk.url},${cleanChunk.thumbnail_url}\n`

    // writes to new csv file
    writeStream.write(cleanRow)
  })
  .on('end', () => {
    console.log(`Clean data written to path: ${process.env.OUTPATH}`)
  })