import * as THREE from 'three';
import Stats from 'stats.js';


export default class Environment {

  constructor( imgs ){ 

    this.imgs = imgs

    this.stats = new Stats();
    document.body.appendChild( this.stats.dom );

    this.container = document.querySelector( '#magic' );
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color( 0xc1fbff )
    this.createCamera();
    this.createRenderer();

    this.setup()
    this.bindEvents();
  }

  bindEvents(){

    window.addEventListener( 'resize', this.onWindowResize.bind( this ) );
    

  }

  setup(){

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, map: this.imgs[0]} );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );
   

  }

  render() {

     this.stats.update();
     this.cube.rotation.x += .009

     this.renderer.render( this.scene, this.camera )
  }

  createCamera() {


    this.camera = new THREE.PerspectiveCamera( 65, this.container.clientWidth / this.container.clientHeight, 1, 10000 );
    this.camera.position.set( 0,0, 10 );
  }

  createRenderer() {

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, preserveDrawingBuffer: true } );
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );



    //this.renderer.setPixelRatio( window.devicePixelRatio );

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild( this.renderer.domElement );

    this.renderer.setAnimationLoop(() => { this.render() })

  }

  onWindowResize(){

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );


  }

}


