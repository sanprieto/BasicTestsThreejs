import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';
import { createImg } from '/js/images';
import { customGeo } from '/js/myLogo';
import { SubdivisionModifier } from '/node_modules/three/examples/jsm/modifiers/SubdivisionModifier.js';

console.log( SubdivisionModifier )

const noise = new SimplexNoise();

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
  scene.background = new THREE.Color( 0x000000 );

  const camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  // createGridHelp( scene );

  const materialTexture = new THREE.MeshBasicMaterial( {
    map: imgs[0],
    color: 0x6699FF
   } );

  const logo = new THREE.Mesh( customGeo(), materialTexture );
  scene.add( logo );
  logo.position.x = -2;


  // var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors } );
  // var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors } );

  const vertexShader = `

    varying vec2 vUv;

    void main()
    {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }

  `;

  const fragmentShader = `
  #include <common>

    uniform vec3 iResolution;
    uniform float iTime;
    varying vec2 vUv;

    //********                ***********

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        float time=iTime*1.0;
        vec2 uv = ((fragCoord.xy / iResolution.xx-0.5)*8.0)* vUv;
          vec2 uv0=uv;
        float i0=1.0;
        float i1=1.0;
        float i2=1.0;
        float i4=0.0;
        for(int s=0;s<7;s++)
        {
          vec2 r;
          r=vec2(cos(uv.y*i0-i4+time/i1),sin(uv.x*i0-i4+time/i1))/i2;
              r+=vec2(-r.y,r.x)*0.3;
          uv.xy+=r;
              
          i0*=1.93;
          i1*=1.15;
          i2*=1.7;
          i4+=0.05+0.1*time*i1;
        }
          float r=sin(uv.x-time)*0.5+0.5;
          float b=sin(uv.y+time)*0.5+0.5;
          float g=sin((uv.x+uv.y+sin(time*0.5))*0.5)*0.5+0.5;
        fragColor = vec4(r,g,b,1.0);
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
      vertexShader,
      uniforms,
    });

    const logo2 = new THREE.Mesh( customGeo(), materialX );
    scene.add( logo2 );
    logo2.position.x = 2;







  // createImg( scene,0,-4,-11, imgs[1], .2);

  const renderer = createRenderer( container );
  window.addEventListener( 'resize', onWindowResize );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

  function update() {
    stats.update();
    logo.rotation.x += 0.005;
    logo.rotation.y += 0.005;
    logo2.rotation.x -= 0.005;
    logo2.rotation.y -= 0.005;

    // makeRoughBall( logo2 );

    const time = 0.001 * performance.now();
    uniforms.iResolution.value.set( container.clientWidth, container.clientHeight, 1);
    uniforms.iTime.value = time;

  }

  function render() {

    renderer.render( scene, camera );

  }
  function makeRoughBall(mesh) {
      mesh.geometry.vertices.forEach(function(vertex, i) {
          let offset = 1;
          let amp = .05;
          let time = Date.now();
          vertex.normalize();
          let distance = offset + noise.noise3D(
              vertex.x + time * 0.0007,
              vertex.y + time * 0.0008,
              vertex.z + time * 0.0009
          ) * amp;
          vertex.multiplyScalar(distance);
      })
      mesh.geometry.verticesNeedUpdate = true;
      mesh.geometry.normalsNeedUpdate = true;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeFaceNormals();
  }

  function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );

  }
}


