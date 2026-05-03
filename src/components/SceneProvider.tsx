'use client'

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function SceneProvider() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      fieldOfView: number,
      aspectRatio: number,
      nearObj: number,
      farObj: number,
      hemisphereLight: THREE.HemisphereLight,
      ambientLight: THREE.AmbientLight,
      shadowLight: THREE.DirectionalLight

    const width = window.innerWidth
    const height = window.innerHeight

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    // Brand navy palette for particles
    const brandColors = [
      0x2A5298, // Navy Light
      0x4A7BC4, // Steel
      0x6FA3E0, // Sky Blue
      0x1A3A6B, // Navy Mid
      0x0D2147, // Navy Primary
      0xC9A84C, // Gold accent (sparse)
    ]

    function createScene() {
      scene = new THREE.Scene()
      aspectRatio = width / height
      fieldOfView = 55
      nearObj = 10
      farObj = 10000
      camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearObj, farObj)
      camera.position.set(8, 3, 12)
      camera.lookAt(0, 0, 0)
      scene.fog = new THREE.Fog(0x0A1628, 400, 1000)
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
      hemisphereLight = new THREE.HemisphereLight(0x4A7BC4, 0x0A1628, 2)
      ambientLight = new THREE.AmbientLight(0x1A3A6B, 1.0)
      shadowLight = new THREE.DirectionalLight(0x6FA3E0, 0.6)
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

    function addParticles() {
      const particlesCount = 200
      particleSystem = new THREE.Group()
      individualParticles = []

      for (let i = 0; i < particlesCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8)
        const baseSize = 0.5 + Math.random() * 1.5

        // 10% chance of gold accent, rest navy spectrum
        const colorIndex = Math.random() < 0.1
          ? 5
          : Math.floor(Math.random() * 5)

        const particleMaterial = new THREE.MeshBasicMaterial({
          color: brandColors[colorIndex],
          transparent: true,
          opacity: 0.8,
        })

        const particleMesh = new THREE.Mesh(particleGeometry, particleMaterial)

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

        individualParticles.push({ mesh: particleMesh, velocity, baseSize })
        particleSystem.add(particleMesh)
      }

      scene.add(particleSystem)
    }

    function updateParticles() {
      if (!individualParticles) return

      individualParticles.forEach(particle => {
        const position = particle.mesh.position

        const mouseInfluence = new THREE.Vector3(
          mousePos.x * 8,
          mousePos.y * 6,
          position.z
        )

        const mouseDistance = position.distanceTo(mouseInfluence)
        const maxInfluenceDistance = 5

        if (mouseDistance < maxInfluenceDistance) {
          const repulsionForce = new THREE.Vector3()
            .subVectors(position, mouseInfluence)
            .normalize()
            .multiplyScalar((1 - mouseDistance / maxInfluenceDistance) * 0.001)

          particle.velocity.add(repulsionForce)
        }

        particle.velocity.multiplyScalar(0.995)

        const minMovement = 0.0005
        if (particle.velocity.length() < minMovement) {
          particle.velocity.add(new THREE.Vector3(
            (Math.random() - 0.5) * minMovement * 2,
            (Math.random() - 0.5) * minMovement * 2,
            (Math.random() - 0.5) * minMovement * 2
          ))
        }

        position.add(particle.velocity)

        const distance = position.distanceTo(camera.position)
        const vFOV = camera.fov * Math.PI / 180
        const viewHeight = 2 * Math.tan(vFOV / 2) * distance
        const viewWidth = viewHeight * camera.aspect

        const cameraYOffset = camera.position.y
        const bounds = {
          x: Math.min(viewWidth / 2 * 0.95, 8),
          y: Math.min((viewHeight / 2 * 0.95) + (cameraYOffset * 0.3), 6),
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

        const distanceFromCamera = position.distanceTo(camera.position)
        const depthScale = Math.max(0.3, Math.min(2.0, 50 / distanceFromCamera))
        particle.mesh.scale.setScalar(particle.baseSize * depthScale)

        const material = particle.mesh.material as THREE.MeshBasicMaterial
        material.opacity = Math.max(0.2, Math.min(0.9, depthScale * 0.8))
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      updateParticles()
      renderer.render(scene, camera)
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
    addParticles()

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
