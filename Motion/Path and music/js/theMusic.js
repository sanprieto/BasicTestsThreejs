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
	  sound.play();
	});

	// create an AudioAnalyser, passing in the sound and desired fftSize
	let analyser = new THREE.AudioAnalyser( sound, 256 );
	
	
	analyser.analyser.maxDecibels = -30; // -30
	analyser.analyser.minDecibels = -100; // -100
	

	// get the average frequency of the sound
	var data = analyser.getFrequencyData();
	console.log( 'data', data );

	return analyser;


}

export { createMusic };