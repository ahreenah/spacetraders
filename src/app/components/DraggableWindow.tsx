import {useEffect, useId, useState} from "react"
import useEvent from "../hooks/useEvent"
import {useWindowsContext} from "./WindowsContext"

const DraggableWindowHeader = () => {
  return (<div className='header'></div>)
}

const DraggableWindow = ({children, width, height, title}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const [xpos, setXpos] = useState(100)
  const id = useId()
  const {windows, moveUp} = useWindowsContext()
  useEffect(() => {
    moveUp(id)
  }, [])
  const [ypos, setYpos] = useState(100)
  const onDragStart = (e) => {
    console.log(e)
    setXOffset(e.clientX - xpos)
    setYOffset(e.clientY - ypos)
    setIsDragging(true)
    const onMouseUp = () => {
      setIsDragging(false)
    }
    moveUp(id)
    window.addEventListener('mouseup', onMouseUp)
  }
  useEvent('mousemove', (e) => {
    if (isDragging) {
      setXpos(e.clientX - xOffset)
      setYpos(e.clientY - yOffset)
    }
  })
  return (
    <div
      style={{
        top: ypos,
        left: xpos,
        height,
        width,
        zIndex: 2 + windows.indexOf(id),
      }}
      className='draggable-window'
      onMouseDown={() => {moveUp(id)}}
    >
      <div className='header' onMouseDown={onDragStart}>
        <h2>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}
export default DraggableWindow
