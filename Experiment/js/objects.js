import * as THREE from 'three';

function createMaterials(  ) {

  const mat = new THREE.MeshPhongMaterial( {
    map: img,
    side:THREE.DoubleSide

  } );

  mat.color.convertSRGBToLinear();

  return mat;

}



function createMeshes( scene, img ) {
  //const materials = createMaterials(img);
  const geometries = new THREE.SphereGeometry( .5, 32, 32 );
  const obj = new THREE.Mesh( geometries, new THREE.MeshPhongMaterial( {color: 0xffff00} ) );
  // obj.castShadow = true;
  // obj.receiveShadow = true;
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
  const color = new THREE.Color( 0x6699FF );

  color.convertSRGBToLinear();

  const material = new THREE.MeshPhongMaterial( {color: color , side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = THREE.Math.degToRad(90);
  plane.position.y = -.8;
  plane.receiveShadow = true;

  scene.add( plane );

}


export { createMeshes , createGridHelp };