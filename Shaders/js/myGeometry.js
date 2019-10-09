import * as THREE from 'three';

function myGeometry( geometry ){

			  
			  geometry.faces.push(new THREE.Face3(0, 1, 2));
			  geometry.faces.push(new THREE.Face3(0, 2, 3));

			  geometry.faces.push(new THREE.Face3(1, 2, 6));
			  geometry.faces.push(new THREE.Face3(6, 2, 5));

			  geometry.faces.push(new THREE.Face3(0, 3, 7));
			  geometry.faces.push(new THREE.Face3(7, 3, 4));

			  geometry.faces.push(new THREE.Face3(6, 5, 8));
			  geometry.faces.push(new THREE.Face3(8, 5, 9));

			  geometry.faces.push(new THREE.Face3(6, 8, 10));
			  geometry.faces.push(new THREE.Face3(6, 10, 1));
			  geometry.faces.push(new THREE.Face3(10, 1, 0));
			  geometry.faces.push(new THREE.Face3(10, 7, 0));

			  geometry.faces.push(new THREE.Face3(9, 11, 5));
			  geometry.faces.push(new THREE.Face3(11, 5, 2));
			  geometry.faces.push(new THREE.Face3(11, 2, 3));
			  geometry.faces.push(new THREE.Face3(11, 3, 4));

			  geometry.faces.push(new THREE.Face3(8, 10, 11));
			  geometry.faces.push(new THREE.Face3(8, 11, 9));

			  geometry.faces.push(new THREE.Face3(10, 11, 7));
			  geometry.faces.push(new THREE.Face3(7, 11, 4));


			  geometry.vertices.push(new THREE.Vector3( 0, 0, 0)); // v0
			  geometry.vertices.push(new THREE.Vector3( 0, 1, 0)); // v100
			  geometry.vertices.push(new THREE.Vector3( 1, 1, 0)); // v2
			  geometry.vertices.push(new THREE.Vector3( 1, 0, 0)); // v3

			  geometry.vertices.push(new THREE.Vector3( 1, 0, 1)); // v4
			  geometry.vertices.push(new THREE.Vector3( 1, 1, 1)); // v5
			  geometry.vertices.push(new THREE.Vector3( 0, 1, 1)); // v6
			  geometry.vertices.push(new THREE.Vector3( 0, 0, 1)); // v7

			  geometry.vertices.push(new THREE.Vector3( 0, 0.2, 1)); // v8
			  geometry.vertices.push(new THREE.Vector3( 1, 0.2, 1)); // v9
			  geometry.vertices.push(new THREE.Vector3( 0, 0.2, 0.8)); // v1000
			  geometry.vertices.push(new THREE.Vector3( 1, 0.2, 0.8)); // v1000
			  geometry.mergeVertices();
			  //geometry.computeVertexNormals();
			  geometry.computeFaceNormals ();

			  return geometry
			  
}

export default myGeometry