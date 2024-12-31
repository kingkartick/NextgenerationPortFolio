import * as  THREE from 'three'
import vertexShaderCode from './shaders/vertexShader.js'
import fragmentShaderCode from './shaders/fragmentShader.js'

import vertexShaderCode2 from './shaders/vertex2.js'
import fragmentShaderCode2 from './shaders/fragment2.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertexShaderCode3 from './shaders/vertexShader3.js'
import fragmentShaderCode3 from './shaders/fragmentShader3.js'

import textfra from './shaders/textfragment.js'
import textvert from './shaders/textvertex.js'

import myfont from "./assets/fonta/roboto-regular.json"
import fontpng  from "./assets/fonta/roboto-regular.png"


import { MSDFTextGeometry, MSDFTextMaterial , uniforms } from "three-msdf-text-utils";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';



export default  class sketch{
    constructor(){
        this.renderer = new THREE.WebGLRenderer( {canvas: document.querySelector('#bg') , antialias: true , alpha:true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio
      
        
        
      
        
        this.renderer.autoClear = false;
        // this.renderer.setAnimationLoop( animation );
        this.scene = new THREE.Scene();
        //text scene
        this.copyscene = new THREE.Scene();
        this.txtgroup = new THREE.Group();
        this.copytxtgroup = new THREE.Group();
        this.planegroup = new THREE.Group();
        this.copyscene.add(this.copytxtgroup);

        // this.scene.add(this.txtgroup);
        // this.scene.add(this.planegroup);

        this.textures  = [...document.querySelectorAll('.js-texture')];
        this.textures = this.textures.map (t=>{
            return new THREE.TextureLoader().load(t.src)
        })

        this.slidetextures = [...document.querySelectorAll('.js-texture2')];
        this.slidetextures = this.slidetextures.map (t=>{
            return new THREE.TextureLoader().load(t.src)
        })

        this.pslidetextures = [...document.querySelectorAll('.js-texture3')];
        this.pslidetextures = this.pslidetextures .map (t=>{
            return new THREE.TextureLoader().load(t.src)
        })

        this.videotextures = [...document.querySelectorAll('.videos')];
        this.videotextures = this.videotextures .map (t=>{
           
            return t
        })
        
        this.position=0;
        this.speed = 0.1;
        this.targetSpeed = 0;

   

       
       
        this.addText();
        this.addPlane();
        // this.addCube()
        // this.addCube().then(() => {
        //     // Model loaded, do something if needed
        // });



        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 30;
        this.camera.position.x = -3;
        
       
        this.time = 0; 

        this.materials = [];
        this.meshes =[];

        this.slideind = 0;
        this.groups = [];
        this.addmesh();
        this.handleImages();
       


       

        this.addback();

        this.addPointlit();
    

        this.render();

        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
        
       
        
       


    }
    handleResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 10;
        
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        if (window.innerWidth < 500) {
            // Custom position for small screens
            // this.meshes.scale.set(0.1,0.1,0.1);
          } else {
            // Regular position for larger screens
            // yourObject.position.set(0, 0, 0); // Or any default position
          }


        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }

    
    addText() {
      this.txtmaterial = new THREE.ShaderMaterial({
          side: THREE.DoubleSide,
          transparent: true,
          defines: {
              IS_SMALL: false,
          },
          extensions: {
              derivatives: true,
          },
          uniforms: {
              uSpeed :{value:0},
              // Common
              ...uniforms.common,
              
              // Rendering
              ...uniforms.rendering,
              
              // Strokes
              ...uniforms.strokes,
                     // Common
        uOpacity: { value: 1 },
        uColor: { value: new THREE.Color("#A9A9A9") },
        uMap: { value: null },
        // Rendering
        uThreshold: { value: 0.05 },
        uAlphaTest: { value: 0.01 },
        // Strokes
        uStrokeColor: { value: new THREE.Color("#008060") },
        uStrokeOutsetWidth: { value: 0.0 },
        uStrokeInsetWidth: { value: 0.3 },
        ustroke : {value:false}
          },
          vertexShader:   textvert,
          fragmentShader: textfra,
      });
      this.txtmaterial2 = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        defines: {
            IS_SMALL: false,
        },
        extensions: {
            derivatives: true,
        },
        uniforms: {
            uSpeed :{value:0},
            // Common
            ...uniforms.common,
            
            // Rendering
            ...uniforms.rendering,
            
            // Strokes
            ...uniforms.strokes,
                   // Common
      uOpacity: { value: 1 },
      uColor: { value: new THREE.Color("#C0C0C0") },
      uMap: { value: null },
      // Rendering
      uThreshold: { value: 0.05 },
      uAlphaTest: { value: 0.01 },
      // Strokes
      uStrokeColor: { value: new THREE.Color("#FFD700") },
      uStrokeOutsetWidth: { value: 1.8 },
      uStrokeInsetWidth: { value: 0.9 },
      ustroke : {value:true}
        },
        vertexShader:   textvert,
        fragmentShader: textfra,
    });

