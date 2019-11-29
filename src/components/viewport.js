import * as THREE from 'three'

export default class Viewport {
  constructor (mountPoint) {
    this.bindFunctions()

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.init()
    this.setup(mountPoint)

    this.creatStarterScene()
  }
  
  // SETUP AND UTILITIES
  bindFunctions () {
    this.installListeners = this.installListeners.bind(this)
    this._onWindowResize = this._onWindowResize.bind(this)
    this._animate = this._animate.bind(this)
  }

  init () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera()
    this.renderer = new THREE.WebGLRenderer()
    this.installListeners()
  }

  installListeners () {
    window.addEventListener('resize', this._onWindowResize)
  }

  _onWindowResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.camera.aspect = this.width / this.height

    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.width, this.height)
    console.log('resize')
  }

  setup (mountPoint) {
    this.renderer.setSize(this.width, this.height)
    mountPoint = mountPoint || document.body
    mountPoint.appendChild(this.renderer.domElement)
    this.scene.background = new THREE.Color(0xff0000)
  }

  start () {
    this._animate()
  }

  _animate () {
    requestAnimationFrame(this._animate)
    this.renderer.render(this.scene, this.camera)
  }

  // CREATORS
  creatStarterScene () {
    let box = new THREE.BoxGeometry(1, 1, 1)
    let mat = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    let cube = new THREE.Mesh(box, mat)
    this.scene.add(cube)
    this.camera.position.z = 5
  }

  // GETTERS AND SETTERS
}
