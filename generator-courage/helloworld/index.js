var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    
    this.name = 'helloworld';
    // project root begins as home of .yo-rc.json file, okta-core
    // for now assume all changes are in okta-core not end user
    this.root = this.destinationRoot() + '/WebContent/js/mvc/';
    this.test = this.destinationRoot() + '/WebContent/js/test/unit/spec/';
  },

  initializing: {
    logo: function() {
      this.log('                                     _____');
      this.log('                                  __/      ----_');
      this.log('                                 /              \\');
      this.log('                                /              \\');
      this.log('                               |             _____)');
      this.log('                               |            /     \\');
      this.log('    C O U R A G E              |            \\    /)\\');
      this.log('                               |             \\__/  /');
      this.log('   __/\\__/\\./\\__/\\./\\__/\\./\\__/ | —    _          /\\');
      this.log('  |_ |  |  | |  |  | |  |  |  - -__     \\_____/   \\_/\\');
      this.log('     \\/  \\/ \\/  \\/ \\/  \\/ \\/  \\/   ----|   /          |');
      this.log('                                       |  |___________|');
      this.log('    B A C K B O N E                    |  | ((_(_)| )_)');
      this.log('                                       |  \\_((_(_)|/(_)');
      this.log('                                       \\             (');
      this.log('                                        \\_____________');
      this.log('\n\nHelloWorld - Where is Uzi?');
    }
  },

  prompting: {
    optionalPrompts: function() {
      var done = this.async();
      var prompts = [{
          type    : 'input',
          name    : 'target',
          message : 'Target folder, leave empty to use current folder',
          default : ''
      }];

      this.prompt(prompts, function (answers) {
        //check for optional inputs
        this.target = answers.target;

        done();

      }.bind(this));
    }
  },

  writing: {
    copyTemplates: function () {
      var targetDir = this.getTargetDir();
      this.template('HelloWorldController.tpl.js', targetDir + 'HelloWorldController.js');
      this.template('main-helloworld.tpl.js', targetDir + 'main-helloworld.js');
      this.template('models/User.tpl.js', targetDir + 'models/User.js');
      this.template('views/HelloWorld.tpl.js', targetDir + 'views/HelloWorld.js');
    },
  },

  util: {
      capitalize: function (word) {
        return word[0].toUpperCase() + word.slice(1);
      },

      projName: function (words) {
        return this.constructorName(words).toLowerCase();
      },

      constructorName: function (words) {
        return words.split(/\s|\-/).map(this.capitalize).join('');
      }
    },

  proj: function () { if(this.name) {return this.util.projName(this.name)}},
  ctor: function () { if(this.name) {return this.util.constructorName(this.name)}},

  getTargetDir: function () {
    if (this.target.length > 0 && this.target.substr(this.target.length-1) !== '/') {
      this.target += '/';
    } else {
      this.target = this.root;
    }
    return this.target + this.proj() + '/';
  },

  getTestDir: function () {
    return this.test + this.proj() + '/';
  },


  end: {
    jspOutput: function () {
      this.log('Demo HelloWorld created.');
      this.log('Copy the next lines to the jsp where you need to include this project');
      this.log('');
      this.log('  <div id="'+ this.proj() + '-container"></div>');
      this.log('  <ss:requirejs main="' + this.proj() + '/main-' + this.proj() + '">');
      this.log('  <script>');
      this.log('    require.config || (require.config = {});');
      this.log('    require.config[\'config\'] = {');
      this.log('      el: \'#' + this.proj() + '-container\'');
      this.log('    };');
      this.log('  </script>');
      this.log('  </ss:requirejs>');
      this.log('');
    }
  }

});
