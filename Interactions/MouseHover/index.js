import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import { createParticlesLineText } from '/js/myTexts';


let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, imgOne, imgTwo, texts, geometry ;
let plane;

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(1000,1000);

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  plane = createMeshes( scene );

  texts = createParticlesLineText ( scene, 'NEW GENERATION\n   OF WEBSITES.');
  geometry = new THREE.BufferGeometry();
  geometry.copy( texts.geometry );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

  document.addEventListener( 'mousemove', onDocumentMouseMove );
  window.addEventListener( 'resize', onWindowResize );

}


function update() {
  stats.update();

  raycaster.setFromCamera( mouse, camera );

  const intersects = raycaster.intersectObject( plane );

  if ( intersects.length > 0 ) {

    const mx = intersects[ 0 ].point.x;
    const my = intersects[ 0 ].point.y;
    const mz = intersects[ 0 ].point.z;

    const pos = texts.geometry.attributes.position;
    const copy = geometry.attributes.position;

    for ( var i = 0, l = pos.count; i < l; i++) {

      const initX = copy.getX(i);
      const initY = copy.getY(i);
      const initZ = copy.getZ(i);

      const px = pos.getX(i);
      const py = pos.getY(i);
      const pz = pos.getZ(i);

      const dx = mx - px;
      const dy = my - py;
      const dz = mz - pz;

      const mouseDistance = distance( mx, my, px, py )

      if( mouseDistance < 18 ){

        const ax = dx;
        const ay = dy;
        const az = dz;

        px -= ax/60;
        py -= ay/60;
        pz -= az/60;
        
        pos.setXYZ( i, px, py, pz );
        pos.needsUpdate = true;


      }
      const dxo = px - initX;
      const dyo = py - initY;
      const dzo = pz - initZ;

      px -= dxo/65;
      py -= dyo/65;
      pz -= dzo/65;

      pos.setXYZ( i, px, py, pz );
      pos.needsUpdate = true;

    }
    
  }
}


function render() {

  renderer.render( scene, camera );

}



const distance = (x1, y1, x2, y2) => {
 
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}


function onDocumentMouseMove( event ) {

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );

}

init();