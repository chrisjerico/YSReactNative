import { useState } from "react"

const useRerender = () => {
  const [state, setState] = useState(false)

  const rerender = () => {
    setState(!state)
  }
  return {
    rerender
  }
}

export default useRerender