const path = require('path'); // proporciona utilidades para trabajar con rutas de archivos y directorio
const fs = require('fs');  //proporciona una API para interactuar con el sistema de archivos //
const marked = require('marked');

// verifica el tipo de ruta que ingresa y retorna la ruta absoluta
const typePath = (stringRoute) => {
  if(path.isAbsolute(stringRoute) === false){
    return path.resolve(stringRoute);
  }
  return stringRoute;
};
// console.log(typePath('../src/links.js'));

// Verifica si la ruta que ingresa es un archivo 
  const checkTheRoute = (route) => {
    if (fs.lstatSync(route).isFile()) {
      return true;
    }
    return false;
  };
// console.log(checkTheRoute('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/pruebas'));

  // verifica archivos md
 const checkFilesMd = (route) => {
   let resulMdLinks = [];
   if(checkTheRoute(typePath(route)) === true){
     if(path.extname(typePath(route)) === '.md'){
       resulMdLinks.push(typePath(route));
     }
     return resulMdLinks;
   }
   // Recorre directorio
   const reaDirectory = fs.readdirSync(typePath(route));
   reaDirectory.forEach((element) => {
     const dir = path.join(typePath(route), element);
     resulMdLinks = resulMdLinks.concat(checkFilesMd(dir));
   }) 
   return resulMdLinks;
 };

// console.log(checkFilesMd(typePath('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/pruebas')));

// Devuelve un array de objetos (href, text y file)
  const extractLinks = (route) => {
    const arrayArch = [];
    const render = new marked.Renderer();
    const arrayAllFiles = checkFilesMd(route);
    arrayAllFiles.forEach((element) => {
      const readContent = fs.readFileSync(element).toString();
      render.link = (href, file, text) => {
        arrayArch.push({
          href,
          text,
          file: element,
        });
      };
      marked(readContent, { renderer: render });
    });
    return arrayArch;
  };

   
//  console.log(extractLinks('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md'));

module.exports = {
    typePath,
    checkTheRoute,
    checkFilesMd,
    extractLinks,
}