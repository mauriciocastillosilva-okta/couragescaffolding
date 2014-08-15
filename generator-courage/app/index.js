var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: {
		projectName: function () {
      console.log('Creating files for new project ' + this.name);
	  }
  },
  prompting: {
     projectName: function() {
     	var done = this.async();
	        this.prompt({
	        	type    : 'input',
	      		name    : 'name',
	     		message : 'Your project name'
	     	}, function (answers) {
	     	if( answers.name === "" ) {
	     		throw { name: 'FatalError', message: 'You must define project name.' };
	     	} 
		    this.name = answers.name;
		    this.log("ProjectName = " + this.name);
		     done();
		    }.bind(this));
	 }
  },
  writing: {
	  copyTemplates: function () {
        this.template('../../templates/Controller.tpl.js', this.ctor() + 'Controller.js');
        this.template('../../templates/main-.tpl.js', 'main-' + this.proj() + '.js');
        this.template('../../templates/models/Model.tpl.js', 'views/' + this.ctor() + '.js');
        this.template('../../templates/views/View.tpl.js', 'models/' + this.ctor() + '.js');
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

});
