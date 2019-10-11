import * as THREE from 'three';

let objects = [];

function createMaterials() {

  const logoBlue = new THREE.MeshPhongMaterial( {
    color: 0x6699ff,
    side:THREE.DoubleSide

  } );

  logoBlue.color.convertSRGBToLinear();

  return logoBlue;

}

function createGeometries() {

  const box = new THREE.BoxGeometry(1,10,1, 3,13,3 );

  return box;
}

function createMeshes( scene ) {

  for ( var i = 0; i < 1; i ++ ) {

    const materials = createMaterials();
    const geometries = createGeometries();

    let obj = new THREE.Mesh( geometries, materials );
    /*
    obj.position.x = Math.random() * 40 - 20;
    obj.position.y = Math.random() * 40 - 20;
    obj.position.z = Math.random() * 40 - 20;
    */

    obj.rotation.y = THREE.Math.degToRad( 90 )

    scene.add( obj );
    objects.push(obj)

  }

  return objects;


}

export { createMeshes };