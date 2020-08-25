const bent = require('bent')

const getJSON = bent('json')
async function bentWork() {
  let obj = await getJSON('https://db.ygoprodeck.com/api/v5/cardinfo.php')
  console.log(obj.length)
  return obj
}

const obj = bentWork()
