import * as THREE from 'three';

function createLights( scene ) {

	const ambientLight = new THREE.HemisphereLight( 0xD3E7FC, 0x0f0e0d, .5 );

	const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.castShadow = true; 

	dirLight.shadow.mapSize.width = 4096;
	dirLight.shadow.mapSize.height = 4096;

	dirLight.position.set( 200, 350, 100);

	dirLight.position.set( 1, 1.75, 1 );
	dirLight.position.multiplyScalar( 300 );

	const d = 20;
	dirLight.shadow.camera.left = - d;
	dirLight.shadow.camera.right = d;
	dirLight.shadow.camera.top = d;
	dirLight.shadow.camera.bottom = - d;
	dirLight.shadow.camera.far = 3500;
	dirLight.shadow.bias = - 0.0001;

	scene.add( dirLight );

	var helper = new THREE.CameraHelper( dirLight.shadow.camera );
	scene.add( helper )
}

export { createLights };

