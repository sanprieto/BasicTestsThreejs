import '/css/main.css';
import Environment from '/js/app';
import { TextureLoader, LoadingManager } from 'three';


const preload = () => {

  let manager = new LoadingManager();
  manager.onLoad = function ( ) {

    const environment = new Environment( imgs );

  };

  let imgs = [];
  const loader = new TextureLoader( manager ).load( require('/img/starts.jpg'), function ( texture ) {
   
      imgs[0] = texture;

  } );
  let imgTwo
  const loader2 = new TextureLoader( manager);
  loader2.load( require('/img/brujula.jpg'), function ( texture2 ) {

      imgs[1] = texture2;

  } );
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  preload();

} else {
  document.addEventListener("DOMContentLoaded", preload); 

}

