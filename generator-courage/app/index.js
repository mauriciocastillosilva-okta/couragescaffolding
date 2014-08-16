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
          this.log('Creating files for new project ' + this.name);
    }
  },

  prompting: {
    optionalPrompts: function() {
      this.log(this.yeoman);

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
      },{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
          name: 'MasterView',
          value: 'masterview',
          checked: true
        }, {
          name: 'Data List',
          value: 'datalist',
          checked: false
        }, {
          name: 'Form',
          value: 'form',
          checked: false
        }, {
          name: 'Basic View',
          value: 'basicview',
          checked: false
        }]
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
      var testDir = this.getTestDir(this.target);
      this.template('../../templates/tests/Controller_spec.tpl.js', testDir + this.ctor() + 'Controller_spec.js');
      this.template('../../templates/tests/View_spec.tpl.js', testDir + 'views/' + this.ctor() + '_spec.js');
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
      console.log('All files for project ' + this.proj() + ' have been generated.');
      console.log('Copy the next lines to the jsp where you need to include this project');
      console.log('');
      console.log('  <div id="'+ this.proj() + '-container">');
      console.log('    <ss:requirejs main="' + this.proj() + '/main-' + this.proj() + '">');
      console.log('    <script>');
      console.log('      require.config || (require.config = {});');
      console.log('      require.config[\'config\'] = {');
      console.log('        el: \'#' + this.proj() + '-container\'');
      console.log('      };');
      console.log('    </script>');
      console.log('    </ss:requirejs>');
      console.log('  </div>');
      console.log('');
    }
  }

});
