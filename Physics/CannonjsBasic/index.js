import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import CANNON from 'cannon'

// import { CannonPhysics } from '/js/CannonPhysics.js';


console.log( 'C', CANNON)
const preload = () => {

  let manager = new THREE.LoadingManager();
  manager.onLoad = function ( ) {
    init( imgs );
  };
  let imgs = [];
  const loader = new THREE.TextureLoader(manager).load( require('/img/starts.jpg'), function ( texture ) {
      texture.encoding = THREE.sRGBEncoding;
      imgs[0] = texture;

  } );
  let imgTwo
  const loader2 = new THREE.TextureLoader( manager);
  loader2.load( require('/img/brujula.jpg'), function ( texture2 ) {
      texture2.encoding = THREE.sRGBEncoding
      imgs[1] = texture2;

  } );
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  preload();

} else {
  document.addEventListener("DOMContentLoaded", preload); 

}



function init( imgs ) {

  var world, mass, body, shape, timeStep=1/60,
      geometry, material, mesh;

  let stats = new Stats();
  document.body.appendChild( stats.dom );

  const container = document.querySelector( '#magic' );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  const camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  const plane = createGridHelp( scene );
  geometry = new THREE.BoxGeometry( 2, 2, 2 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  initCannon()

  const renderer = createRenderer( container );
  window.addEventListener( 'resize', onWindowResize );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

  function update() {
    stats.update();
    // Step the physics world
    world.step(timeStep);

    // Copy coordinates from Cannon.js to Three.js
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);


  }

  function render() {

    renderer.render( scene, camera );

  }
  function initCannon() {

      world = new CANNON.World();
      world.gravity.set(0,0,0);
      world.broadphase = new CANNON.NaiveBroadphase();
      world.solver.iterations = 10;

      shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
      mass = 1;
      body = new CANNON.Body({
        mass: 1
      });
      body.addShape(shape);
      body.angularVelocity.set(0,10,0);
      body.angularDamping = 0.5;
      world.add(body);

  }

  function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );

  }
}


