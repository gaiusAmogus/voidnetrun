import { useEffect, useRef, useState } from 'react';
import useAcronym from '../../functions/acronym';
import { getSvg } from '../../functions/svgLoader';

export default function LoadingBar({ onFinish }) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('Loading...');
  const lbRef = useRef(null);

  const acr1 = useAcronym(40);
  const acr2 = useAcronym(5);

  useEffect(() => {
    let startTime = null;
    const duration = 1200;
    const keyframes = [
        { percent: 0, time: 0 },
        { percent: 21, time: 24 },
        { percent: 22, time: 288 },
        { percent: 37, time: 336 },
        { percent: 38, time: 576 },
        { percent: 60, time: 840 },
        { percent: 76, time: 864 },
        { percent: 77, time: 1152 },
        { percent: 100, time: 1200 },
    ];

    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let frameIndex = keyframes.findIndex(f => f.time > elapsed);
      if (frameIndex === -1) frameIndex = keyframes.length - 1;

      const startFrame = keyframes[frameIndex - 1] || keyframes[0];
      const endFrame = keyframes[frameIndex];
      const frameProgress =
        endFrame.time !== startFrame.time
          ? (elapsed - startFrame.time) / (endFrame.time - startFrame.time)
          : 0;
      const value = startFrame.percent + frameProgress * (endFrame.percent - startFrame.percent);

      setPercent(Math.min(Math.max(Math.floor(value), 0), 100));

      if (elapsed < duration) {
        requestAnimationFrame(update);
      } else {
        setPercent(100);
        setStatusText('ENTER');

        lbRef.current?.classList.add('loadingBar--anim');
        document.querySelector('.header')?.classList.add('header--show');
        document.querySelector('.footer')?.classList.add('footer--show');

        if (onFinish) onFinish(); // informujemy App.jsx, że animacja zakończona
      }
    }

    requestAnimationFrame(update);
  }, [onFinish]);

  return (
    <>
      <div className="loadingBar" ref={lbRef}>
        <div className="loadingBar__box corners">
          <p>{statusText}</p>
        </div>
        <div className="loadingBar__percent">{percent}%</div>
        <div
          className="loadingBar__load"
          style={{ width: `calc(${percent}% - 60px)` }}
        ></div>
        <div className="loadingBar__line loadingBar__line--1">
          <div className="loadingBar__line-el"></div>
        </div>
        <div className="loadingBar__line loadingBar__line--2">
          <div className="loadingBar__line-el"></div>
        </div>
        <div className="loadingBar__cascates"></div>
        <div className="loadingBar__warning">WARNING!! Do not turn off</div>
      </div>

      <div className="siteLine siteLine--1">
        {getSvg('siteLine_1')}
        <div id="siteLineAcr__1" className="acr">{acr1}</div>
      </div>

      <div className="siteLine siteLine--2">
        {getSvg('siteLine_2')}
        <div id="siteLineAcr__2" className="acr">{acr2}</div>
      </div>
    </>
  );
}
