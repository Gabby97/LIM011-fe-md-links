const linksFunction = require('../src/links.js'); // extractLinks
const validateFunction = require('../src/validate.js'); // linksValidate

const mdLinks = (path, options) => new Promise((resolve) => {
    if(options.validate === true){
    resolve(validateFunction.linksValidate(path));
    } else {
        resolve(linksFunction.extractLinks(path));
    }
});

mdLinks('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md', {validate: true}).then((ress) => {
  console.log(ress);
  
});


module.exports = {
    mdLinks,
}