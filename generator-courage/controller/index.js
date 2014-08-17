var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('new', { type: String, required: false });

    // setup project name from argument
    this.name = this.new;
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
      this.log('\n\n');
    },
    projectNamePrompt: function () {
      // If the user didn't specify a name for --new, prompt here for it
      if(typeof this.name === 'undefined' || this.name === null || this.name === "") {
        var pName = this.async();
        var pPrompt = [{
            type    : 'input',
            name    : 'name',
            message : 'Controller Name',
        }];
        var self = this;
        this.prompt(pPrompt, function (answers) {
            // If they still refuse, quit
            if( answers.name === "" ) {
              throw { name: 'FatalError', message: 'You must define controller name.' };
            }
            self.name = answers.name;
            pName();
        });
      }

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

        this.log("Controller Name = " + this.name);

        //check for optional inputs
        this.target = answers.target;

        done();

      }.bind(this));
    }
  },

  writing: {
    copyTemplates: function () {
      var targetDir = this.getTargetDir();
      this.template('../../templates/Controller.tpl.js', targetDir + this.ctor() + 'Controller.js');
    },

    copyTests: function () {
      var testDir = this.getTestDir();
      this.template('../../templates/tests/Controller_spec.tpl.js', testDir + this.ctor() + 'Controller_spec.js');
    }
  },

  util: {
    lowercase: function (word) {
      return word.toLowerCase();
    },

    capitalize: function (word) {
      return word[0].toUpperCase() + word.slice(1);
    }
  },

  proj: function () { if(this.name) {return this.util.lowercase(this.name)}},
  ctor: function () { if(this.name) {return this.util.capitalize(this.name)}},

  getTargetDir: function () {
    if (this.target.length > 0 && this.target.substr(this.target.length-1) !== '/') {
      this.target += '/';
    }
    return this.target + this.proj() + '/';
  },

  getTestDir: function () {
    return '../test/unit/spec/' + this.proj() + '/';
  },

  end: {
    jspOutput: function () {
      this.log('Controller created.');
    }
  }

});