      const Texts = ['1-SkyRoot-MetaHack.','2-SolutionChallenge.','3-farmhack.','4-IIT-hackopitch.','5-IITMadaras.']
      Promise.all([
          loadFontAtlas(fontpng),
 
      ]).then(([atlas]) => {
         

        Texts.forEach((mytext,i)=>{
          const geometry = new MSDFTextGeometry({
              text: mytext.toUpperCase(),
              font: myfont ,
          });
          // console.log('this geometry',geometry)
            
         
          this.txtmaterial.uniforms.uMap.value = atlas;
          this.txtmaterial2.uniforms.uMap.value = atlas;

      
          const mesh = new THREE.Mesh(geometry, this.txtmaterial);
          this.textsize = '0.0018'
          if (window.innerWidth < 500) {
            this.textsize = '0.0012'
        }
        const z= 89.892
          
          mesh.scale.set(this.textsize,-this.textsize,this.textsize);
          mesh.position.y = -0.5*i;
          mesh.position.x = -0.8;
          mesh.position.z = z;
        
          this.txtgroup.add(mesh);

          const mesh2 = new THREE.Mesh(geometry, this.txtmaterial2);
          
          mesh2.scale.set(this.textsize,-this.textsize,this.textsize);
          mesh2.position.y = -0.5*i;
          mesh2.position.x = -0.8;
          mesh2.position.z = z;
          console.log('Textmesh',mesh2);
          this.copytxtgroup.add(mesh2);
          
          this.scene.add(this.txtgroup);
      // mysketch.scene.add(mysketch.copytxtgroup);
     


         

        })

      });
      
      function loadFontAtlas(path) {
          const promise = new Promise((resolve, reject) => {
              const loader = new THREE.TextureLoader();
              loader.load(path, resolve);
          });
      
          return promise;
      }
      
