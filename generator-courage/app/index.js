var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('new', { type: String, required: false });
    
    // setup project name from argument
    this.name = this.new;

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
      this.log('\n\n');
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
    }
  },

  prompting: {
    optionalPrompts: function() {
      var done = this.async();
      var prompts = [
        {
          type    : 'input',
          name    : 'name',
          message : 'Project Name:',
          when: function () {
            !this.name;
          }
        },{
          type    : 'list',
          name    : 'view',
          message : 'Main View:',
          choices : [ 'View', 'MasterView', 'DataList', 'Form'] 
        },{
          type    : 'input',
          name    : 'model',
          message : 'Model Name:',
          default : this.ctor()
        },{
          type    : 'input',
          name    : 'api',
          message : 'API endpoint for the model:',
          default : '/change/this/endpoint'
        },{
          type    : 'input',
          name    : 'formTitle',
          message : 'Form Title',
          when: function( answers ) {
            return answers.view === 'Form'
          },
          default : 'My Form'
        },{
          type    : 'input',
          name    : 'target',
          message : 'Target Folder:',
          default : this.root
        }
      ];

      this.prompt(prompts, function (answers) {

        //check for optional inputs
        this.api = answers.api;
        this.formTitle = answers.formTitle;
        this.target = answers.target;
        this.projDir = this.root + this.name;
        this.testDir = this.test + this.name;
        this.view = answers.view;
        this.viewName = this.ctor() + this.view; //ex: 'AppUser' + 'DataList'
        this.model = answers.model;
        done();

      }.bind(this));
    }
  },

  writing: {
    commonTemplates: function () {
      var targetDir = this.getTargetDir();
      this.template('../../templates/Controller.tpl.js', targetDir + this.ctor() + 'Controller.js');
      this.template('../../templates/main-.tpl.js', targetDir + 'main-' + this.proj() + '.js');
      this.template('../../templates/models/Model.tpl.js', targetDir + 'models/' + this.model + '.js');
      this.template('../../templates/views/' + this.view + '.tpl.js', targetDir + 'views/' + this.viewName + '.js');
    },

    copyTests: function () {
      var testDir = this.getTestDir();
      this.template('../../templates/tests/Controller_spec.tpl.js', testDir + this.ctor() + 'Controller_spec.js');
      this.template('../../templates/tests/View_spec.tpl.js', testDir + 'views/' + this.viewName + '_spec.js');
      this.template('../../templates/tests/Model_spec.tpl.js', testDir + 'models/' + this.model + '_spec.js');
    }
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
      this.log('All files for project ' + this.proj() + ' have been generated.');
      // this.log('To revert these changes:');
      // this.log('rm -rf ' + this.projDir + ' && rm -rf ' + this.testDir);
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
