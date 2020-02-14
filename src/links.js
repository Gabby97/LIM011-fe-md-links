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




// ceridica si la ruta es válida
// const isValidRout = route => fs.existsSync(route); // (existsSync) es síncrono, verifica si un archivo existe en el sistema
// verifica si la ruta es absoluta
// const isAbsolute = route => path.isAbsolute(route); // Devuelve verdadero si la ruta especificada es absoluta
// convierte una ruta relativa en absoluta
// const changeToAbsolute = relativeRoute => path.resolve(relativeRoute); // resuelve segmentos de ruta en una ruta absoluta
// ve si es la ruta de un archivo
/* const filePath = (route) => {
    const stats = fs.lstatSync(route); // permite obtener informacion de un archivo, fichero
    const statsAnswer = stats.isFile(); // devuelve booleano/ verifica si existen archivos / ver si es un archivo
     // console.log(statsAnswer); 
    return statsAnswer;
}*/

// retorna un array de archivos de una carpeta o directorio
/*   const getFiles = (route) => {
     let arrFiles = [];
     if(filePath(route)){
         arrFiles.push(route)
     }
     else {
         const readDirectory = fs.readdirSync(route);
         readDirectory.forEach((file) => {
             const pathFile = path.join(route, file);             
             arrFiles = arrFiles.concat(getFiles(pathFile));
         }) 
     }
     return arrFiles;
 };  */

// traemos archivos markdown 
 // const findFilesMd = (route) => getFiles(route).filter(element => path.extname(element) === '.md');

  // devuelve el contenido del archivo en un string 
 // const readContent = (route) =>  (fs.readFileSync(route).toString());

 // devuelve array de links (del contenido)
 // const getAllLinks = (contentString) =>  contentString.match(/\[(.+)\]\((.+)\)/g);
    
/*const getLinks = (contentString, route) => { 
    const links = [];
    // const fileRoute = getFiles(route)
    contentString.forEach((element) => {
        links.push({
            href: element.match(/(\([^\)]+\))/gm)[0],
            text: element.match(/\[([^\]]+)\]/gm)[0],
            file: route,
        })
    })
    return links;
}*/
// console.log(getLinks(getAllLinks(readContent('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md'))));

/* const getArrLinks = (route) => new Promise((resolve) => {
    const arrFiles = getFiles(route);
    const arrayMd = findFilesMd(arrFiles);
    const arrLinks = arrayMd.map(elem => getLinks(elem, readContent(elem)));
    const newArr = [];
    arrLinks.forEach((element) => {
      element.forEach((elem) => {
        newArr.push(elem);
      });
    });
    resolve(newArr);
  }); */

  //console.log(getArrLinks('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md'));
  
/*const linkValidate = (arr) => {
    const arrLinks = [];
    then((resolve) => {
        
    })
    arr.map((element) => {
        const getHref = element.href;
        const listo = getHref.substring(1, element.href.length -1)
        const arrLinks1 = arrLinks.push(listo);
    }); 
    return arrLinks1;
}/*
// substring
const uno = readContent('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md');
const dos = getAllLinks(uno);
// console.log(getLinks(dos, '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md'));
/* const fetchPromise = fetch ('https://ghibliapi.herokuapp.com/people'); 
fetchPromise.then (respuesta => { 
  console.log (respuesta); 
}); */

 // fileRoute 
module.exports = {
    typePath,
    checkTheRoute,
    checkFilesMd,
    extractLinks,
}