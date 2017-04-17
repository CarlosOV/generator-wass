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
        choices: this.getChoices()
      }
    ];

    console.log("before ask: ",this.pathArr)
    return this.askForPath();
  }

  askForPath(final){

    console.log("in ask: ",this.pathArr)
    if(final){
      this.pathArr.push("");
      console.log("final--------------")
      return ;}

    return this.prompt(this.prompts).then(props => {

      this.props = props;
      if(props.someAnswer == constants.HERE){
        console.log("HERE");
        final = true;
      }
      else if(props.someAnswer == constants.UPLEVEL){
        console.log("UPLEVEL");
        this.removeLevel();
      }
      else{
        this.addLevel(props.someAnswer);
      }

      this.prompts[0].choices = this.getChoices();
      console.log("return ask: ",this.pathArr);
      if(final){
        return ;
      }
      return this.askForPath(final);

    });
  }

  getBasePath(){
    return process.cwd()+'\\src\\app';
  }

  removeLevel(){
    if(this.pathArr.length > 0){
      return this.pathArr.pop();
    }
  }

  addLevel(level){
    return this.pathArr.push(level);
  }

  getChoices(){
    return Util.setDefaultOptions(Util.getDirectories(this.pathArr), this.pathArr.length <= 1);
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
