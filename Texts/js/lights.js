import * as THREE from 'three';

function createLights( scene ) {

  const ambientLight = new THREE.HemisphereLight( 0xD3E7FC, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 0, 0, -10 );

  scene.add( ambientLight, mainLight );

}

export { createLights };

