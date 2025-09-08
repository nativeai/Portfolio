'use client'

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function SceneProvider() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let cloud: any,
      camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      fieldOfView: number,
      aspectRatio: number,
      nearObj: number,
      farObj: number,
      sky: any,
      sea: any,
      hemisphereLight: THREE.HemisphereLight,
      ambientLight: THREE.AmbientLight,
      shadowLight: THREE.DirectionalLight,
      frame = 0,
      night = false,
      objectsDistance = 5

    const width = window.innerWidth
    const height = window.innerHeight
    const material = new THREE.MeshStandardMaterial({
      color: 0xC6CCEE,
      roughness: 1,
      flatShading: true,
    })
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    const colors = {
      red: 0xf25346,
      white: 0xeaeaea,
      pink: 0xF5986E,
      brown: 0x59332e,
      brownDark: 0x23190f,
      blue: 0x29ABE2,
      darkblue: 0x29ABE2,
      black: 0x000000,
      lightblue: 0xD6E8FF,
    }

    function createScene() {
      scene = new THREE.Scene()
      aspectRatio = width / height
      fieldOfView = 55
      nearObj = 10
      farObj = 10000
      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearObj,
        farObj
      )
      camera.position.set(8, 3, 12)
      camera.lookAt(0, 0, 0)
      scene.fog = new THREE.Fog(colors.darkblue, 300, 950)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.setSize(window.innerWidth, window.outerHeight)
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }
    }

    const mousePos = { x: 0, y: 0 }

    function createLights() {
      hemisphereLight = new THREE.HemisphereLight(0xFFA29E, 0x1F9EFF, 3)
      ambientLight = new THREE.AmbientLight(0xFFFCD9, 0.6)
      shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
      shadowLight.position.set(150, 350, 350)
      shadowLight.castShadow = true
      shadowLight.shadow.camera.left = -400
      shadowLight.shadow.camera.right = 400
      shadowLight.shadow.camera.top = 400
      shadowLight.shadow.camera.bottom = -400
      shadowLight.shadow.camera.near = 1
      shadowLight.shadow.camera.far = 1000
      shadowLight.shadow.mapSize.width = 2048
      shadowLight.shadow.mapSize.height = 2048
      scene.add(hemisphereLight)
      scene.add(shadowLight)
      scene.add(ambientLight)
    }

    function Sea() {
      const geom = new THREE.PlaneGeometry(2400, 2400, 100, 100)
      geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
      const mat = new THREE.MeshPhongMaterial({
        color: colors.red,
        transparent: true,
        opacity: 0.3,
        flatShading: true,
        side: THREE.DoubleSide
      })
      // @ts-ignore
      this.mesh = new THREE.Mesh(geom, mat)
      // @ts-ignore
      this.mesh.receiveShadow = true
    }

    function createSea() {
      sea = new Sea()
      sea.mesh.position.y = -500
      scene.add(sea.mesh)
    }

    function Cloud() {
      // @ts-ignore
      this.mesh = new THREE.Object3D()
      // @ts-ignore
      this.mesh.name = "cloud"
      const geom = new THREE.TetrahedronGeometry(80, 0)
      const mat = new THREE.MeshPhongMaterial({
        color: colors.lightblue,
      })
      const nBlocs = 3 + Math.floor(Math.random() * 3)
      for (let i = 0; i < nBlocs; i++) {
        const m = new THREE.Mesh(geom.clone(), mat)
        m.position.x = i * 10
        m.position.y = Math.random() * 10
        m.position.z = Math.random() * 500
        m.rotation.z = Math.random() * Math.PI * 5
        m.rotation.y = Math.random() * Math.PI * 5
        const s = 0.5 + Math.random() * 3
        m.scale.set(s, s, s)
        m.castShadow = true
        m.receiveShadow = true
        // @ts-ignore
        this.mesh.add(m)
      }
    }

    function Sky() {
      // @ts-ignore
      this.mesh = new THREE.Object3D()
      // @ts-ignore
      this.nClouds = 8
      // @ts-ignore
      this.clouds = []
      // @ts-ignore
      const stepAngle = Math.PI * 2 / this.nClouds
      // @ts-ignore
      for (let i = 0; i < this.nClouds; i++) {
        const c = new Cloud()
        // @ts-ignore
        this.clouds.push(c)
        const a = stepAngle * i
        const h = 750 + Math.random() * 50
        c.mesh.position.y = Math.sin(a) * h
        c.mesh.position.x = Math.cos(a) * h
        c.mesh.position.z = -400 - Math.random() * 800
        c.mesh.rotation.z = a + Math.PI / 2
        const s = 1 + Math.random() * 2
        c.mesh.scale.set(s, s, s)
        // @ts-ignore
        this.mesh.add(c.mesh)
      }
    }

    function createSky() {
      sky = new Sky()
      sky.mesh.position.y = -600
      scene.add(sky.mesh)
    }

    let particleSystem: THREE.Group
    let individualParticles: Array<{
      mesh: THREE.Mesh,
      velocity: THREE.Vector3,
      baseSize: number
    }>
    const gravityWells = [
      { x: 2, y: 0, z: -2, strength: 0.05 },
      { x: -3, y: 1, z: 1, strength: 0.04 },
      { x: 1, y: -2, z: 3, strength: 0.06 },
      { x: -1, y: 2, z: -1, strength: 0.03 }
    ]

    function addGravityWellIndicators() {
      gravityWells.forEach((well, index) => {
        // Create a subtle glowing sphere to mark the gravity well
        const wellGeometry = new THREE.SphereGeometry(0.1, 16, 16)
        const wellMaterial = new THREE.MeshBasicMaterial({
          color: 0x4A90E2,
          transparent: true,
          opacity: 0.6
        })
        const wellMesh = new THREE.Mesh(wellGeometry, wellMaterial)
        wellMesh.position.set(well.x, well.y, well.z)
        scene.add(wellMesh)

        // Add a larger transparent sphere to show the influence area
        const influenceGeometry = new THREE.SphereGeometry(well.strength * 20, 16, 16)
        const influenceMaterial = new THREE.MeshBasicMaterial({
          color: 0x4A90E2,
          transparent: true,
          opacity: 0.1,
          wireframe: true
        })
        const influenceMesh = new THREE.Mesh(influenceGeometry, influenceMaterial)
        influenceMesh.position.set(well.x, well.y, well.z)
        scene.add(influenceMesh)
      })
    }

    function addParticles() {
      const particlesCount = 200
      particleSystem = new THREE.Group()
      individualParticles = []
      
      for (let i = 0; i < particlesCount; i++) {
        // Create individual particle as small sphere
        const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8)
        
        // Random base size for variation
        const baseSize = 0.5 + Math.random() * 1.5
        
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.8, 0.4 + Math.random() * 0.3),
          transparent: true,
          opacity: 0.8
        })
        
        const particleMesh = new THREE.Mesh(particleGeometry, particleMaterial)
        
        // Much wider 3D distribution for better depth
        particleMesh.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 25
        )
        
        particleMesh.scale.setScalar(baseSize)
        
        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
        
        individualParticles.push({
          mesh: particleMesh,
          velocity: velocity,
          baseSize: baseSize
        })
        
        particleSystem.add(particleMesh)
      }
      
      scene.add(particleSystem)
    }

    function updateParticles() {
      if (!individualParticles) return

      // Convert mouse position to 3D world coordinates across multiple depth layers
      individualParticles.forEach(particle => {
        const position = particle.mesh.position
        
        // Create mouse influence point at the particle's depth
        const mouseInfluence = new THREE.Vector3(
          mousePos.x * 8,
          mousePos.y * 6,
          position.z  // Use particle's own Z position
        )
        
        // Calculate distance from mouse influence point
        const mouseDistance = position.distanceTo(mouseInfluence)
        const maxInfluenceDistance = 5
        
        if (mouseDistance < maxInfluenceDistance) {
          // Create repulsion force from mouse
          const repulsionForce = new THREE.Vector3()
            .subVectors(position, mouseInfluence)
            .normalize()
            .multiplyScalar((1 - mouseDistance / maxInfluenceDistance) * 0.001)
          
          particle.velocity.add(repulsionForce)
        }
        
        // Apply damping to velocities for gentle drift but ensure minimum movement
        particle.velocity.multiplyScalar(0.995)
        
        // Add small random movement to prevent stagnation
        const minMovement = 0.0005
        if (particle.velocity.length() < minMovement) {
          particle.velocity.add(new THREE.Vector3(
            (Math.random() - 0.5) * minMovement * 2,
            (Math.random() - 0.5) * minMovement * 2,
            (Math.random() - 0.5) * minMovement * 2
          ))
        }
        
        // Update positions
        position.add(particle.velocity)
        
        // Calculate actual viewport bounds based on camera frustum
        const distance = position.distanceTo(camera.position)
        const vFOV = camera.fov * Math.PI / 180 // Convert to radians
        const viewHeight = 2 * Math.tan(vFOV / 2) * distance
        const viewWidth = viewHeight * camera.aspect
        
        // Keep particles within visible frustum with margin, but account for camera offset
        const cameraYOffset = camera.position.y // Camera is at y=3, so adjust bounds accordingly
        const bounds = { 
          x: Math.min(viewWidth / 2 * 0.95, 8), // 95% of visible width
          y: Math.min((viewHeight / 2 * 0.95) + (cameraYOffset * 0.3), 6), // Extend upward to account for camera position
          z: 12 
        }
        if (Math.abs(position.x) > bounds.x) {
          position.x = Math.sign(position.x) * bounds.x
          particle.velocity.x *= -0.8
        }
        if (Math.abs(position.y) > bounds.y) {
          position.y = Math.sign(position.y) * bounds.y
          particle.velocity.y *= -0.8
        }
        if (Math.abs(position.z) > bounds.z) {
          position.z = Math.sign(position.z) * bounds.z
          particle.velocity.z *= -0.8
        }
        
        // Calculate distance from camera for depth-based scaling
        const distanceFromCamera = position.distanceTo(camera.position)
        const depthScale = Math.max(0.3, Math.min(2.0, 50 / distanceFromCamera))
        particle.mesh.scale.setScalar(particle.baseSize * depthScale)
        
        // Depth-based opacity for better 3D effect
        const material = particle.mesh.material as THREE.MeshBasicMaterial
        material.opacity = Math.max(0.2, Math.min(0.9, depthScale * 0.8))
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      
      updateParticles()
      
      if (sea?.mesh) {
        sea.mesh.rotation.z += 0.0001
      }
      if (sky?.mesh) {
        sky.mesh.rotation.z += 0.0001
      }
      renderer.render(scene, camera)
      frame += 0.01
    }

    function onResize() {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    function handleMouseMove(event: MouseEvent) {
      const tx = -1 + (event.clientX / width) * 2
      const ty = 1 - (event.clientY / height) * 2
      mousePos.x = tx
      mousePos.y = ty
    }

    createScene()
    createLights()
    createSea()
    addParticles()
    createSky()

    document.addEventListener("mousemove", handleMouseMove, false)
    window.addEventListener("resize", onResize, false)
    animate()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", onResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div id="scene" ref={mountRef}></div>
}