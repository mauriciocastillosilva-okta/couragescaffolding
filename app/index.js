var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: {
		test1: function () {
	  	console.log('This is test 1 for ' + this.name);
	  },

	  test2: function () {
	  	if (this.name == 'Mau') {
	  		this.template('../../templates/Controller.tpl.js', 'Controller.js');
	  		console.log('I created your new Controller!!');
	  	}
	  }
  },

});
