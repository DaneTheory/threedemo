var camera, scene, renderer, mesh, material,circleShape;
var controls,timeOnShapePath=0;;
var dna = 'ATCGGGATAGGGATGCCA';
var colors = {
    a: 0x0000ff,
    c: 0x00ff00,
    t: 0xff0000,
    g: 0xff0f0f
};
var particleCount = 1000,
    particles = new THREE.Geometry(),
    pMaterial, particleSystem;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.x=500;

    scene = new THREE.Scene();
    parent = new THREE.Object3D();
     material = new THREE.MeshLambertMaterial( { color: 0x00FF00} );
        mesh = new THREE.Mesh( new THREE.SphereGeometry( 10, 16, 8 ),material );
        mesh.position.set(0,200,0);
        parent.add(mesh)
        scene.add( parent );
    pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture("images/particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    // also update the particle system to
    // sort the particles which enables
    // the behaviour we want

    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = 0,
            pY = 0,
            pZ = 0,
            particle = new THREE.Vertex(
            new THREE.Vector3(pX, pY, pZ));
        // create a velocity vector
        particle.velocity = new THREE.Vector3(
        0, // x
        -Math.random(), // y
        0); // z

        // add it to the geometry
        particles.vertices.push(particle);
    }
    // create the particle system
    particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);
    particleSystem.sortParticles = true;
    // add it to the scene
    parent.add(particleSystem);
    // for(var i=0; i < dna.length; i++){
    //     material = new THREE.MeshLambertMaterial( { color: colors[dna[i].toLowerCase()] } );
    //     mesh = new THREE.Mesh( new THREE.SphereGeometry( 10, 16, 8 ),material );
    //     mesh.position.set(20*i,0,0);
    //     scene.add( mesh );
    // }
    // material = new THREE.MeshLambertMaterial( { color: colors[dna[0].toLowerCase()] } );
    // mesh = new THREE.Mesh( new THREE.SphereGeometry( 100, 16, 8 ),material );
    // scene.add(mesh);
    var ambient = new THREE.AmbientLight(0x101010);
    scene.add(ambient);

    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 2).normalize();
    scene.add(directionalLight);

    circleShape = new THREE.Shape();

    var circleRadius = 10;
	circleShape = new THREE.Shape();
	circleShape.moveTo( 0, circleRadius );
	circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
	circleShape.quadraticCurveTo( circleRadius, -circleRadius, 0, -circleRadius );
	circleShape.quadraticCurveTo( -circleRadius, -circleRadius, -circleRadius, 0 );
	circleShape.quadraticCurveTo( -circleRadius, circleRadius, 0, circleRadius );
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    document.getElementById('container').appendChild(renderer.domElement);

    //

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    window.addEventListener('resize', onWindowResize, false);

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
    update();
}

function update() {
    

    var pCount = particleCount;
    while (pCount--) {
        // get the particle
        var particle = particles.vertices[pCount];

        // check if we need to reset

        if (particle.y < -100) {
            particle.y = 200;
            particle.velocity.y = 0;
        }

        // update the velocity
        particle.velocity.y -= Math.random() * .1;

        // and the position
        particle.add(particle.velocity);

    }
    particleSystem.geometry.__dirtyVertices = true;
    render();
}

function render() {
 //    timeOnShapePath += 0.0037;
	// if (timeOnShapePath > 1) timeOnShapePath -= 1;
 //    var pointOnShape = circleShape.getPointAt( timeOnShapePath );
	// parent.position.x = pointOnShape.x * 5 - 100;
	// parent.position.y = -pointOnShape.y * 5 + 400;
    renderer.render(scene, camera);

}