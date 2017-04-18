# generator-wass [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generator for Angular with States, Webapck and Sass

## Description

This generator will scaffold for you an application using angularjs, webpack, angular-ui-boostrap, angular-ui-notification.

* Generate module with structure:

```
example/
├── controllers/
|   ├── exampleController.js         // main controller in module
|   └── otherController.js           // other controllers, not generated
├── services/
|   ├── exampleFactory.js            // main factory in module
|   └── otherService.js              // other services, not generated
├── views/
|   ├── example.html                 // main view in module
|   └── other.html                   // other views, not generated
├── modules/
|   └── child                        // childs modules 
|       └── ...  
├── exampleModule.js                 // module, need imort in parent
└── example.scss                     // sass for module's styles
```

Support Es6 using babel.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wass using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-wass
```

## Usage

Make a new directory, and cd into it:

```bash
mkdir new-app
cd new-app
```

Run `yo wacs`, optionally pass app name:

```bash
yo wass [appName]
```

Generate module, find parent module:

```bash
yo wass:module appModule
```

## License

MIT © [Carlos Ormeño]()


[npm-image]: https://badge.fury.io/js/generator-wass.svg
[npm-url]: https://npmjs.org/package/generator-wass
[travis-image]: https://travis-ci.org/CarlosOV/generator-wass.svg?branch=master
[travis-url]: https://travis-ci.org/CarlosOV/generator-wass
[daviddm-image]: https://david-dm.org/CarlosOV/generator-wass.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/CarlosOV/generator-wass
[coveralls-image]: https://coveralls.io/repos/CarlosOV/generator-wass/badge.svg
[coveralls-url]: https://coveralls.io/r/CarlosOV/generator-wass
