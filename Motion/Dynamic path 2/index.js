import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera;
let container;
let renderer;
let scene;
let cubes;
let path;
let up = new THREE.Vector3( 0, 1, 0 );
let axis, tangent, radians;



function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  createGridHelp( scene )
  cubes = createMeshes( scene );

  path = new CustomSinCurve( 5,-5 );


  drawPath( path );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}
let cont= 4.9;
function update() {
  stats.update();
  
  const time = ((.001 * performance.now())  % 2 ) / 2;
  const point = path.getPoint( time );

  if( time >0.99){
    path = new CustomSinCurve( cont , Math.random() * (10 - 3) + 3 );
    cont = cont -.1;
    drawPath( path );
   
  }
    cubes[0].position.x =  point.x;
    cubes[0].position.y =  point.y;
    cubes[0].position.z =  point.z;

}

function CustomSinCurve( scale, height ) {

  THREE.Curve.call( this );
  this.height = ( height === undefined ) ? 1 : height;
  this.scale = ( scale === undefined ) ? 1 : scale;

}
CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t) {


  t = t * 2 * Math.PI; // normalized to 0..1
  var a = this.scale / 2;

  var x = a *  Math.cos( t );
  var y = ( Math.sin( t *2) % this.height ) / this.height ;
  var z = a * Math.sin( t );

  return new THREE.Vector3( x, y, z ).multiplyScalar( this.scale );

};

function drawPath( ) {

  const vertices = path.getSpacedPoints(100);
  const lineGeometry = new THREE.Geometry();
  lineGeometry.vertices = vertices;
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000
  });
  const line = new THREE.Line(lineGeometry, lineMaterial)
  scene.add(line);
}

function render() {

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();

