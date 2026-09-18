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
  return (
    <div ref={ref} className="weather-card__anim">
      {inView && <Lottie src={ANIMATIONS[kind] || cloudAnim} autoplay loop />}
    </div>
  );
}
