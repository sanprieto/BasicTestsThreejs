import * as THREE from 'three';

function createMaterials() {

  const mat = new THREE.MeshPhongMaterial( {
    color: 0x6699FF,
    side:THREE.DoubleSide

  } );

  mat.color.convertSRGBToLinear();

  return mat;

}

function createGeometries() {

  const box = new THREE.BoxBufferGeometry( );

  return box;
}

function createMeshes( scene ) {

  const materials = createMaterials();
  const geometries = createGeometries();
  const obj = new THREE.Mesh( geometries, materials );
  obj.castShadow = true;
  obj.receiveShadow = true;
  scene.add( obj );

  return obj;

}

function createGridHelp( scene ){

  const size = 60;
  const divisions = 60;

  const gridHelper = new THREE.GridHelper( size, divisions, 0xFFFFFF, 0xa7c1f6);
  scene.add( gridHelper );

  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );

  const geometry = new THREE.PlaneGeometry( 860, 860, 32 );
  const material = new THREE.MeshPhongMaterial( {color: 0x6699FF, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = THREE.Math.degToRad(-90);
  plane.position.y = -.8;
  plane.receiveShadow = true;

  scene.add( plane );

  return plane;

}


export { createMeshes , createGridHelp };