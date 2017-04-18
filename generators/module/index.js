/**
 * Created by Programador RRHH-2.
 */
// Link para ver como jalar el path
// http://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
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
        message: 'Would you like to enable this option?',
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
        this.addLevel(this.addLevel, props.someAnswer);
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

    console.log("writing");
    console.log("this.pathArr: ", this.pathArr);
  }

  install() {
    // this.installDependencies();
  }
};
