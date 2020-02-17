const fn1 = require('../src/links.js');
const fn2 = require('../src/validate.js');
const fn3 = require('../src/mdLinks.js');
const fn4 = require('../src/Md-cli.js');
const path = require('path');
const fetchMock = require('fetch-mock');

fetchMock.mock('*', 200);
const route = '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md';
const arr1 = [
  {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
    text: 'expresiones regulares (<code>RegExp</code>)',
    file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md',
    status: 200,
    statusText: 'OK'
  },
 ];
 const arr2 = [
   {
  href: 'https://www.youtube.com/',
  text: 'YouTube',
  file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest2.md',
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.facebook.com',
  text: 'Facebook',
  file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest2.md',
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.deadlinkchecker.com/login',
  text: 'Fail',
  file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest2.md',
  status: 404,
  statusText: 'fail',
}
];

const noExiste = [{
  href: 'https://gabbbbby.com/',
  text: 'Link no existe',
  file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest3.md',
  status: '',
  statusText: 'El link no existe',
}]


describe('typePath', () => {
    it('Deberia devolver una ruta absoluta ', () => {
      expect(path.isAbsolute(fn1.typePath('/'))).toBe(true);
    });
    it('pasandole una ruta relativa debe retornar absoluta', () => {
      expect(path.isAbsolute(fn1.typePath('../src/links.js'))).toBe(true);
    });
  });

describe('checkTheRoute', () => {
    it('deberia retornar true si la ruta es un archivo', () => {
        expect(fn1.checkTheRoute('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/README.md')).toBe(true);
    });
    it('deberia retornar false si la ruta no es un archivo', () => {
        expect(fn1.checkTheRoute('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/pruebas')).toBe(false);
    });
});

describe('checkFilesMd', () => {
    it('deberia retornar un array de archivos md', () => {
        const input = '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/pruebas';
        const output = ['/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/pruebas/README.md' ,
                        '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/pruebas/markdown.md',
                       '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/pruebas/pruebaMd.md'];
        expect(fn1.checkFilesMd(input)).toEqual(output);
    });
});

describe('extractLinks', () => {
    const getlLinks = '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md';
const arr = [
    {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
    text: 'expresiones regulares (<code>RegExp</code>)',
    file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md'
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md'
  },
];
    it('deberia retornar un array de objetos (href, text, file)', () => {
        expect(fn1.extractLinks(getlLinks)).toEqual(arr);
    });
});

describe('linksValidate', () => {
  it('deberia validar los links que existen', (done) => fn2.linksValidate('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md')
  .then((res) => {
    expect(res).toEqual(arr1);
    done();
  }));
  it('deberia validar los links que fallan', (done) => fn2.linksValidate('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest2.md')
    .then((res) => {
      expect(res).toEqual(arr2);
      done();
    }));
  it('deberia validar los links que no existen', (done) => fn2.linksValidate('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest3.md')
    .then((res) => {
      expect(res).toEqual(noExiste);
      done();
    }));
});

describe('stats', () => {
  it('deberia mostrar los links validados y los no validados', () => {
    expect(fn2.stats(arr2)).toBe('Total:3 Unique:3');
  });
});

describe('stats', () => {
  it('deberia mostrar los links validados y los no validados', () => {
    expect(fn2.statsBroken(arr2)).toBe('Total:3 Unique:3 Broken:1');
  });
});

describe('mdLinks', () => {
  it('deberia validar los links que existen', (done) => fn3.mdLinks('/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest2.md', {validate: true})
  .then((res) => {
    expect(res).toEqual(arr2);
    done();
  }));
});

describe('mdLinksFunction', () => {
  it('')
})