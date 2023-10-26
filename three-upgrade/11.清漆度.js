// 目标：物理网格材质-清漆度
// 物理网格材质：在标准网格材质基础上，扩展了更高级的渲染属性
// 例如：清漆度（薄薄的膜）
// 使用：
// 1. 设置清漆度
// 2. 设置清漆度的粗糙度

import './style.css'

// 引入场景的全局变量
import { scene } from "./utils/init.js"
import * as dat from 'dat.gui'

// 引入threeJS
import * as THREE from "three"

// 初始化物体方法
function initBase() {
    // 创建立方体纹理加载器
    const cubeTL = new THREE.CubeTextureLoader()
    const cubeTexture = cubeTL.setPath("image/sky/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"])
    cubeTexture.colorSpace = THREE.SRGBColorSpace


    // 创建图形
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    // 创建材质
    const material = new THREE.MeshPhysicalMaterial({
        // 环境贴图
        envMap: cubeTexture,
        // 粗糙度设置（0 光滑， 1 粗糙）
        roughness: 0,
        // 金属度（光反射的光泽程度，1 是最高）
        metalness: 1,
        // 1. 设置清漆度（0 - 1）
        clearcoat: 1,
        // 2. 设置清漆度的粗糙度
        clearcoatRoughness: 0
    });
    // 创建物体
    const sphere = new THREE.Mesh(geometry, material);
    // 加入到场景
    scene.add(sphere);

    // 设置孩子gui工具
    const gui = new dat.GUI()
    gui.add(material, "roughness", 0, 1, 0.1).name("粗糙度:")
    gui.add(material, "metalness", 0, 1, 0.1).name("金属度:")
    gui.add(material, "clearcoat", 0, 1, 0.1).name("清漆度:")
    gui.add(material, "clearcoatRoughness", 0, 1, 0.1).name("清漆度的粗糙度:")

    // 给场景添加背景图
    scene.background = cubeTexture
}

// 创建光照
function createLight() {
    // 环境光：无方向，照亮场景中所有受光照影响的物体
    const light = new THREE.AmbientLight(0x404040); // 柔和的白光
    scene.add(light)

    // 平行光：从一个方向发射过来平行光线
    const direction = new THREE.DirectionalLight(0xffffff, 10)
    direction.position.set(3, 3, 3)
    scene.add(direction)

    // 平行光辅助对象
    // 参数1：平行光对象，参数2：模拟平行光光源的大小
    const helper = new THREE.DirectionalLightHelper(direction, 1);
    scene.add(helper);
}

// 调用初始化物体方法
initBase()

// 调用创建光照方法
createLight()


