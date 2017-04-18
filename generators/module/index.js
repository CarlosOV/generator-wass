/**
 * Created by Programador RRHH-2.
 */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const Util = require('../../Util');
const constants = require('../../Constants');

module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.name = this.args[0];
    if(!this.name){
      this.log("set name module: ex. "+ chalk.cyan("yo wass:module exampleName"));
      process.exit(1);
      return ;
    }

    this.log(yosay(
      'Welcome back to tavern, we will drink ' + chalk.red( 'More Vodka')
    ));


    this.pathArr = [this.getBasePath()];

    this.prompts = [
      {
        type: 'list',
        name: 'someAnswer',
        message: 'Find parent module:',
        choices: Util.getChoices(this.pathArr)
      }
    ];

    console.log("before ask: ",this.pathArr)
    return this.askForPath();
  }

  askForPath(final){

    if(final){
      this.pathArr.push("");
      return ;
    }

    return this.prompt(this.prompts).then(props => {

      this.props = props;
      if(props.someAnswer == constants.HERE){
        final = true;
      }
      else if(props.someAnswer == constants.UPLEVEL){
        Util.removeLevel(this.pathArr);
      }
      else{
        Util.addLevel(this.pathArr, props.someAnswer);
      }

      this.prompts[0].choices = Util.getChoices(this.pathArr);

      if(final){
        return ;
      }
      return this.askForPath(final);

    });
  }

  getBasePath(){
    return process.cwd()+'\\src\\app';
  }

  writing() {
    this.pathArr.pop();
    let nameModule = this.name;
    let nameModuleUpperCamelCase = Util.toUpperCamelCase(this.name);
    let nameModuleLowerCamelCase = Util.toLowerCamelCase(this.name);

    let pathModule = this.name+"/"+this.name+"Module.js";
    this.fs.copyTpl(
      this.templatePath('module/_Module.js'),
      Util.getPathModule(this.pathArr, pathModule),{
        name: nameModule,
        nameLowerCamelCase: nameModuleLowerCamelCase,
        nameUpperCamelCase: nameModuleUpperCamelCase
      }
    );

    let pathController = this.name+"/controllers/"+this.name+"Controller.js";
    this.fs.copyTpl(
      this.templatePath('module/controllers/_Controller.js'),
      Util.getPathModule(this.pathArr, pathController),{
        name: nameModule,
        nameLowerCamelCase: nameModuleLowerCamelCase,
        nameUpperCamelCase: nameModuleUpperCamelCase
      }
    );

    let pathFactory = this.name+"/services/"+this.name+"Factory.js";
    this.fs.copyTpl(
      this.templatePath('module/services/_Factory.js'),
      Util.getPathModule(this.pathArr, pathFactory),{
        name: nameModule,
        nameLowerCamelCase: nameModuleLowerCamelCase,
        nameUpperCamelCase: nameModuleUpperCamelCase
      }
    );


    let pathView = this.name+"/views/"+this.name+".html";
    this.fs.copyTpl(
      this.templatePath('module/views/module.html'),
      Util.getPathModule(this.pathArr, pathView),{
        name: nameModule,
        nameLowerCamelCase: nameModuleLowerCamelCase,
        nameUpperCamelCase: nameModuleUpperCamelCase
      }
    );

    let pathStyle = this.name+"/"+this.name+".scss";
    this.fs.copyTpl(
      this.templatePath('module/module.scss'),
      Util.getPathModule(this.pathArr, pathStyle),{
        name: nameModule,
        nameLowerCamelCase: nameModuleLowerCamelCase,
        nameUpperCamelCase: nameModuleUpperCamelCase
      }
    );

    console.log("writing");
  }

  install() {
    // this.installDependencies();
  }
};
