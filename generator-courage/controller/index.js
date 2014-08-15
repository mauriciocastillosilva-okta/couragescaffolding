var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: {
		projectName: function () {
      console.log('Creating Controller for project ' + this.name);
	  }
  },

  writing: {
	  copyTemplates: function () {
        this.template('../../templates/Controller.tpl.js', this.name + 'Controller.js');
	  }
  }

});
