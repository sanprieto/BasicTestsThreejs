import * as THREE from 'three';

let objects = [];

function createParticles( scene, img, amount, x, y, z, h,s,l, mySize ) {

  const positions = new Float32Array( amount * 3 );
  const colors = new Float32Array( amount * 3 );
  const sizes = new Float32Array( amount );
  const vertex = new THREE.Vector3();
  const color = new THREE.Color( 0xffffff );

  for ( var i = 0; i < amount; i ++ ) {

    vertex.x = THREE.Math.randFloatSpread( x );
    vertex.y = THREE.Math.randFloatSpread( y );
    vertex.z = THREE.Math.randFloatSpread( z );

    vertex.toArray( positions, i * 3 );
    color.setHSL( h, s, l );
    color.toArray( colors, i * 3 );
    sizes[ i ] = mySize;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
  geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

  const material = new THREE.ShaderMaterial( {
    uniforms: {
      color: { value: new THREE.Color( 0xffffff ) },
      pointTexture: { value: img }
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
  } );

  const mesh = new THREE.Points( geometry, material );

  scene.add(mesh)

  objects.push(mesh)

  return objects;
}

export { createParticles };