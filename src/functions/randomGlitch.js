import { useEffect } from 'react';

export function useRandomGlitch(ref, chance = 10, count = 5) {
  useEffect(() => {
    if (!ref.current) return;f

    const randomNumber = Math.floor(Math.random() * chance);
    if (randomNumber === 0 && window.glitch_exec) {
      const gl = Object.create(window.glitch_exec);
      gl.GLITCH_RENDER_COUNT = count;
      gl.start(ref.current);
      return () => gl.stop();
    }
  }, [ref, chance, count]);
}
