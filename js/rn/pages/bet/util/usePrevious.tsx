import { useEffect, useRef } from 'react'

/**
 * 记录之前的状态
 * @param value
 */
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export { usePrevious }
