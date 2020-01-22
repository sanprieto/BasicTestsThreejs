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

  //texts = createParticlesLineText ( scene, 'Se trata del area donde se encuentra el mouse. en base a mouseDistance todo lo que este ahí se repele y cuando no todo vuelve a su sitio. Eres tonto.');

  texts = createParticlesLineText ( scene, 'PUto cabezon');
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


function check( value, array ){

  for ( let  x = 0; x < array.length; x ++ ) {

    if( array[x].id == value ){
      //console.log( 'existe', value)
      return true ;
    }
  } 

  return false;
}


function update() {
  stats.update();

  raycaster.setFromCamera( mouse, camera );

  const intersects = raycaster.intersectObject( plane );

  if ( intersects.length > 0 ) {

    const mx = intersects[ 0 ].point.x;
    const my = intersects[ 0 ].point.y;

    const pos = texts.geometry.attributes.position;
    const copy = geometry.attributes.position;

    for ( var i = 0, l = pos.count; i < l; i++) {

      const initX = copy.getX(i);
      const initY = copy.getY(i);

      const px = pos.getX(i);
      const py = pos.getY(i);

      //const dx = px - mx;
      //const dy = py - my;

      const dx = mx - px;
      const dy = mx - py;

      var dist = Math.sqrt(dx*dx + dy*dy);

      
      if( dist < 10 ){

        const ax = dx;

        px -= ax/25;
     
        pos.setX( i, px );
        //pos.setXY( i, px, py );
        pos.needsUpdate = true;


      }

      const dxo = px - initX ;
      px -= dxo/50;

      pos.setX( i, px);
      pos.needsUpdate = true;


/*
        px -= dx/100;
        //py -= dy/100;

        pos.setX( i, px);
        pos.needsUpdate = true;*/


      

    }
    
  }
}

  /*

  var geometry = texts.geometry;
  var attributes = geometry.attributes;

  intersects = raycaster.intersectObject( texts );

  if ( intersects.length > 0 ) {

    console.log('eoo')
      const { x,y } = intersects[ 0 ].point;

      const pos = texts.geometry.attributes.position;

      for ( var i = 0, l = pos.count; i < l; i++) {

          const mouseDistance = distance( x, y, pos.getX(i), pos.getY(i) );

          if( mouseDistance < 50 ){

            const exist = check( i, mixer );

            if( exist == false ){

              const obj = {

                id: i,
                time: 0 ,
                step: 0.02,
                initPosi: new THREE.Vector3( pos.getX(i), pos.getY(i), pos.getZ(i) ) ,
                cont: 0,

              }
              //console.log( 'no existe', i )
              mixer.push( obj );
              //console.log( 'mixer', mixer)
            
            } 
          }

      }


  }


  mixer.forEach( ( obj,i ) => {

    const pos = texts.geometry.attributes.position;
    const theX = interpolation ( obj.initPosi.x ,  5 , obj.time );

    pos.setX( obj.id, theX );
    pos.needsUpdate = true;

    obj.time += obj.step;
    if (obj.time <= 0 || obj.time >=1){
      obj.step = -obj.step;
      obj.cont += 1
      if( obj.cont == 2){
        //console.log('in 2')
        pos.setXYZ( obj.id, obj.initPosi.x, obj.initPosi.y, obj.initPosi.z );
        pos.needsUpdate = true;
        obj.step = 0;
      }
      
    }


  });
  */



function render() {

  renderer.render( scene, camera );

}



const distance = (x1, y1, x2, y2) => {
 
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

const map = (value, start1, stop1, start2, stop2) => {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
}


const interpolation = ( a, b , t ) => { return a + ( b - a ) * t };
const ease = ( t ) => { return t<0.5 ? 2*t*t : -1+(4-2*t)*t }

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