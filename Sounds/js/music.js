import * as THREE from 'three';


function createMusic ( camera, data ){console.log('createMusic')



	// create an AudioListener and add it to the camera
	let listener = new THREE.AudioListener();
	camera.add( listener );

	// create an Audio source
	let sound = new THREE.Audio( listener );

	// load a sound and set it as the Audio object's buffer
	let audioLoader = new THREE.AudioLoader();

	audioLoader.load( '/music/bensound-anewbeginning.mp3', function( buffer ) {

		/*
		sound.setBuffer( buffer );
		sound.setLoop(true);
		sound.setVolume(0.5);
		sound.play();
		
	});


	/*

	// create an AudioAnalyser, passing in the sound and desired fftSize
	let analyser = new THREE.AudioAnalyser( sound, 32 );

	// get the average frequency of the sound
	data = analyser.getAverageFrequency();

	console.log( sound, 'sound ');

	//return sound;
	*/


} 

export { createMusic };