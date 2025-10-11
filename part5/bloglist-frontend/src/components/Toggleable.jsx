import { useImperativeHandle, useState } from 'react'

const Toggleable = (props) => {
  const [isVisible, setVisibility] = useState(false)
  const toggleVisibility = () => setVisibility(!isVisible)

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return <div>
    <div style = {{ display: isVisible ? 'none' : '' }}>
      <button onClick = {toggleVisibility}>{props.buttonLabel}</button>
    </div>
    <div style = {{ display: isVisible ? '' : 'none' }}>
      {props.children}
      <button onClick = {toggleVisibility}>cancel</button>

    </div>
  </div>
}

export default Toggleable