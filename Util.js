/**
 * Created by Programador RRHH-2.
 */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const constants = require('./Constants');

module.exports = {

  getDirectories(arrPath){
    let srcPath = this.getPathFromArray(arrPath);
    console.log("srcPath: ", srcPath)
    try {
      return fs.readdirSync(srcPath)
        .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
    }
    catch(err){
      return [];
    }
  },

  getPathFromArray(arrPath){
    if(arrPath.length == 1){
      return arrPath[0];
    }
    let srcPath = arrPath[0];
    for(let i=1; i<arrPath.length; i++){
      srcPath += '\\'+arrPath[i]+'\\modules';
    }
    return srcPath;
  },

  setDefaultOptions(arr, noUp){
    arr.unshift(constants.HERE);
    if(!noUp){
      arr.push(constants.UPLEVEL);
    }
    arr.push(new inquirer.Separator());
    return arr;
  }

};
