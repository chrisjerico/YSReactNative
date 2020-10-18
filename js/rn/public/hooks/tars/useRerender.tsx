import { useState } from 'react'

const useRerender = () => {
  const [state, setState] = useState(false)

  const reRender = () => {
    setState(!state)
  }
  return {
    reRender,
  }
}

export default useRerender
