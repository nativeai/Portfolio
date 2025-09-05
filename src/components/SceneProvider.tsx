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
      camera.position.x = 0
      camera.position.z = 600
      camera.position.y = 100
      scene.fog = new THREE.Fog(colors.darkblue, 300, 950)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.setSize(window.innerWidth, window.outerHeight)
      camera.position.z = 5
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
      const geom = new THREE.TorusGeometry(1200, 300, 100, 300)
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
      const geom = new THREE.TorusGeometry(150, 5, 12, 500)
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

    function addParticles() {
      const particlesCount = 200
      const positions = new Float32Array(particlesCount * 3)
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 1
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      }
      const particlesGeometry = new THREE.BufferGeometry()
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const particlesMaterial = new THREE.PointsMaterial({
        color: '#163E6A',
        sizeAttenuation: true,
        size: 0.03
      })
      const particles = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particles)
    }

    function animate() {
      requestAnimationFrame(animate)
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