const mdLinksFn = require('./mdLinks.js');
const validateFunction = require('./validate.js');

const mdLinksFunction = (path, options, options2) => {
    let finalResul = '';
    if(path === undefined){
        finalResul = new Promise((resolve) => resolve('ingrese una ruta <path-to-file>'));
    }else if(options === undefined){
        finalResul = mdLinksFn.mdLinks(path, {validate: false})
        .then((res) => {
            let string = '';
            res.forEach((element) => {
                string += `${element.file} ${element.href} ${element.text}\n`;
            });
            console.log(string);
        })
    }else if(options === '--stats' && options2 === '--validate'){
        finalResul = mdLinksFn.mdLinks(path, {validate: true})
        .then((res) => validateFunction.statsBroken(res)).then((resp) => {
        console.log(resp);
        });
    }else if(options === '--validate'){
        finalResul = mdLinksFn.mdLinks(path, {validate: true})
        .then((res) => {
            let string = '';
            res.forEach((element) => {
                string += `${element.file} ${element.href} ${element.text} ${element.status} ${element.statusText}\n`;
            });
            console.log(string);
        });
    } else if(options === '--stats'){
        finalResul = mdLinksFn.mdLinks(path, {validate: true})
        .then((res) => validateFunction.stats(res)).then((resp) => {
            console.log(resp);            
        })
    }
    return finalResul;
};


module.exports = {
    mdLinksFunction,
}