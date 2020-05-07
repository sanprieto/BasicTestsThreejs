import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images';
import { customGeo } from '/js/myLogo';


const preload = () => {

  let manager = new THREE.LoadingManager();
  manager.onLoad = function ( ) {
    init( imgs );
  };
  let imgs = [];
  const loader = new THREE.TextureLoader(manager).load( require('/img/uv_grid_directx.jpg'), function ( texture ) {
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

  let stats = new Stats();
  document.body.appendChild( stats.dom );

  const container = document.querySelector( '#magic' );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  const camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  // createGridHelp( scene );

  // let cube = createMeshes( scene, imgs[0] );


  // var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors } );
  // var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors } );

  const fragmentShader = `
  #include <common>

    uniform vec3 iResolution;
    uniform float iTime;

    //********                ***********

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 p=(2.0*fragCoord.xy-iResolution.xy)/max(iResolution.x,iResolution.y);
      for(int i=1;i<10;i++)
      {
        vec2 newp=p;
        newp.x+=0.3/float(i)*sin(float(i)*p.y+iTime+0.3*float(i))+1.0;
        newp.y+=0.3/float(i)*sin(float(i)*p.x+iTime+0.3*float(i+10))-1.4;
        p=newp;
      }
      vec3 col=vec3(0.2,0.6-(sin(p.y)),sin(p.x+p.y));
      fragColor=vec4(col, 0.5);
    }

        //*********                **********

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution:  { value: new THREE.Vector3(1, 1, 1) },
    };

    let materialX = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms,
    });

    let materialTexture = new THREE.MeshBasicMaterial( {
      map: imgs[0],
      color: 0x6699FF
     } );

  var material = new THREE.MeshPhongMaterial( { color: 0x6699FF }  );
  var logo = new THREE.Mesh( customGeo(), materialTexture );
  scene.add( logo );
  console.log( logo )



  // createImg( scene,0,-4,-11, imgs[1], .2);

  const renderer = createRenderer( container );
  window.addEventListener( 'resize', onWindowResize );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

  function update() {
    stats.update();
    // logo.rotation.x += 0.005;
    // logo.rotation.y += 0.005;

    const time = 0.001 * performance.now();
    uniforms.iResolution.value.set( container.clientWidth, container.clientHeight, 1);
    uniforms.iTime.value = time;

  }

  function render() {

    renderer.render( scene, camera );

  }

  function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );

  }
}


