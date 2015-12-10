// Gruntfile
module.exports = function (grunt) {
    'use strict';

    //Cargamos las tareas de Grunt
    require('load-grunt-tasks')(grunt);

    //Declaración de variables
    var isLocal = true;
    var configParams = {
        //Puerto donde se levanta el servidor
        'www_server': ( isLocal ? 'localhost' : 'roombooking-cgoico91.rhcloud.com'),
        'www_port': ( isLocal ? '8080' : '8080'),

        //Directorio con la versión de distribución de la web
        'dist_www': 'dist'
    };

    //Declaramos la configuración de Grunt
    grunt.initConfig({
        //Asignamos las variables que hemos creado anteriormente
        constants: configParams,

        //Tarea para copiar archivos de una dirección a otra
        copy: {
            //Copiamos las librerías de /bower_components a nuestra aplicación
            'bower': {
                files: [
                    /* Librerias JS */
                    {
                        expand: true, cwd: 'bower_components/angular/',
                        src: 'angular.js', dest: 'www/js/lib/angular/'
                    },
                    {
                        expand: true, cwd: 'bower_components/angular-route/',
                        src: 'angular-route.min.js', dest: 'www/js/lib/angular/'
                    },

                    {
                        expand: true, cwd: 'bower_components/requirejs/',
                        src: 'require.js', dest: 'www/js/lib/requirejs/'
                    },
                    {
                        expand: true, cwd: 'bower_components/jquery/dist/',
                        src: 'jquery.js', dest: 'www/js/lib/jquery/'
                    },

                    /* Angular Material */
                    {
                        expand: true, cwd: 'bower_components/angular-material/',
                        src: 'angular-material.min.js', dest: 'www/js/lib/angular-material/'
                    }, {
                        expand: true, cwd: 'bower_components/angular-material/',
                        src: 'angular-material.min.css', dest: 'www/js/lib/angular-material/'
                    }, {
                        expand: true, cwd: 'bower_components/angular-material/',
                        src: 'angular-material.layout.min.css', dest: 'www/js/lib/angular-material/'
                    },

                    /* Polymer */
                    {
                        expand: true, cwd: 'bower_components/webcomponentsjs/',
                        src: 'webcomponents-lite.min.js', dest: 'www/js/lib/polymer/'
                    }
                ]
            },
            //Copiamos los archivos de la aplicación para generar una versión
            'dist': {
                files: [
                    {
                        expand: true, cwd: 'www/',
                        src: ['index.html','css/**', 'views/**', 'js/main.js', 'js/scripts/**'],
                        dest: '<%= constants.dist_www %>/www/'
                    }
                ]
            }
        },

        //Tarea para levantar un servidor
        connect: {
            //Definimos el hostname
            options: {
                hostname: '<%= constants.www_server %>'
            },
            'init-server': {
                options: {
                    port: '<%= constants.www_port %>',
                    base: '.',
                    keepalive: true
                }
            }
        },

        //Abrimos una ventana en Chrome
        open: {
            'serve-www': {
                path: 'http://<%= constants.www_server %>:<%= constants.www_port %>/www/',
                app: 'Google Chrome'
            }
        },

        //Comprimimos los css a una linea
        cssmin: {
            'dist-www': {
                files: {
                    '<%= constants.dist_www %>/css/style.css': 'www/css/style.css'
                }
            }
        },

        //Comprimimos los html a una linea
        htmlmin : {
            'dist-www': {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true, cwd: 'www/',
                    src: '**/*.html', dest: '<%= constants.dist_www %>/'
                }]
            }
        }
    });


    //============================================
    // Declaramos las tareas
    //--------------------------------------------

    //SERVE-WWW: Tarea para levantar un servidor en localhost
    grunt.registerTask('serve-www', [
        'copy:bower',
        'open',
        'connect:init-server'
    ]);

    //DIST-WWW: Tarea para crear una distribución web
    grunt.registerTask('dist-www', [
        'copy:bower',
        'cssmin:dist-www',
        'htmlmin:dist-www',
        'copy:dist'
    ])
};