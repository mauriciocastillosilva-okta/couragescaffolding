var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: {
		projectName: function () {
      console.log('Creating files for new project ' + this.name);
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
