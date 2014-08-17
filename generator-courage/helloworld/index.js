var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

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
      this.log('\n\nHelloWorld - Where is Uzi?');
    }
  },

  prompting: {
    optionalPrompts: function() {
      var done = this.async();
      var prompts = [{
          type    : 'input',
          name    : 'target',
          message : 'Target folder, leave empty to use current folder',
          default : ''
      }];

      this.prompt(prompts, function (answers) {
        //check for optional inputs
        this.target = answers.target;

        done();

      }.bind(this));
    }
  },

  writing: {
    copyTemplates: function () {
      var targetDir = this.getTargetDir();
      this.template('HelloWorldController.tpl.js', targetDir + 'HelloWorldController.js');
      this.template('main-helloworld.tpl.js', targetDir + 'main-helloworld.js');
      this.template('models/User.tpl.js', targetDir + 'models/User.js');
      this.template('views/HelloWorld.tpl.js', targetDir + 'views/HelloWorld.js');
    },
  },

  getTargetDir: function () {
    if (this.target.length > 0 && this.target.substr(this.target.length-1) !== '/') {
      this.target += '/';
    }
    return this.target + 'helloworld/';
  },

  end: {
    jspOutput: function () {
      this.log('Demo HelloWorld created.');
      this.log('Copy the next lines to the jsp if you want to see HelloWorld in action');
      this.log('');
      this.log('  <div id="helloworld-container">');
      this.log('    <ss:requirejs main="helloworld/main-helloworld">');
      this.log('    <script>');
      this.log('      require.config || (require.config = {});');
      this.log('      require.config[\'config\'] = {');
      this.log('        el: \'#helloworld-container\'');
      this.log('      };');
      this.log('    </script>');
      this.log('    </ss:requirejs>');
      this.log('  </div>');
      this.log('');
    }
  }

});
