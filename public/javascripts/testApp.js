var camera, scene, renderer,mesh, material;
var controls;
var dna = 'ATCGGGATAGGGATGCCA';
var colors={
    a:0x0000ff,
    c:0x00ff00,
    t:0xff0000,
    g:0xff0f0f
    };

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 100;
 
    scene = new THREE.Scene();
    for(var i=0; i < dna.length; i++){
        material = new THREE.MeshLambertMaterial( { color: colors[dna[i].toLowerCase()] } );
        mesh = new THREE.Mesh( new THREE.SphereGeometry( 10, 16, 8 ),material );
        mesh.position.set(20*i,0,0);
        scene.add( mesh );
    }
    // material = new THREE.MeshLambertMaterial( { color: colors[dna[0].toLowerCase()] } );
    // mesh = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ),material );
    // scene.add(mesh);
    var ambient = new THREE.AmbientLight( 0x101010 );
	scene.add( ambient );

	directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 1, 1, 2 ).normalize();
	scene.add( directionalLight );
    

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    document.getElementById('container').appendChild(renderer.domElement);

    //

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.addEventListener( 'change', render );

    window.addEventListener('resize', onWindowResize, false);

}

function transform(targets, duration) {

    TWEEN.removeAll();

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        var target = targets[i];

        new TWEEN.Tween(object.position).to({
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(object.rotation).to({
            x: target.rotation.x,
            y: target.rotation.y,
            z: target.rotation.z
        }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();

    }

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

}

function render() {

    renderer.render(scene, camera);

}