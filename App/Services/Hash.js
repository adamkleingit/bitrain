const md5 = require('md5');

const hash = (obj) => {
  console.log(obj);
  let hashed = md5(JSON.stringify(obj));
  for(let i =0; i < 99999; i++) {
    hashed = md5(hashed);
  }
  console.log(hashed);
  return hashed;
}

export default hash;
