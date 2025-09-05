import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const mountRef = useRef(null);
  useEffect(() => {
    let cloud,
      camera,
      scene,
      fieldOfView,
      aspectRatio,
      nearObj,
      farObj,
      container,
      sky,
      sea,
      hemisphereLight,
      ambientLight,
      shadowLight,
      frame = 0,
      night = false,
      objectsDistance = 5;
    var width = window.innerWidth,
        height = window.innerHeight,
        material = new THREE.MeshStandardMaterial({
        color: 0xC6CCEE,
        roughness: 1,
        flatShading: true,
      }),
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      }),
      colors = {
        red:0xf25346,
        white:0xeaeaea,
        pink:0xF5986E,
        brown:0x59332e,
        brownDark:0x23190f,
        blue:0x29ABE2,
        darkblue:0x29ABE2,
        black:0x000000,
        lightblue:0xD6E8FF,
      
    };
    function createScene() {
      scene = new THREE.Scene();

      // Create the camera
      aspectRatio = width / height;
      fieldOfView = 55;
      nearObj = 10;
      farObj = 10000;
      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearObj,
        farObj
      );
      camera.position.x = 0;
      camera.position.z = 600;
      camera.position.y = 100;
      scene.fog = new THREE.Fog(colors.darkblue, 300, 950);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.setSize(window.innerWidth, window.outerHeight);
      camera.position.z = 5;
      mountRef.current.appendChild(renderer.domElement);
    }
    var mousePos = { x: 0, y: 0 };

    createScene();
    createLights();
    createSea();
    addParticles();
    createSky();
    //Background();

    function handleMouseMove(event) {
      var tx = -1 + (event.clientX / width) * 2;
      var ty = 1 - (event.clientY / height) * 2;
      mousePos = { x: tx, y: ty };
    }

    function createLights() {
      hemisphereLight = new THREE.HemisphereLight(0xFFA29E,0x1F9EFF, 3);
    
      ambientLight = new THREE.AmbientLight(0xFFFCD9, .6);
    
      shadowLight = new THREE.DirectionalLight(0xffffff, .9);
      shadowLight.position.set(150, 350, 350);
      shadowLight.castShadow = true;
      shadowLight.shadow.camera.left = -400;
      shadowLight.shadow.camera.right = 400;
      shadowLight.shadow.camera.top = 400;
      shadowLight.shadow.camera.bottom = -400;
      shadowLight.shadow.camera.near = 1;
      shadowLight.shadow.camera.far = 1000;
      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;
    
      scene.add(hemisphereLight);
      scene.add(shadowLight);
      scene.add(ambientLight);
    }

    function animate() {
      requestAnimationFrame(animate);
      sea.mesh.rotation.z += 0.0001;
      sky.mesh.rotation.z += 0.0001;
      renderer.render(scene, camera);
      frame += 0.01;
      // if(sea.mesh.geometry.attributes.position > 0) {
      //   const { array } = sea.mesh.geometry.attributes.position;
      //   const originalPosition = array;
      //   for (let i = 0; i < array.length; i+=3) {
      //     array[i] = originalPosition[i]
      //     Math.cos(frame) * 0.01;
      // }
      // }
    };

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function addParticles() {
      const particlesCount = 200
      const positions = new Float32Array(particlesCount * 3)
      for(let i = 0; i < particlesCount; i++)
      {
          positions[i * 3 + 0] = Math.random()
          positions[i * 3 + 1] = Math.random()
          positions[i * 3 + 2] = Math.random()
      }
      const particlesGeometry = new THREE.BufferGeometry()
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const particlesMaterial = new THREE.PointsMaterial({
        color: '#163E6A',
        sizeAttenuation: true,
        size: 0.03
    })
    for(let i = 0; i < particlesCount; i++)
    {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 1
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
      const particles = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particles)
    }

    // First let's define a Sea object :
    function Sea() {
      // create the geometry (shape) of the cylinder;
      // the parameters are: 
      // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
      var geom = new THREE.TorusGeometry(1200, 300, 100, 300);
      
      // rotate the geometry on the x axis
      geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));
      
      // create the material 
      var mat = new THREE.MeshPhongMaterial({
        color:colors.red,
        transparent:true,
        opacity:.3,
        flatShading:true,
        side: THREE.DoubleSide
      });
    
      // To create an object in Three.js, we have to create a mesh 
      // which is a combination of a geometry and some material
      this.mesh = new THREE.Mesh(geom, mat);
    
      // Allow the sea to receive shadows
      this.mesh.receiveShadow = true; 
    };

    function morphMesh(mesh) {
      
      const { array } = mesh.geometry.attributes.position;

      for (let i = 0; i < array.length; i+3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        
        array[i] = x + (Math.random() - 100)
        array[i + 1] = y + (Math.random() - 0.5)

        array[i+2] = z + Math.random();
      }

      mesh.geometry.attributes.position.originalPosition = 
      mesh.geometry.attributes.position.array;
    }

    function createSea() {
      sea = new Sea();

      // push it a little bit at the bottom of the scene
      sea.mesh.position.y = -500;
      //morphMesh(sea.mesh);

      // add the mesh of the sea to the scene
      scene.add(sea.mesh);
    }

    function Cloud() {
      this.mesh = new THREE.Object3D();
      this.mesh.name = "cloud";
      // var geom = new THREE.BoxGeometry(50, 50, 50);
      var geom = new THREE.TorusGeometry(150, 5, 12, 500);
      var mat = new THREE.MeshPhongMaterial({
        color:colors.lightblue,
      });
    
      var nBlocs = 3+Math.floor(Math.random()*3);
      for (var i=0; i<nBlocs; i++ ){
        var m = new THREE.Mesh(geom.clone(), mat);
        m.position.x = i*10;
        m.position.y = Math.random()*10;
        m.position.z = Math.random()*500;
        m.rotation.z = Math.random()*Math.PI*5;
        m.rotation.y = Math.random()*Math.PI*5;
        var s = .5 + Math.random()*3;
        m.scale.set(s,s,s);
        m.castShadow = true;
        m.receiveShadow = true;
        //morphMesh(m);
        this.mesh.add(m);
      }
    }

    
    function updateCameraFov(){
      camera.fov = normalize(mousePos.x,-1,1,40, 80);
      camera.updateProjectionMatrix();
    }

    function normalize(v,vmin,vmax,tmin, tmax){
      var nv = Math.max(Math.min(v,vmax), vmin);
      var dv = vmax-vmin;
      var pc = (nv-vmin)/dv;
      var dt = tmax-tmin;
      var tv = tmin + (pc*dt);
      return tv;
    }

    function Background() {
      const mesh = new THREE.PlaneGeometry(5,5,10,10);
      var mat = new THREE.MeshPhongMaterial({
        color:colors.red,
        side: THREE.DoubleSide
      });
      const planeMesh = new THREE.Mesh(mesh, mat);
      console.log('planemesh: ' + planeMesh)
      // planeMesh.position.z = -400-Math.random()*400;
      scene.add(planeMesh)
    }

    // Define a Sky Object
    function Sky() {
      this.mesh = new THREE.Object3D();
      this.nClouds = 8;
      this.clouds = [];
      var stepAngle = Math.PI*2 / this.nClouds;
      for(var i=0; i<this.nClouds; i++){
        var c = new Cloud();
        this.clouds.push(c);
        var a = stepAngle*i;
        var h = 750 + Math.random()*50;
        c.mesh.position.y = Math.sin(a)*h;
        c.mesh.position.x = Math.cos(a)*h;
        c.mesh.position.z = -400-Math.random()*800;
        c.mesh.rotation.z = a + Math.PI/2;
        var s = 1+Math.random()*2;
        c.mesh.scale.set(s,s,s);
        this.mesh.add(c.mesh);
      }
    }

    function createSky() {
      sky = new Sky();
      sky.mesh.position.y = -600;
      scene.add(sky.mesh);
    }
    document.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("resize", onResize, false);
    animate();
    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return (
    <ThemeProvider attribute="class">
      <div id="scene" ref={mountRef}></div>
      <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
        {/* // do this div style later (after putting the content) */}
        <div className="hover:scale-100 h-full md:max-h-screen col-span-12 p-4 text-base text-center bg-white dark:bg-dark-500 lg:col-span-3 rounded-md shadow-custom-light dark:shadow-custom-dark">
          {/* //!sidebar */}
          <Sidebar />
        </div>
        <div className="hover:scale-125 flex flex-col col-span-12 overflow-hidden bg-white shadow-custom-light dark:shadow-custom-dark rounded-md lg:col-span-9 dark:bg-dark-500">
          {/* //!navbar */}
          <Navbar />
          {/* //!about */}
          
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
