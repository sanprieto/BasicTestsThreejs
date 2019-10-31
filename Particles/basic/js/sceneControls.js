import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';


function createOrbitControls( cam, container ) { 

  const controls = new OrbitControls( cam, container );

}

export { createOrbitControls };