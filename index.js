const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not find the file?!!');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Colud not find file');
      resolve('successss');
    });
  });
};

// case only 1 dog pic promise
// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`${data}`);

//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//     console.log(res.body);

//     await writeFilePro('dog-img.txt', res.body.message);
//     console.log('dog img save to file');
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
//   return '2: ready!!!!!';
// };

// case 3 await dog pics
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`${data}`);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('dog img save to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: ready!!!!!';
};

// ayncs await vers of below code
(async () => {
  try {
    console.log('1: will get dog pic');
    const x = await getDogPic();
    console.log(x);
    console.log('3: done get dog pic');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
})();

/*
getDogPic()
  .then(x => {
    console.log(x);
    console.log('3: done get dog pic');
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
*/

/* without async await
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('dog img save to file');
  })
  .catch(err => {
    console.log(err);
  });
*/
