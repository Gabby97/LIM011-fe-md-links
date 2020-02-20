const fn1 = require('../src/links.js');
const fn2 = require('../src/validate.js');
const fn3 = require('../src/mdLinks.js');
const fn4 = require('../src/Md-cli.js');
const path = require('path');
const arrMd = require('../test/environment');
const fetchMock = require('fetch-mock');

fetchMock.mock('*', 200);

// const route = '/home/gabby/Escritorio/MD-liks/LIM011-fe-md-links/readmeTest.md';

 const arr2 = [
   {
  href: 'https://www.youtube.com/',
  text: 'YouTube',
  file: path.join(process.cwd(), 'pruebas', 'readmeTest2.md'),
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.facebook.com',
  text: 'Facebook',
  file: path.join(process.cwd(), 'pruebas', 'readmeTest2.md'),
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.deadlinkchecker.com/login',
  text: 'Fail',
  file: path.join(process.cwd(), 'pruebas', 'readmeTest2.md'),
  status: 404,
  statusText: 'fail',
}
];

const noExiste = [{
  href: 'https://gabbbbby.com/',
  text: 'Link no existe',
  file: path.join(process.cwd(), 'pruebas', 'readmeTest3.md'),
  status: '',
  statusText: 'El link no existe',
}]


describe('typePath', () => {
    it('Deberia devolver una ruta absoluta ', () => {
      expect(fn1.typePath(path.join(process.cwd(), 'src'))).toBe(path.join(process.cwd(), 'src'));
    });
    it('Deberia retornar una ruta absoluta al pasarle una ruta relativa', () => {
      expect(path.isAbsolute(fn1.typePath('.'))).toBe(true);
    });
  });
describe('checkTheRoute', () => {
    it('deberia retornar true si la ruta es un archivo', () => {
        expect(fn1.checkTheRoute(path.join(process.cwd(), 'README.md'))).toBe(true);
    });
    it('deberia retornar false si la ruta no es un archivo', () => {
        expect(fn1.checkTheRoute(path.join(process.cwd(), 'pruebas'))).toBe(false);
    });
  });
describe('checkFilesMd', () => {
    it('deberia retornar un array de archivos md', () => {
        expect(fn1.checkFilesMd(path.join(process.cwd(), 'pruebas'))).toEqual(arrMd);
    });
  });
describe('extractLinks', () => {
const arr = [
    {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: path.join(process.cwd(), 'pruebas', 'readmeTest.md'),
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
    text: 'expresiones regulares (<code>RegExp</code>)',
    file: path.join(process.cwd(), 'pruebas', 'readmeTest.md'),
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: path.join(process.cwd(), 'pruebas', 'readmeTest.md'),
  },
];
    it('deberia retornar un array de objetos (href, text, file)', () => {
        expect(fn1.extractLinks(path.join(process.cwd(), 'pruebas', 'readmeTest.md'))).toEqual(arr);
    });
});
describe('linksValidate', () => {
  it('deberia validar los links que existen', (done) => fn2.linksValidate(path.join(process.cwd(), 'pruebas', 'readmeTest2.md'))
  .then((res) => {
    expect(res).toEqual(arr2);
    done();
  }));
  it('deberia validar los links que fallan', (done) => fn2.linksValidate(path.join(process.cwd(), 'pruebas', 'readmeTest2.md'))
    .then((res) => {
      expect(res).toEqual(arr2);
      done();
    }));
  it('deberia validar los links que no existen', (done) => fn2.linksValidate(path.join(process.cwd(), 'pruebas', 'readmeTest3.md'))
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

describe('statsBroken', () => {
  it('deberia mostrar los links validados y los no validados', () => {
    expect(fn2.statsBroken(arr2)).toBe('Total:3 Unique:3 Broken:1');
  });
});
describe('mdLinks', () => {
  it('deberia validar los links que existen', (done) => fn3.mdLinks(path.join(process.cwd(), 'pruebas', 'readmeTest2.md'), {validate: true})
  .then((res) => {
    expect(res).toEqual(arr2);
    done();
  }));
});
describe('mdLinksFunction', () => {
  it('deberia mostrar un string', (done) => fn4.mdLinksFunction(undefined, undefined)
  .then((res) => {
    expect(res).toEqual('ingrese una ruta <path-to-file>');
    done();
  }));
  it('deberia mostrar el total de links, unique y broken ', (done) => {
    const pathh = path.join(process.cwd(), 'pruebas', 'readmeTest2.md');
    const stats = '--stats'
    const validate = '--validate'
    const result = 'Total:3 Unique:3 Broken:1'
    fn4.mdLinksFunction(pathh, stats, validate)
    .then((res) => {
      expect(res).toEqual(result);
      done();
    })
  })
  it('deberia mostrar el total de links', (done) => { 
    const pathh = path.join(process.cwd(), 'pruebas', 'readmeTest2.md')
    const validate = '--validate'
    const output = `${pathh} https://www.youtube.com/ YouTube 200 OK
${pathh} https://www.facebook.com Facebook 200 OK
${pathh} https://www.deadlinkchecker.com/login Fail 404 fail\n`

  fn4.mdLinksFunction(pathh, validate)
  .then((res) => {
    expect(res).toEqual(output);
    done();
  });
  });
  it('deberia mostrar el total de links y unicos', (done) => {
    const pathh = path.join(process.cwd(), 'pruebas', 'readmeTest2.md')
    const stats = '--stats'
    const result = 'Total:3 Unique:3'
    fn4.mdLinksFunction(pathh, stats)
    .then((res) => {
      expect(res).toEqual(result);
      done();
    });
  });
});
