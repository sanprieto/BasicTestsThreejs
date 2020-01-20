import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images.js';
import { createParticlesText } from '/js/myTexts';


let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, cube, imgOne, imgTwo, texts, intersects;

let INTERSECTED ;
let mixer =[]
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(1,1);



function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );

  //cube = createMeshes( scene );

  texts = createParticlesText ( scene, 'ola que tal ');
  console.log( texts )
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

    if( array[x].index == value ){

      return true ;
    }

    
  }
}

function update() {
  stats.update();

  raycaster.setFromCamera( mouse, camera );
  //raycaster.params.Points.threshold = .05;

  var geometry = texts.geometry;
  var attributes = geometry.attributes;

  intersects = raycaster.intersectObject( texts );

  if ( intersects.length > 0 ) {


      const{ x,y } = intersects[ 0 ].point;

      const pos = texts.geometry.attributes.position;

      for (var i = 0, l = pos.count; i < l; i++) {

          const mouseDistance = distance( x, y, pos.getX(i), pos.getY(i) );

          if( mouseDistance < 200 ){

            var obj = {

              id: intersects[ 0 ].index,
              time: 0 ,
              step: 0.02,
              initPosi: intersects[ 0 ].point ,
              cont: 0,

            }
            //console.log( obj )

            mixer.push( obj )

          }

      }


  }


  mixer.forEach( ( obj,i ) => {

    const pos = texts.geometry.attributes.position;
    const theX = interpolation ( obj.initPosi.x ,  20 , obj.time );

    pos.setX( obj.id, theX );
    pos.needsUpdate = true;

    obj.time += obj.step;
    if (obj.time <= 0 || obj.time >=1){
      
      obj.cont+=1
      if( obj.cont == 2){
        //console.log('in 2')
        pos.setXYZ( obj.id, obj.initPosi.x, obj.initPosi.y, obj.initPosi.z );
        pos.needsUpdate = true;
        delete mixer[i]
      }
      obj.step = -obj.step;
    }





  });




    //console.log( obj )





/*
  if ( intersects.length > 0 ) {





      const{ x,y } = intersects[ 0 ].point;

      const pos = texts.geometry.attributes.position;

      for (var i = 0, l = pos.count; i < l; i++) {

          const mouseDistance = distance( x, y, pos.getX(i), pos.getY(i) );

          if( mouseDistance < 200 ){

            var obj = {

              id: intersects[ 0 ].index,
              time: 0 ,
              step: 0.02,
              initPosi: intersects[ 0 ].point ,
              cont: 0,

            }

            mixer.push( obj )

          }

      }


  }


  mixer.forEach( ( obj,i ) => {



    const pos = texts.geometry.attributes.position;
    const theX = interpolation ( obj.initPosi.x ,  20 , obj.time );

    pos.setX( obj.id, theX );
    pos.needsUpdate = true;

    obj.time += obj.step;
    if (obj.time <= 0 || obj.time >=1){
      
      obj.cont+=1
      if( obj.cont == 2){
        console.log('in 2')
        pos.setXYZ( obj.id, obj.initPosi.x, obj.initPosi.y, obj.initPosi.z );
        pos.needsUpdate = true;
        delete mixer[i]
      }
      obj.step = -obj.step;
    }





  });

  mixer.forEach( ( element, o ) => {

    const pos = texts.geometry.attributes.position;
    const theX = interpolation ( pos.getX(element),  10 , time[o] );

    pos.setX( element, theX );
    pos.needsUpdate = true;

    time[o] += steps[o];
    if (time[o] <= 0 || time[o] >=1){
      steps[o] = -steps[o];
    }
    
  });


      const pos = texts.geometry.attributes.position;
      for (var i = 0, l = pos.count; i < l; i++) {

          const mouseDistance = distance( x, y, pos.getX(i), pos.getY(i) );
          //console.log ( 'distance : ',i,INTERSECTED,  mouseDistance )

          if( mouseDistance < 10 ){

            mixer.push( intersects[0] );
            //const theX = interpolation ( pos.getX(i), pos.getX(i) + 3 , time );
          
            pos.setX( i,  time  );
            pos.needsUpdate = true;


          }

      }
      */
}




        
        



      //mixer.push( intersects[0] );
      //startTime.push( performance.now() )


  

/*
  const pos = texts.geometry.attributes.position;
  console.log( pos)

  for (var i = 0, l = pos.count; i < l; i++) {

    const mouseDistance = distance( check.x, check.y,0,0  );




  }*/


  


  /*

  for ( let  x = 0; x < mixer.length; x ++ ) {

    const time = (( .001 * ( performance.now()- startTime[x] )) % 2)/2;
    const theX = interpolation ( mixer[x].point.x, mixer[x].point.x + 3 , time );
    const theY = interpolation ( mixer[x].point.y, mixer[x].point.y + 3 ,  time );
    const theZ = interpolation ( mixer[x].point.z, mixer[x].point.z + 3 ,  time );

    const pos = mixer[x].object.geometry.attributes.position;
    var vec3 = new THREE.Vector3();

    vec3.x = theX;
    vec3.y = theY;
    vec3.z = theZ;
    pos.setXYZ( mixer[x].index, vec3.x, vec3.y, vec3.z );
    pos.needsUpdate = true;

    if ( time >= 0.98){

       pos.setXYZ( mixer[x].index, mixer[x].point.x, mixer[x].point.y, mixer[x].point.z );
       pos.needsUpdate = true;
       console.log( 'stop', mixer[x].point, scene )

       mixer.splice( x ,1);
       startTime.splice( x ,1);


    }; 

  }
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