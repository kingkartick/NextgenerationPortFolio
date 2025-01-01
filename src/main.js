

import sketch from "./threed.js";
document.body.style.overflowX = "hidden";






function simulateLoading() {
  let progress = 0;
  const progressBar = document.querySelector('.loader-progress');
  const percentageText = document.querySelector('.loader-percentage');
  const preloader = document.getElementById('preloader');
  const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) progress = 100;
      progressBar.style.width = `${progress}%`;
      percentageText.textContent = `${Math.round(progress)}%`;
      if (progress === 100) {
          clearInterval(interval);
          setTimeout(() => {
              preloader.style.transform = 'translateY(-100%)';
              setTimeout(() => {
                  preloader.style.display = 'none';
                  document.getElementById('content').style.display = 'block';
              }, 500);
          }, 500);
      }
  }, 200);
}

window.addEventListener('load', simulateLoading);



// Initialize LocomotiveScroll
const scroll2 = new LocomotiveScroll({
  el: document.querySelector('.smooth-scroll'),
  smooth: true,
  multiplier: 0.5,  // Reduce scrolling speed
  lerp: 0.08,       // Adjust the lerp (Linear Interpolation) value
  smartphone: {
    smooth: true,
    multiplier: 0.8, // Specific multiplier for mobile
    lerp: 0.1        // Slightly higher lerp for mobile
  },
  tablet: {
    smooth: true,
    multiplier: 0.7,
    lerp: 0.1
  },
  getDirection: true,
  getSpeed: true
});

// Use the Locomotive Scroll instance's 'scroll' event
scroll2.on('scroll', (instance) => {
  const currentScrollPosition = instance.scroll.y;

  // Example: Trigger animations based on scroll position
  for (let i = 0; i < carsul.length; i++) {
    transform(carsul[i], currentScrollPosition);
  }

  // Update ScrollTrigger on every scroll

});





let mysketch = new sketch();







function moveCamera(currentScrollPosition) {
  
  const t = currentScrollPosition*-1;

  console.log('this is value of t ' , t);
 
  




  if ((t < -2204.5 && t > -3880.34)) {

    // mysketch.pecockmesh.rotation.z = 0;
    // mysketch.pecockmesh.position.x = -22;
    // mysketch.pecockmesh.position.y = 0;
    // mysketch.pecockmesh.position.z = 1;
    // mysketch.mymaterial.uniforms.uTexture.value = mysketch.pslidetextures[1];
    mysketch.camera.position.z = 56.05;
    mysketch.camera.position.x=0.2567569580078125;
    mysketch.camera.rotation.y=0.2567569580078125;   

  }

  else{
    ///  There is some problem here i dont know what it is 
    if (t < -4589 && t > -4679){

      // mysketch.mymaterial.uniforms.uTexture.value = mysketch.pslidetextures[1];

    }
    
    if((t < -4789 && t > -4984.5)){

      // mysketch.mymaterial.uniforms.uTexture.value = mysketch.pslidetextures[2];

    }

    if((t < -4789)){
      // mysketch.pecockmesh.rotation.z += 0.01;
      mysketch.camera.position.z = 92.663;
      mysketch.camera.position.x=0.4877;
      mysketch.camera.rotation.y=0.2567569580078125;
      mysketch.vscrollact = true ;
      mysketch.position = (t /1000 + 5) % 5;
      mysketch.speed = t /170000 ;
    }
    else{
      mysketch.camera.position.z = t * -0.019;
      mysketch.camera.position.x = t * -0.0001;
      mysketch.camera.rotation.y = t * -0.0001;
    }
  }
}

const carsul = [...document.querySelectorAll('.carousel')]





function transform (section,currentScrollPosition){
  
    const offsetTop = section.parentElement.offsetTop;
    console.log( "The curent pos in trans " , currentScrollPosition)
   
    const scrollsection =  section.querySelector('.mediaScroller')
    console.log("Windows inner height", window.innerHeight)
    let percentage = ((currentScrollPosition-offsetTop)/window.innerHeight)*100;
    console.log("curentpercent",percentage)
 
    percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;
    
    scrollsection.style.transform = `translate3d(${-(percentage)}vw,0,0)`
    
    if (percentage > 0 && percentage < 110) {

      console.log('I am inside the elem',percentage)
      const width1 = window.innerWidth;
    //   let videotextures = [...document.querySelectorAll('.videos')];
      let videos = mysketch.videotextures
    

          // Assuming you have a valid `percentage` value
          let P = (0 < percentage && percentage < 30) ? 0 : ((30 <= percentage && percentage < 60) ? 1 : ((60 <= percentage && percentage < 100) ? 2 : ((100 <= percentage && percentage < 120) ? 3 : 3)));

      if (P === 0) {
        videos[0].play();
        videos[1].pause();
        videos[2].pause()
      } else if (P === 1) {
        videos[0].pause();
        videos[1].play();
        videos[2].pause();
      } else if (P === 2) {
        // Handle the case where P is 2 (or any other value)
        // You might want to pause both videos or implement a different logic
        videos[0].pause();
        videos[1].pause();
        videos[2].play();
        
      }
      else if (P == 3 ){
        videos[0].pause();
        videos[1].pause();
        videos[2].pause();
        

      }

      mysketch.meshes.forEach((mesh, i) => {
        // Update the position by 10 units
      
        mesh.position.y = i * 1.2 - (percentage)*0.029;

        let odistance = Math.min(Math.abs((P) -i));
        odistance = 1 - odistance **3;
          
       if (width1 < 500 ) {
        // let scale = 0.4 + 0.3*odistance; 
        // mesh.scale.set(scale,scale,scale)
        
       }else{
        let scale = 1 + 0.3*odistance; 
        mesh.scale.set(scale,scale,scale)

       }

        mesh.material.uniforms.distancefromcent.value = odistance;
        console.log("this is odddistance",odistance)
      });


      
  }else{
    document.body.onscroll = moveCamera;
    moveCamera(currentScrollPosition);
  }

  mysketch.updateTexture();
  

  mysketch.copytxtgroup.children.forEach((mesh, i) => {
  // console.log('hello i am textgrop mesh',mesh);
  mesh.material.uniforms.ustroke.value = true;
  });
}
















