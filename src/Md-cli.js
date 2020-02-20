const mdLinksFn = require('./mdLinks.js');
const validateFunction = require('./validate.js');

const mdLinksFunction = (path, options, options2) => {
    let finalResul = '';
    if(path === undefined){
        finalResul = new Promise((resolve) => resolve('ingrese una ruta <path-to-file>'));
    }else if(options === '--stats' && options2 === '--validate'){
        finalResul = mdLinksFn.mdLinks(path, {validate: true})
        .then((res) => {
            const result = validateFunction.statsBroken(res);
            return result;
        });
    }else if(options === '--validate'){
        finalResul = mdLinksFn.mdLinks(path, {validate: true})
        .then((res) => {
            let string = '';
            res.forEach((element) => {
               string += `${element.file} ${element.href} ${element.text} ${element.status} ${element.statusText}\n`;
            });
            return string;
        });
    } else if(options === '--stats'){
        finalResul = mdLinksFn.mdLinks(path, {validate: true})
        .then((res) => { 
            const result = validateFunction.stats(res);
            return result;
        });
    } else{
        finalResul = mdLinksFn.mdLinks(path, {validate: false})
        .then((res) => {
            return res;
        });
    }
    return finalResul;
};


module.exports = {
    mdLinksFunction,
}