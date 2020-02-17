const fetch = require('node-fetch');
const Functions = require('../src/links.js');

const linksValidate = (route) => {
    const typeHref = Functions.extractLinks(route);
    const arrPromise = typeHref.map((element) => new Promise((resolve) => {
    const obbj = {...element};
      fetch(element.href).then((res) => {
        if(res.status >= 200 && res.status < 400){
         obbj.status = res.status;
         obbj.statusText = res.statusText;
         resolve(obbj);
        } 
        else {
          obbj.status = res.status;
          obbj.statusText = 'fail';
          resolve(obbj);
        }
      }).catch(() => {
         obbj.status = '';
         obbj.statusText = 'El link no existe';
         resolve(obbj);
      })
    }))
    return Promise.all(arrPromise);
    };
    //console.log(linksValidate('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md'));
    /* Promise.all(linksValidate('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md'))
    .then((res) => console.log(res));
 */

 const stats = (arrObj) => {
   const allLinks = arrObj.map((element) => element.href);
   const whole =  allLinks.length;
   const singleLink = [...new Set(allLinks)].length;
   return `Total:${whole} Unique:${singleLink}`;
 };

  linksValidate('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest2.md').then((res) => {
      console.log(stats(res));
    });
  

  const statsBroken = (arrObj) => {
    const allLinks = arrObj.map((element) => element.href);
    const whole = allLinks.length;
    const linksBroken = arrObj.filter((element) => element.statusText === 'fail').length;    
    const singleLink = [...new Set(allLinks)].length;
    
    return `Total:${whole} Unique:${singleLink} Broken:${linksBroken}`;
  };
 
    

    module.exports = {
        linksValidate,
        stats,
        statsBroken,
    }