// src/functions/animTransform.js
import { useEffect } from 'react';

export function useAnimFrom(ref, from = 'up', duration = 300) {
    useEffect(() => {
        let animated = false;

        const runAnimation = () => {
        if (!ref?.current || animated) return;
        animated = true;

        let tVal;
        switch (from) {
            case 'up': tVal = 'translate(0, -30px)'; break;
            case 'down': tVal = 'translate(0, 30px)'; break;
            case 'left': tVal = 'translate(-30px, 0)'; break;
            case 'right': tVal = 'translate(30px, 0)'; break;
            default: tVal = 'translate(0)'; 
        }

        const keyframes = [
            { transform: tVal, opacity: 0 },
            { transform: 'translate(0)', opacity: 1 }
        ];

        const options = {
            duration,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards',
        };

        ref.current.style.opacity = 0;
        ref.current.animate(keyframes, options);
        };

        if (ref.current) {
        runAnimation();
        return;
        }

        const observer = new MutationObserver(() => {
        if (ref.current) {
            runAnimation();
            observer.disconnect();
        }
        });

        observer.observe(document.body, {
        childList: true,
        subtree: true
        });

        return () => observer.disconnect();
    }, [ref, from, duration]);
}
