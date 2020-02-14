const mdLinksFn = require('../src/mdLinks.js');
const validateFunction = require('../src/validate.js');

const mdLinksFunction = (path, options) => {
    let finalResul = '';
    if(path === undefined){
        finalResul = new Promise((resolve) => resolve('ingrese una ruta <path-to-file>'));
    }else if(options.validate === undefined){
        finalResul = mdLinksFn.mdLinks(path, {validate: false})
        .then((res) => {
            let string = '';
            res.forEach((element) => {
                string += `${element.file} ${element.href} ${element.text}\n`;
            });
            return string;
        })
    }else if(options.validate === '--validate' && options.stats === '--stats'){
        
    }
}

mdLinksFunction('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md', {validate: false}).then((res) => {
    console.log(res);
    
})

module.exports = {
    mdLinksFunction,
}