// 包装函数
module.exports = function(grunt) {
    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: {
                files: [{
                    src: ['build/*']
                }]
            }
        },
        concat: {
            options: {
                banner: '/*! http://JSLite.io - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                src: [
                    'src/polyfill.js',
                    'src/JSLite.js',
                    'src/form.js',
                    'src/event.js',
                    'src/ajax.js'
                ],
                dest: 'build/JSLite.js'
            }
        },
        // uglify插件的配置信息
        uglify: {
            options: {
                preserveComments: 'some'
            },
            js: {
                src: '<%= concat.js.dest %>',
                dest: 'build/JSLite.min.js'
            }
        },
        // watch插件的配置信息
        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['default']
            }
        }
    });

    // 任务加载
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    // 告诉grunt当我们在终端中输入grunt时需要做些什么
    grunt.registerTask('default', ['clean', 'concat', 'uglify']);

};
