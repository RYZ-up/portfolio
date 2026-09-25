import { useEffect, useRef, useState } from 'react';
import { Lottie } from 'lottie-react';
import sunAnim from '../../../assets/lottie/sun.json';
import cloudAnim from '../../../assets/lottie/cloud.json';
import partlyCloudyAnim from '../../../assets/lottie/partly-cloudy.json';
import rainAnim from '../../../assets/lottie/rain.json';
import useInView from '../../../hooks/useInView.js';

const ANIMATIONS = {
  clear: sunAnim,
  cloudy: cloudAnim,
  partly: partlyCloudyAnim,
  rain: rainAnim,
  storm: rainAnim
};

/**
 * The animated weather icon. Kept in its own module so the Lottie player and
 * its JSON files (a large share of the page's JavaScript) load after the card
 * has already rendered, and only play while the icon is on screen.
 */
export default function WeatherAnimation({ kind }) {
  const [ref, inView] = useInView();
  const lottieRef = useRef(null);
  // Built the first time it comes on screen, then only paused / resumed:
  // unmounting it off screen meant re-parsing the JSON and rebuilding the
  // player on every scroll past the card.
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView) setStarted(true);
    const player = lottieRef.current;
    if (!player) return;
    if (inView) player.play();
    else player.pause();
  }, [inView]);

  return (
    <div ref={ref} className="weather-card__anim">
      {/* Canvas renderer: the SVG one rewrites dozens of SVG attributes per
          frame, i.e. a style recalc + layout of the page 60 times a second. */}
      {started && (
        <Lottie ref={lottieRef} src={ANIMATIONS[kind] || cloudAnim} renderer="canvas" autoplay={inView} loop />
      )}
    </div>
  );
}
