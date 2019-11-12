import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import { LoadingManager } from '/js/loadingManager';
import { SVGLoader } from '/js/SVGLoader';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import { waves, wavesBuffer } from '/js/waves';

const urlData = require('/img/girl.png');
const urlData2 = require('/img/hair.png');
//const urlData2 = require('/img/tiger.svg');
//const urlData3 = require('/img/partTwo.svg');
//const urlData4 = require('/img/hair.png');

let imgOne, imgTwo, plane;
let objects =[];

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, group, girl, hair;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xFFFFFF );
  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  //plane = createGridHelp( scene );
  createImg( scene,.99,-7.6,-11, imgOne, .2);
  hair = createImg( scene,3.7,9.4,-10.3, imgTwo, .28, 40,40,.5);
  console.log(hair.geometry.attributes.position);

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {
  stats.update();
  const time = ( 0.00005 * performance.now() ) % 2;
  wavesBuffer( hair, 2,.5, .002);
  const hue = .10 + .04 * Math.sin( time * ( 2 * Math.PI )); //orange -yellow.
  //console.log( hue );
  hair.material.color.setHSL(  hue, 1, .5 );

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

var manager = new THREE.LoadingManager();

manager.onLoad = function ( ) {
  init();
};


let loader = new THREE.TextureLoader(manager);
loader.load( urlData, function ( texture ) {
    texture.encoding = THREE.sRGBEncoding;
    imgOne = texture;

} );
let loader3 = new THREE.TextureLoader(manager);
loader3.load( urlData2, function ( texture3 ) {
    texture3.encoding = THREE.sRGBEncoding;
    imgTwo = texture3;

} );


/*
var loader2 = new SVGLoader( manager );

loader2.load( urlData2, function ( data ) {

    var paths = data.paths;
          var group = new THREE.Group();
          group.scale.multiplyScalar( 0.25 );
          group.position.x = - 70;
          group.position.y = 70;
          group.scale.y *= - 1;
          for ( var i = 0; i < paths.length; i ++ ) {
            var path = paths[ i ];
         
            var fillColor = path.userData.style.fill;
      
              var material = new THREE.MeshBasicMaterial( {
                color: new THREE.Color().setStyle( fillColor ).convertSRGBToLinear(),
                opacity: path.userData.style.fillOpacity,
                transparent: path.userData.style.fillOpacity < 1,
                side: THREE.DoubleSide,
                depthWrite: true,
                wireframe: false
              } );
              var shapes = path.toShapes( true );
              for ( var j = 0; j < shapes.length; j ++ ) {
                var shape = shapes[ j ];
                var geometry = new THREE.ShapeBufferGeometry( shape );
                var mesh = new THREE.Mesh( geometry, material );
                group.add( mesh );
              }
            var strokeColor = path.userData.style.stroke;

              var material = new THREE.MeshBasicMaterial( {
                color: new THREE.Color().setStyle( strokeColor ).convertSRGBToLinear(),
                opacity: path.userData.style.strokeOpacity,
                transparent: path.userData.style.strokeOpacity < 1,
                side: THREE.DoubleSide,
                depthWrite: true,
                wireframe: true
              } );
              for ( var j = 0, jl = path.subPaths.length; j < jl; j ++ ) {
                var subPath = path.subPaths[ j ];
                var geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );
                if ( geometry ) {
                  var mesh = new THREE.Mesh( geometry, material );
                  group.add( mesh );
                }
              }
            
          }
          myGroup = group;
        } );
        */