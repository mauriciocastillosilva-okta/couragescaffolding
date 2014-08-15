var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: {
    projectName: function () {
      console.log('Creating files for new project ' + this.name);
    }
  },
  prompting: {
    prompts: function() {
      var done = this.async();
      var prompts = [{
        type    : 'input',
        name    : 'name',
        message : 'Your project name'
      },{
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
        // Check for required project name
          if( answers.projectName === "" ) {
            throw { name: 'FatalError', message: 'You must define project name.' };
         }
        this.name = answers.name;
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
      if (this.target.length > 0 && this.target.substr(this.target.length-1) !== '/') {
        this.target += '/';
      }
      var targetDir = this.target + this.proj() + '/';
      this.template('../../templates/Controller.tpl.js', targetDir + this.ctor() + 'Controller.js');
      this.template('../../templates/main-.tpl.js', targetDir + 'main-' + this.proj() + '.js');
      this.template('../../templates/models/Model.tpl.js', targetDir + 'models/' + this.ctor() + '.js');
      this.template('../../templates/views/View.tpl.js', targetDir + 'views/' + this.ctor() + '.js');
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

  proj: function () { return this.util.lowercase(this.name)},
  ctor: function () { return this.util.capitalize(this.name)},

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
