/**
 * Created by Programador RRHH-2.
 */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const constants = require('./../Constants');

module.exports = {

  removeLevel(pathArr){
    if(pathArr.length > 0){
      return pathArr.pop();
    }
  },

  addLevel(pathArr, level){
    return pathArr.push(level);
  },

  getChoices(pathArr){
    return this.setDefaultOptions(this.getDirectories(pathArr), pathArr.length <= 1);
  },

  getDirectories(arrPath){
    let srcPath = this.getPathFromArray(arrPath);
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
  },

  getPathModule(pathArr ,pathChild){
    let pathChildArr = pathChild.split("/");
    let path = this.getPathFromArray(pathArr);
    for(let i=0; i<pathChildArr.length; i++){
      path += "\\"+pathChildArr[i];
    }
    return path;
  },

  toUpperCamelCase(word){
    word = word.charAt(0).toUpperCase()+word.slice(1);
    return word;
  },

  toLowerCamelCase(word){
    word = word.charAt(0).toLowerCase()+word.slice(1);
    return word;
  }

};
