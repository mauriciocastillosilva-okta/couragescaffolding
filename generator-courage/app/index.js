var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('new', { type: String, required: false });
    this.argument('delete', { type: String, required: false });

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
    },
    projectNamePrompt: function () {
      // If the user didn't specify a name for --new, prompt here for it
      if(typeof this.name === 'undefined' || this.name === null || this.name === "") {
        var pName = this.async();
        var pPrompt = [{
            type    : 'input',
            name    : 'name',
            message : 'Project Name',
        }];
        var self = this;
        this.prompt(pPrompt, function (answers) {
            // If they still refuse, quit
            if( answers.name === "" ) {
              throw { name: 'FatalError', message: 'You must define project name.' };
            }
            self.name = answers.name;
            pName();
        });
      }

    },
    projectName: function () {
          this.log('\n\nCreating files for new project ' + this.name);
    }
  },

  prompting: {
    optionalPrompts: function() {
      var done = this.async();
      var prompts = [{
          type    : 'input',
          name    : 'api',
          message : 'API endpoint',
          default : '/change/this/endpoint'
      },{
          type    : 'input',
          name    : 'formTitle',
          message : 'Form Title',
          default : 'FORM_TITLE'
      },{
          type    : 'input',
          name    : 'target',
          message : 'Target folder, leave empty to use current folder',
          default : ''
      }];

      this.prompt(prompts, function (answers) {

        this.log("ProjectName = " + this.name);

        //check for optional inputs
        this.api = answers.api;
        this.formTitle = answers.formTitle;
        this.target = answers.target;

        done();

      }.bind(this));
    }
  },

  writing: {
    copyTemplates: function () {
      var targetDir = this.getTargetDir();
      this.template('../../templates/Controller.tpl.js', targetDir + this.ctor() + 'Controller.js');
      this.template('../../templates/main-.tpl.js', targetDir + 'main-' + this.proj() + '.js');
      this.template('../../templates/models/Model.tpl.js', targetDir + 'models/' + this.ctor() + '.js');
      this.template('../../templates/views/View.tpl.js', targetDir + 'views/' + this.ctor() + '.js');
    },

    copyTests: function () {
      var targetDir = this.getTargetDir();
      this.template('../../templates/tests/Controller_spec.tpl.js', targetDir + this.ctor() + 'Controller_spec.js');
      this.template('../../templates/tests/View_spec.tpl.js', targetDir + this.ctor() + '_spec.js');
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

  end: {
    jspOutput: function () {
      this.log('All files for project ' + this.proj() + ' have been generated.');
      this.log('Copy the next lines to the jsp where you need to include this project');
      this.log('');
      this.log('  <div id="'+ this.proj() + '-container">');
      this.log('    <ss:requirejs main="' + this.proj() + '/main-' + this.proj() + '">');
      this.log('    <script>');
      this.log('      require.config || (require.config = {});');
      this.log('      require.config[\'config\'] = {');
      this.log('        el: \'#' + this.proj() + '-container\'');
      this.log('      };');
      this.log('    </script>');
      this.log('    </ss:requirejs>');
      this.log('  </div>');
      this.log('');
    }
  }

});
