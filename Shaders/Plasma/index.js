import * as THREE from 'three';
import '/css/main.css';
import { createCamera, createRenderer } from '/js/basicComponents';
import { createOrbitControls } from '/js/sceneControls';
import { createLights } from '/js/lights';
import { createMeshes, createGridHelp } from '/js/objects';
import Stats from 'stats.js';

const urlData = require('./textures/bayer.png');

let stats = new Stats();
document.body.appendChild( stats.dom );

let camera, container, renderer, scene, plane, cube, uniforms, materialX, fragmentShader, vertexShader;

function init() {

  container = document.querySelector( '#magic' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = createCamera( container );
  createOrbitControls( camera, container );
  createLights( scene );
  //createGridHelp( scene );

  const loader = new THREE.TextureLoader();
  const texture = loader.load( urlData );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;


  // var geometry = new THREE.PlaneGeometry( 30,20,1,1);

  fragmentShader = `
  #include <common>

    uniform vec3 iResolution;
    uniform float iTime;

    //********                ***********

    #define RM_FACTOR   0.9
    #define RM_ITERS     90

    float plasma(vec3 r) {
      float mx = r.x + iTime / 0.130;
      mx += 20.0 * sin((r.y + mx) / 20.0 + iTime / 0.810);
      float my = r.y - iTime / 0.200;
      my += 30.0 * cos(r.x / 23.0 + iTime / 0.710);
      return r.z - (sin(mx / 7.0) * 2.25 + sin(my / 3.0) * 2.25 + 5.5);
    }

    float scene(vec3 r) {
      return plasma(r);
    }

    float raymarch(vec3 pos, vec3 dir) {
      float dist = 0.0;
      float dscene;

      for (int i = 0; i < RM_ITERS; i++) {
        dscene = scene(pos + dist * dir);
        if (abs(dscene) < 0.1)
          break;
        dist += RM_FACTOR * dscene;
      }

      return dist;
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      float c, s;
      float vfov = 3.14159 / 2.3;

      vec3 cam = vec3(0.0, 0.0, 30.0);

      vec2 uv = (fragCoord.xy / iResolution.xy) - 0.5;
      uv.x *= iResolution.x / iResolution.y;
      uv.y *= -1.0;

      vec3 dir = vec3(0.0, 0.0, -1.0);

      float xrot = vfov * length(uv);

      c = cos(xrot);
      s = sin(xrot);
      dir = mat3(1.0, 0.0, 0.0,
                 0.0,   c,  -s,
                 0.0,   s,   c) * dir;

      c = normalize(uv).x;
      s = normalize(uv).y;
      dir = mat3(  c,  -s, 0.0,
                   s,   c, 0.0,
                 0.0, 0.0, 1.0) * dir;

      c = cos(0.7);
      s = sin(0.7);
      dir = mat3(  c, 0.0,   s,
                 0.0, 1.0, 0.0,
                  -s, 0.0,   c) * dir;

      float dist = raymarch(cam, dir);
      vec3 pos = cam + dist * dir;

      fragColor.rgb = mix(
        vec3(0.4, 0.8, 1.0),
        mix(
          vec3(0.0, 0.0, 1.0),
          vec3(1.0, 1.0, 1.0),
          pos.z / 10.0
        ),
        1.0 / (dist / 20.0)
      );
    }

    //*********                **********

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `;


vertexShader = `
  void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
  `;


    uniforms = {
      iTime: { value: 0 },
      iResolution:  { value: new THREE.Vector3(1, 1, 1) },

    };
    materialX = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      lights: false,
      flatShading: true,
      // blending: THREE.AdditiveBlending,
      // depthTest: false,
      // transparent: true

    });


  var material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
  var geometry = new THREE.BoxGeometry( 10,10,10);
  cube = new THREE.Mesh( geometry, materialX );
  scene.add( cube );

  renderer = createRenderer( container );

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function update() {

  const time = 0.001 * performance.now();
  stats.update();
  uniforms.iResolution.value.set( container.clientWidth, container.clientHeight, 1);
  uniforms.iTime.value = time;

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  // cube.position.x += 0.05;

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

