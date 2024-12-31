
import { lerp } from "three/src/math/MathUtils.js";
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

gsap.registerPlugin(ScrollTrigger);

const scroll2 = new LocomotiveScroll({
  el: document.querySelector('.smooth-scroll'),
  smooth: true,
  multiplier: 0.5,  // Reduce scrolling speed
  lerp: 0.08,       // Adjust the lerp (Linear Interpolation) value
  smartphone: {
    smooth: true,
    multiplier: 0.05, // Specific multiplier for mobile
    lerp: 0.11       // Slightly higher lerp for mobile
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
scroll2.on('scroll',  (instance) => {
 

  const currentScrollPosition = instance.scroll.y;
 

  for (let i = 0; i < carsul.length; i++) {
    // Use the distanceFromTop value to trigger your animation
    transform(carsul[i],currentScrollPosition);
  }
},ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? scroll2.scrollTo(value, {duration: 0, disableLerp: true}) : scroll2.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => scroll2.update());
ScrollTrigger.defaults({ scroller: ".smooth-scroll" });
// --- SETUP END ---

let mysketch = new sketch();




// const pecockmeshpos =  mysketch.pecockmesh.position;
// const pecockmeshrotz =  mysketch.pecockmesh.position.x;
// const pecockmeshtxt  = mysketch.mymaterial.uniforms.uTexture.value;
// const pecockmeshprog  =  mysketch.mymaterial.uniforms.uProgress.value;



function setupScrollanimation(){
  // const tl = gsap.timeline()
  // // FIRST SECTION

  // tl.to(pecockmeshpos, {
  //   x: 1,
  //   y: 0,
  //   z: 12,
  //   scrollTrigger: {
  //     trigger: ".animapoint1",
  //     start: "top top ",
  //     end: "top bottom",
  //     scrub: true,
  //     immediateRender: false,
  //     // Start uProgress animation when this animation ends
  //     onLeave: () => {tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //       value: 1
  //     }, {
  //       value: 0,
  //       duration: 1.5
  //     }), console.log(" i am in  .animapoint1")}
  //   ,
  //   onEnterBack: () => {tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //     value: 0
  //   }, {
  //     value: 1,
  //     duration: 1.5
  //   }), console.log(" i am in  .animapoint1")}

  // }
    
  // });

  // tl
  // .to(pecockmeshpos, {x:  -22, y:  0, z: 1,
  //     scrollTrigger: {
  //         trigger: ".animapoint2",
  //         start:" top bottom",
  //          scrub: true,
  //         immediateRender: false,
  //         onEnter: () => {tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //           value: 0
  //         }, {
  //           value: 1,
  //           duration: 1
  //         }), console.log(" i am in  .animapoint2")},
        
  //         onEnterBack: () => {tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //           value: 0
  //         }, {
  //           value: 1,
  //           duration: 1.5
  //         }), console.log(" i am in  .animapoint2")},
  //         onLeave: () => {tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //           value: 1
  //         }, {
  //           value: 0,
  //           duration: 1.5
  //         }), console.log(" i am in  .animapoint1")}
    
               
  // }});


  // tl
  // .to(pecockmeshpos, {x:  -18, y:  0, z: 0.19 ,
  //     scrollTrigger: {
  //         trigger: ".animapoint3",
  //         start:"top bottom",
  //         end: "top top", scrub: true,
  //         immediateRender: false, 
  //         onLeave: () => tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //           value: 1
  //         }, {
  //           value: 0,
  //           duration: 1.5
  //         }),
  //         onLeaveBack: () => {tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //           value: 0
  //         }, {
  //           value: 1,
  //           duration: 1.5
  //         }), console.log(" i am in  .animapoint2")}
  // }});


  // tl
  // .to(pecockmeshpos, {x:  -88, y:  0, z: 0.19 ,
  //     scrollTrigger: {
  //         trigger: ".animapoint4",
  //         start:"top bottom",
  //         end: "top top", scrub: true,
  //         immediateRender: false,
  //         onLeave: () => tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //           value: 0
  //         }, {
  //           value: 1,
  //           duration: 1.5
  //         }),
  //         onEnterBack: () => {tl.fromTo(mysketch.mymaterial.uniforms.uProgress, {
  //           value: 1
  //         }, {
  //           value: 0,
  //           duration: 1.5
  //         }), console.log(" i am in  .animapoint2")}
          
  // }});

}


setupScrollanimation()



function moveCamera(currentScrollPosition) {
  
  const t = currentScrollPosition*-1;

  console.log('this is value of t ' , t);
 
  
  if (( t <-1 && t >  -2000.5 )) {
    // mysketch.pecockmesh.rotation.z += 0.01;

  }
  if (( t <-1234 && t > -1934.5 )) {
   
    // console.log(mysketch.pecockmesh.position)
    // mysketch.pecockmesh.position.x = 2;
    // mysketch.pecockmesh.position.y = 0;
    // mysketch.pecockmesh.position.z = 0.09;
  }
  if (t < -543.00947867298578 && t > -2000.5){
    

    // mysketch.mymaterial.uniforms.uTexture.value = mysketch.pslidetextures[0];

  }
  // if (t < -1934.5 && t > -2000.5){
  //   mysketch.cube.material.color.set('#999D9E')

  //   // mysketch.mymaterial.uniforms.uTexture.value = mysketch.pslidetextures[0];

  // }

  if (t < -2034.5 && t > -2100.5){

    // mysketch.mymaterial.uniforms.uTexture.value = mysketch.pslidetextures[0];
    
  }

  if ((t < -2234.5 && t > -3880.34)) {

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
















