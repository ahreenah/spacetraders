import {useRef, useState, useEffect, useLayoutEffect} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {useWaypoints} from '../context/waypoints'
import * as THREE from 'three'

function Line({start, end}) {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink" />
    </line>
  )
}


function Grid({xStart, yStart, xEnd, yEnd, step}: {
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
  step: number
}) {
  let xlines = []
  for (let i = xStart; i <= xEnd; i += step) {
    xlines.push(
      <Line start={[i, yStart, 0]} end={[i, yEnd, 0]} />
    )
  }
  return <>
    {xlines}
    <Line start={[xStart, yStart, 0]} end={[xEnd, yStart, 0]} />
    <Line start={[xStart, yStart, 0]} end={[xStart, yEnd, 0]} />
  </>
}


function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  //const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const [rot, setRot] = useState(0)
  useEffect(() => {
    const int = setInterval(() => setRot((v) => v + 0.01), 1000 / 60)
    return () => {
      clearInterval(int)
    }
  }, [])
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      //ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      rotation={[rot, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function SceneView() {
  const [waypoints] = useWaypoints()
  console.log('drawing', waypoints)
  return (
    <div className='scene'>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {waypoints?.map?.(({x, y}) => (
          <Box position={[x / 10, y / 10, 0]} />
        ))}
        <Grid xStart={-100} yStart={-100} xEnd={100} yEnd={100}  step={1}/>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

