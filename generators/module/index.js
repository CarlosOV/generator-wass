/**
 * Created by Programador RRHH-2.
 */
// Link para ver como jalar el path
// http://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
      'Welcome back to tavern, we will drink ' + chalk.red( 'More Beers')
    ));

    this.prompts = [
      {
        type: 'list',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        choices: ['opt1', 'opt2']
      }
    ];

    return this.askForPath();
  }

  askForPath(){

    return this.prompt(this.prompts).then(props => {

      this.props = props;
      if(!this.isSetPath){
        return this.askForPath();
      }

    });
  }

  writing() {

  }

  install() {
    // this.installDependencies();
  }
};
