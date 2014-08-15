var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('new', { type: String, required: true });
    this.argument('delete', { type: String, required: false });

    // setup project name
    this.name = this.new

  },
  initializing: {
		projectName: function () {
      		this.log('Creating files for new project ' + this.name);
	  }
  },
  prompting: {
     prompts: function() {
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
		    	// Check for required project name
	        	if( answers.projectName === "" ) {
		     		throw { name: 'FatalError', message: 'You must define project name.' };
		     	} 
			    this.name = answers.name;
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