      function loadFont(path) {
          const promise = new Promise((resolve, reject) => {
              const loader = new FontLoader();
              loader.load(path, resolve);
          });
      
          return promise;
      }
    }


  addPlane(){

      this.planegeometry = new THREE.PlaneGeometry( 16/21, 9/21,30,30 ).translate(0,0,1);
      
      
      let pos  = this.planegeometry.attributes.position.array;
      let newpos = []
      let r = 1.35;
      for(let i = 0; i<pos.length; i+=3){
          let x  = pos[i];
          let y  = pos[i+1];
          let z  = pos[i+2];

          let xz = new  THREE.Vector2(x,z).normalize().multiplyScalar(r);


          newpos.push(xz.x,y,xz.y);

      }
      this.planegeometry.setAttribute('position',new THREE.Float32BufferAttribute(newpos,3))

      this.planematerial =  new THREE.ShaderMaterial({
          vertexShader: vertexShaderCode3,
          fragmentShader: fragmentShaderCode3,
          uniforms: {
            textureSampler: { value: this.textures[0] },
            glitchIntensity:{value:0.0}
          },
          // Add this line to enable double-sided rendering
          side: THREE.DoubleSide
        });
      this.plane = new THREE.Mesh( this.planegeometry, this.planematerial);
  
      this.plane.position.y = 0;
      this.plane.position.x = 0;
      this.plane.position.z = 89.792;
     
      this.planegroup.add( this.plane );
      this.scene.add(this.planegroup);

  }

  updateTexture(){
      // console.log(Math.round(this.position));
      let index  = Math.round(this.position *(-1) ) % this.textures.length;
      this.planematerial.uniforms.textureSampler.value = this.textures[index];
       
      this.copytxtgroup.children.forEach((mesh , i)=>{
          // console.log('i'+i,'index'+index)
          if(i!==(index)){
            
              mesh.visible = false;
          }else{
              mesh.visible = true;
          }
      })

  }
  addmesh(){
      
    this.material = new THREE.ShaderMaterial({
         vertexShader: vertexShaderCode,
        fragmentShader :fragmentShaderCode,
        uniforms: { /* Define any custom uniforms here */ 
           textureimg:{type:'t',value:null} ,
           timeanim:{type:'f',value:this.time},
           distancefromcent:{type:'f',value:0},
           waveintensity:{type:'f',value:0},
           glitchIntensity:{type:'f',value:0}

    },
        transparent:true,
        side:THREE.FrontSide
    });
    

    
} 
  handleImages(){

    this.videotextures.forEach((img,i)=>{
            let mat  = this.material.clone();
            let vidtext = new THREE.VideoTexture(img)
            // Create a red material
            // let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            mat.uniforms.textureimg.value= vidtext;
            // mat.uniforms.textureimg.value.needsUpdate = true;


            let geo = new THREE.PlaneGeometry(3/3,2/3);

            let mesh = new THREE.Mesh(geo,mat);

            let group =  new THREE.Group();
            group.add(mesh);

            this.groups.push(group)
             

            this.scene.add(group);

            this.materials.push(mat);
            this.meshes.push(mesh);
            mesh.position.y = i*1.2;
            group.position.z = 54.05;
            group.position.x = 0.15;

            group.rotation.y = -0.2;
            group.rotation.x = -0.5;
            group.rotation.z = -0.2;
            if (window.innerWidth < 500) {
            group.scale.set(0.8,0.8)
            group.position.x = -0.2;
        }

           

      
        
       
    })
}








    addback(){
     
        this.scene.background = new THREE.Color('#999D9E');

    }


    addPointlit(){
        const ponitLight = new THREE.PointLight(0xffffff);
        ponitLight.position.set(25,25,25);
        this.ambientLight = new THREE.AmbientLight(0xffffff);
        this.ambientLight.intensity = 3.0; // Increase the intensity (adjust the value as needed)
        this.scene.add(this.ambientLight);
        // this.scene.add(ponitLight);

    }



 


    
     

   
    render(){
        this.time++;
        // this.updateTexture();
       
        // this.actscroll()
        this.txtgroup.position.y = -this.position;
        
        // console.log(this.speed);
        this.speed*=0.9;

        this.targetSpeed += (this.speed-this.targetSpeed); 
        this.txtmaterial.uniforms.uSpeed.value = this.targetSpeed;
        this.txtmaterial2.uniforms.uSpeed.value = this.targetSpeed;

        this.txtgroup.position.y = -this.position * 0.5;
       
        this.copytxtgroup.position.y = -this.position * 0.5;

        this.plane.rotation.y = this.position*2*Math.PI; 
         
        this.planegroup.rotation.z = 0.2*Math.sin(this.position*0.5);

            // Rotate the cube
            // this.model.rotation.x += 0.01;
            // this.model.rotation.y += 0.01;


        if (this.materials){
            this.materials.forEach(m=>{
                m.uniforms.timeanim.value = this.time;
                // m.uniforms.textureimg.value.needsUpdate = true;
                
            })
        }
        if (this.videotextures){
            this.videotextures.forEach(m=>{
                m.needsUpdate = true;
                
            })
        }

        // console.log('camerapos',this.camera.position);
        // this.mymaterial.uniforms.uTime.value= this.time/20;
        this.renderer.render( this.scene, this.camera );
        this.renderer.clearDepth()
        this.renderer.render(this.copyscene,this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }

    removeEventListeners() {
        window.removeEventListener('resize', this.handleResize);
      }

}


