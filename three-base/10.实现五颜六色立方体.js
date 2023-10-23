// 目标：绘制 6 个面颜色不同的立方体
// 使用：材质可以按照顺序创建 6 个并传入给物体
// 顺序：x轴正负，y轴正负，z轴正负


import "./style.css"

// 引入three.js
import * as THREE from "three"

// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景、摄像机、渲染器(画布)的全局变量
let scene, camera, renderer
// 创建物体的全局变量
let cube
// 创建轨道控制器的全局变量
let controls

// 初始化加载场景与摄像机
function init() {
  //  创建场景
  scene = new THREE.Scene()

  // 创建摄像机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


  camera.position.z = 5


  // 创建渲染器(画布 canvas)
  renderer = new THREE.WebGLRenderer({
    // 开启抗锯齿
    antialias: true
  })

  // 设置画布大小
  renderer.setSize(window.innerWidth, window.innerHeight)


  // 将画布添加到DOM
  document.body.append(renderer.domElement)

}

// 创建立方体
function createCube() {
  //  创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 1. 定义颜色数组（x 正负，y 正负，z 正负）
  const colorArr = ['red', 'green', 'blue', 'pink', 'orange', 'write']

  // 创建材质
  const materialArr = colorArr.map(item => {
    return new THREE.MeshBasicMaterial({ color: item });
  })
  console.log("materialArr", materialArr)
  // const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff11 });
  // const material3 = new THREE.MeshBasicMaterial({ color: 0x00ff33 });
  // const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff55 });
  // const material5 = new THREE.MeshBasicMaterial({ color: 0x00ff99 });
  // const material6 = new THREE.MeshBasicMaterial({ color: 0x11ff33 });
  // 创建物体网格对象, 并且图形与材质加载的物体网格对象中
  cube = new THREE.Mesh(geometry, materialArr);
  // 将物体添加到场景中
  scene.add(cube);
}

// 创建轨道控制器
function createControl() {
  //  创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  // 开启阻尼效果
  controls.enableDamping = true
}

// 创建循环渲染方法
function renderLoop() {
  // 循环渲染
  requestAnimationFrame(renderLoop)
  // 手动更新场景(调用控制器的update方法)
  controls.update()
  // 将场景与摄像机渲染到画布上
  renderer.render(scene, camera)
}

// 创建坐标轴
function createHelper() {
  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)
}

// 创建场景适配适配方法
function renderResize() {
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

// 调用初始化加载场景与摄像机方法
init()

// 调用创建物体方法
createCube()

// 调用创建轨道控制器方法
createControl()

// 调用创建坐标轴方法
createHelper()

// 调用循环渲染方法
renderLoop()

// 调用3d场景适配方法
renderResize()