# generator-wass [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generator for Angular with States, Webapck and Sass

## Description

This generator will scaffold for you an application using angularjs, webpack, angular-ui-boostrap, angular-ui-notification.

* Structure

```
src/
├── app/
|   ├── generic                     // module generic
|   ├── home                        // module home
|   ├── login                       // module login
|   └── logout                      // module logout
├── img/                            // images
├── libs/                           // custom libs
├── app.js                          // main module
├── app.scss                        // main sass sheet
└── index.html                      // main html
```

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
├── exampleModule.js                 // module, need import in parent
└── example.scss                     // sass for module's styles
```

Support Es6 using babel.

## Installation

First, install [Yeoman](http://yeoman.io), [bower](https://bower.io/) and generator-wass using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo bower generator-wass
```

## Usage

Make a new directory, and cd into it:

```bash
mkdir new-app
cd new-app
```

Run `yo wass`, optionally pass app name:

```bash
yo wass [appName]
```

Generate module, find parent module:

```bash
yo wass:module example
```

Import module:

We need import module in parent module, fixing in progress.

```bash
import './modules/example/exampleModule';

var module = angular.module('ParentModule', [
  //import modules
    'ExampleModule'
]);
```

Run Webpack server for develop:

```bash
npm start
```

Generate dist:

```bash
npm run production
```

## Release History

* 28/06/2017 - v0.1.3 - Change Readme adding dependency bower, Fixed error in create module (Error: Cannont find module '../../Util')
* 28/06/2017 - v0.1.4 - Fixed error in create module (Error: Cannont find module '../../Constants')

## License

MIT © [Carlos Ormeño](https://github.com/carlosov) - [Quipucamayoc RRHH](http://quipucamayoc.unmsm.edu.pe/portal/)


[npm-image]: https://badge.fury.io/js/generator-wass.svg
[npm-url]: https://npmjs.org/package/generator-wass
[travis-image]: https://travis-ci.org/CarlosOV/generator-wass.svg?branch=master
[travis-url]: https://travis-ci.org/CarlosOV/generator-wass
[daviddm-image]: https://david-dm.org/CarlosOV/generator-wass.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/CarlosOV/generator-wass
[coveralls-image]: https://coveralls.io/repos/CarlosOV/generator-wass/badge.svg
[coveralls-url]: https://coveralls.io/r/CarlosOV/generator-wass
