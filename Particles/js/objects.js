import * as THREE from 'three';

let objects = [];

function createMaterials() {

 const starsMaterial = new THREE.PointsMaterial( { color: 0x000000 , size: .05, transparent: true, alphaTest: .1 } );
 return starsMaterial;

}

function createGeometries() {

  const starsGeometry = new THREE.BufferGeometry();
  var positions = [];

  for ( let i = 0; i < 100000; i ++ ) {

    let star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( 60 );
    star.y = THREE.Math.randFloatSpread( 60 );
    star.z = THREE.Math.randFloatSpread( 60 );

    positions.push( star.x, star.y, star.z );

  }
  starsGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  starsGeometry.computeBoundingSphere();

  return starsGeometry;

}

function createMeshes( scene ) {


   for (let i = 0; i < 3; i++) {

    const materials = createMaterials();
    const geometries = createGeometries();

    const obj = new THREE.Points( geometries, materials );
    scene.add( obj );
    objects.push(obj)

   }


  return objects;

}

export { createMeshes };