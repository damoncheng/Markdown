var path = require('path');

const webpackConfig = require('./webpack.config.js');
		path.join(__dirname, 'test', 'spec', 'trash')

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);


  /**
   * Resolve external project resource as file path
   */
  function resolvePath(project, file) {
    return path.join(path.dirname(require.resolve(project)), file);
  }

  // Project configuration.
  grunt.initConfig({
	webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: false }, webpackConfig)
    },
    copy: {
      bpmn_js: {
        files: [
          {
            expand: true,
            cwd: resolvePath('bpmn-js', 'dist'),
            src: ['**/*.*', '!**/*.js'],
            dest: 'dist/vendor/bpmn-js'
          }
        ]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['**/*.*', '!**/*.js'],
            dest: 'dist'
          }
        ]
      }
    },
	watch: {
      options: {
        livereload: true
      },

      samples: {
        files: [ 'app/**/*.*' ],
        tasks: [ 'copy:app' ]
      },
    },
    connect: {
      livereload: {
        options: {
          port: 9013,
          livereload: true,
          hostname: 'localhost',
          open: true,
          base: [
            'dist'
          ]
        }
      }
    }
  });


  grunt.registerTask('build', [ 'copy', 'webpack' ]);

  grunt.registerTask('auto-build', 
	  [
		  'copy',
		  'webpack',
		  'connect:livereload',
		  'watch'
	  ]
  );

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['build']);

};

