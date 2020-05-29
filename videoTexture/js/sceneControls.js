import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


function createOrbitControls( cam, container ) { 

  const controls = new OrbitControls( cam, container );

}

export { createOrbitControls };