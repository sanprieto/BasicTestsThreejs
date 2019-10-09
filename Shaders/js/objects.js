import * as THREE from 'three';

function createMaterials(u) {


  var shaderMaterial = new THREE.ShaderMaterial({

    uniforms: u,

    vertexShader: document.getElementById( 'vertexShader' ).textContent,

    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });

  return shaderMaterial;

}

function createGeometries() {

  var radius = 50, segments = 128, rings = 64;

  const geometry = new THREE.SphereBufferGeometry( radius, segments, rings );

  displacement = new Float32Array( geometry.attributes.position.count );
  noise = new Float32Array( geometry.attributes.position.count );

  for ( var i = 0; i < displacement.length; i ++ ) {
    noise[ i ] = Math.random() * 5;
  }

  geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 1 ) );

  return geometry;
}

function createMeshes( scene, u, g ) {

  const materials = createMaterials(u);
  //const geometries = createGeometries();

  const obj = new THREE.Mesh( g, materials );
  scene.add( obj );


  return obj;

}

export { createMeshes };