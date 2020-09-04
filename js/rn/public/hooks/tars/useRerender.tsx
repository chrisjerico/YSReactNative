import { useState } from "react"

const useRerender = () => {
  const [state, setState] = useState(false)

  const renender = () => {
    setState(!state)
  }
  return {
    renender
  }
}

export default useRerender