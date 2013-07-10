
/*
 * GET home page.
 */

var index = function(req, res){
    var r= Math.random();
    
    if (r > 0.66){
      res.render('index', { title: 'Express',
                            styles:['stylesheets/mystyle.css'],
                            scripts: ['javascripts/three/three.min.js',
                                      'javascripts/three/controls/TrackballControls.js',
                                      'javascripts/three/libs/tween.min.js',
                                      'javascripts/testApp.js']});
    }else if(r > .33){
        particles(req,res);
    }else{
        sparks(req,res);
    }
};

var particles = function(req, res){
  res.render('particles', { title: 'Express',
                        styles:['stylesheets/mystyle.css'],
                        scripts: ['javascripts/three/three.min.js',
                                  'javascripts/three/controls/TrackballControls.js',
                                  'javascripts/three/libs/tween.min.js',
                                  'javascripts/particles.js']});
};

var sparks = function(req, res){
  res.render('index', { title: 'Express',
                        styles:['stylesheets/mystyle.css'],
                        scripts: ['javascripts/three/three.min.js',
                                  'javascripts/three/controls/TrackballControls.js',
                                  'javascripts/three/libs/tween.min.js',
                                  'javascripts/three/Sparks.js',
                                  'javascripts/three/CanvasShaders.js',
                                  'javascripts/sparks.js']});
};

module.exports={
    index:index,
    sparks:sparks,
    particles:particles
}