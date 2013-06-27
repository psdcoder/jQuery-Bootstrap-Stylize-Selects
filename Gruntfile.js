module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            main: {
                src: [
                    'dev/js/jquery.bootstrap-stylize-selects.js'
                ],
                dest: 'src/js/jquery.bootstrap-stylize-selects.js'
            }
        },
        uglify: {
            main: {
                files: {
                    'src/js/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },
        recess: {
            dist: {
                options: {
                    compile: true,
                    compress: true
                },
                files: {
                    'src/css/jquery.bootstrap-stylize-selects.css': [
                        'dev/less/jquery.bootstrap-stylize-selects.less'
                    ]
                }
            }
        },
        watch: {
            css: {
                files: 'dev/less/jquery.bootstrap-stylize-selects.less',
                tasks: ['concat', 'uglify', 'recess'],
                options: {
                    livereload: true,
                    debounceDelay: 250,
                    nospawn: true
                }
            }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'recess']);
};