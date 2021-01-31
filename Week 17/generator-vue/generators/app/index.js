var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  async initPackage() {
    let  answer = await this.prompt([{
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      // {
      //   type: "confirm",
      //   name: "cool",
      //   message: "Would you like to enable the Cool feature?"
      // }
    ]);
    const pkgJson = {
      "name": answer.name,
      "version": "1.0.0",
      "description": "",
      "main": "./generators/app/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
      
      },
      "dependencies": {
      
      }
    };
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.npmInstall(['vue'], { 'save-dev': false });
    this.npmInstall(['webpack','vue-loader'], { 'save-dev': true });
  }

};