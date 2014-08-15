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
        this.template('../../templates/Controller.tpl.js', this.name + 'Controller.js');
        this.template('../../templates/main-.tpl.js', 'main-' + this.name + '.js');
        this.template('../../templates/models/Model.tpl.js', 'views/' + this.name + 'View.js');
        this.template('../../templates/views/View.tpl.js', 'models/' + this.name + '.js');
	  }
  }

});
