import { useEffect, useRef } from 'react';

function useComponentDidMount(callback: () => void) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      callback();
    }
  }, [callback]);
}

export default useComponentDidMount