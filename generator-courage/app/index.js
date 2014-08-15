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
		    }];

		    this.prompt(prompts, function (answers) {
		    	
			    this.log("ProjectName = " + this.name);

			    //check for optional inputs
			    this.api = answers.api;
			    this.formTitle = answers.formTitle;

			    done();

		    }.bind(this));
		}
  },
  writing: {
	  copyTemplates: function () {
        this.template('../../templates/Controller.tpl.js', this.ctor() + 'Controller.js');
        this.template('../../templates/main-.tpl.js', 'main-' + this.proj() + '.js');
        this.template('../../templates/models/Model.tpl.js', 'models/' + this.ctor() + '.js');
        this.template('../../templates/views/View.tpl.js', 'views/' + this.ctor() + '.js');
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

});
