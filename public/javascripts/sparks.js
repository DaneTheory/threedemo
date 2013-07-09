var camera, scene, renderer, mesh, material, particles;
var controls;


init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 100;

    scene = new THREE.Scene();

    material = new THREE.MeshLambertMaterial({
        color: 0x00ff00
    });
    mesh = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 8), material);
    mesh.position.set(0, 0, 0);
    // scene.add(mesh);


    // material = new THREE.MeshLambertMaterial( { color: colors[dna[0].toLowerCase()] } );
    // mesh = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ),material );
    // scene.add(mesh);
    var ambient = new THREE.AmbientLight(0x101010);
    scene.add(ambient);

    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 2).normalize();
    scene.add(directionalLight);

    particleCloud = new THREE.Object3D(); // Just a group
    particleCloud.y = 800;
    var parent = new THREE.Object3D();
    parent.add(particleCloud);
   // parent.add(mesh);
    scene.add(parent);
    var hue = 0;


    var setTargetParticle = function() {

        //hearts circleLines
        //	var material = new THREE.ParticleCanvasMaterial( {  program: hearts, blending:THREE.AdditiveBlending } );
        var material = new THREE.ParticleBasicMaterial({
            color: 0x00FF00,
            size: 15,

            transparent: true
        });
        material.color.setHSL(hue, 1, 0.75);
        hue += 0.001;
        if (hue > 1) hue -= 1;

        particle = new THREE.Particle(material);

        //particle.scale.x = particle.scale.y = Math.random() * 20 +20;
        particleCloud.add(particle);

        return particle;

    };

    var onParticleCreated = function(p) {

        var position = p.position;
        p.target.position = position;

    };

    var onParticleDead = function(particle) {
        particle.target.visible = false;
        particleCloud.remove(particle.target);
    };

    sparksEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(50));

    emitterpos = new THREE.Vector3();

    sparksEmitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(emitterpos)));
    sparksEmitter.addInitializer(new SPARKS.Lifetime(2, 3));
    sparksEmitter.addInitializer(new SPARKS.Target(null, setTargetParticle));

    sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(50, - 50, 50))));

    // TOTRY Set velocity to move away from centroid

    sparksEmitter.addAction(new SPARKS.Age());
    //sparksEmitter.addAction(new SPARKS.Accelerate(0.2));
    sparksEmitter.addAction(new SPARKS.Move());
    sparksEmitter.addAction(new SPARKS.RandomDrift(500, 500, 500));

    sparksEmitter.addCallback("created", onParticleCreated);
    sparksEmitter.addCallback("dead", onParticleDead);
    sparksEmitter.start();



    renderer = new THREE.CanvasRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    document.getElementById('container').appendChild(renderer.domElement);
    var button = document.getElementById('move');
    button.addEventListener('click', function(event) {

        transform(parent, 2000);

    }, false);
    

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    window.addEventListener('resize', onWindowResize, false);

}

function transform(object, duration) {

    TWEEN.removeAll();

 
        new TWEEN.Tween(object.position).to({
            x: object.position.x,
            y: object.position.y+200,
            z: object.position.z
        }, duration).onStart(function(){
            sparksEmitter.start();
        }).onComplete(function(){
            sparksEmitter.stop();
        }).easing(TWEEN.Easing.Exponential.InOut).start();

     

    new TWEEN.Tween(this).to({}, duration * 2).onUpdate(render).start();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    TWEEN.update();
    controls.update();
    render();
}

function render() {

    renderer.render(scene, camera);

}