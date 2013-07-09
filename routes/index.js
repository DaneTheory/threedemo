
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express',
                        styles:['stylesheets/mystyle.css'],
                        scripts: ['javascripts/three/three.min.js',
                                  'javascripts/three/controls/TrackballControls.js',
                                  'javascripts/three/libs/tween.min.js',
                                  'javascripts/testApp.js']});
};

exports.particles = function(req, res){
  res.render('particles', { title: 'Express',
                        styles:['stylesheets/mystyle.css'],
                        scripts: ['javascripts/three/three.min.js',
                                  'javascripts/three/controls/TrackballControls.js',
                                  'javascripts/three/libs/tween.min.js',
                                  'javascripts/particles.js']});
};

exports.sparks = function(req, res){
  res.render('index', { title: 'Express',
                        styles:['stylesheets/mystyle.css'],
                        scripts: ['javascripts/three/three.min.js',
                                  'javascripts/three/controls/TrackballControls.js',
                                  'javascripts/three/libs/tween.min.js',
                                  'javascripts/three/Sparks.js',
                                  'javascripts/three/CanvasShaders.js',
                                  'javascripts/sparks.js']});
};