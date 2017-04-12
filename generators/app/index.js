/**
 * Created by Programador RRHH-2.
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to tavern, we will drink ' + chalk.red( 'Beers')
    ));

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description'
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepagge url',
        default: ""
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: "Anonymous"
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: "MIT"
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: "1.0.0"
      },
      {
        type: 'input',
        name: 'title',
        message: 'Uhmm title in html',
        default: "App"
      },
      {
        type: 'input',
        name: 'dist',
        message: 'Relative path for generate dist files',
        default: "./dist"
      },
      {
        type: 'input',
        name: 'port',
        message: 'Port for development server',
        default: "43040"
      },
      {
        type: 'confirm',
        name: 'imageLoader',
        message: 'Load images with base64?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    this.fs.copy(
      this.templatePath('src/app'),
      this.destinationPath('src/app')
    );

    this.fs.copy(
      this.templatePath('src/img'),
      this.destinationPath('src/img')
    );

    this.fs.copy(
      this.templatePath('src/libs'),
      this.destinationPath('src/libs')
    );

    this.fs.copy(
      this.templatePath('src/app.js'),
      this.destinationPath('src/app.js')
    );

    this.fs.copy(
      this.templatePath('src/app.scss'),
      this.destinationPath('src/app.scss')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('src/_index.html'),
      this.destinationPath('src/index.html'),{
        title: this.props.title
      }
    );

    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),{
        name: this.props.projectName,
        description: this.props.description,
        author: this.props.author,
        license: this.props.license,
        homepage: this.props.homepage
      }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),{
        name: this.props.projectName,
        description: this.props.description,
        author: this.props.author,
        license: this.props.license,
        version: this.props.version,
        port: this.props.port
      }
    );


    var imageLoader = "file-loader";
    if(this.props.imageLoader) imageLoader="base64-image-loader";
    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js'),{
        dist: this.props.dist,
        imageloader: imageLoader
      }
    );

  }

  install() {
    this.installDependencies({
      npm: true,
      yarn: false,
      bower: true
    });
  }
};
