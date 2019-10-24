import * as THREE from 'three';

function createMusic( camera, urlData ){

	// create an AudioListener and add it to the camera
	var listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	var sound = new THREE.Audio( listener );

	// load a sound and set it as the Audio object's buffer
 	var audioLoader = new THREE.AudioLoader();

	audioLoader.load( urlData, function( buffer ) {
	  sound.setBuffer( buffer );
	  sound.setLoop( true );
	  sound.setVolume( 0.5 );
	  //sound.play();
	});

	// create an AudioAnalyser, passing in the sound and desired fftSize
	let analyser = new THREE.AudioAnalyser( sound, 128 );
	
	analyser.smoothingTimeConstant = 1;

	return { analyser, sound } ;


}

export { createMusic };