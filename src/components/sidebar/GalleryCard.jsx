import { useEffect, useRef } from 'react';
import { galleryImages } from '../../data/projects.js';
import './Sidebar.css';

const slides = galleryImages;
const SWIPE_DISTANCE = 50;
const SWIPE_VELOCITY = 0.4; // px/ms: a quick flick counts even over a short distance
const EDGE_RESISTANCE = 0.3;

// Drag is written straight to the track's style (no React state per pointer
// move), so a swipe never triggers a re-render — that was the main source of
// stutter, especially when pulling past the first/last slide.
export default function GalleryCard() {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const state = useRef({ index: 0, startX: 0, lastX: 0, lastT: 0, velocity: 0, dx: 0, pointerId: null, width: 1 });

  // Decode every slide so the first swipe never waits on an image — but only
  // once the page is idle, so it doesn't compete with the first render.
  useEffect(() => {
    const preload = () =>
      slides.forEach(src => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
        img.decode?.().catch(() => {});
      });
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = setTimeout(preload, 1500);
    return () => clearTimeout(id);
  }, []);

  const render = (animate) => {
    const track = trackRef.current;
    if (!track) return;
    const s = state.current;
    track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    track.style.transform = `translate3d(${-s.index * s.width + s.dx}px, 0, 0)`;
  };

  useEffect(() => {
    const measure = () => {
      state.current.width = sliderRef.current?.clientWidth || 1;
      render(false);
    };
    measure();
    // Observe the slider itself: its width also changes without a window resize
    // (web-font swap, layout breakpoint, sidebar reflow), and the track is
    // positioned in pixels.
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(sliderRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const onPointerDown = e => {
    const s = state.current;
    s.pointerId = e.pointerId;
    s.startX = s.lastX = e.clientX;
    s.lastT = e.timeStamp;
    s.velocity = 0;
    s.dx = 0;
    s.width = sliderRef.current.clientWidth || 1;
    e.currentTarget.setPointerCapture(e.pointerId);
    render(false);
  };

  const onPointerMove = e => {
    const s = state.current;
    if (s.pointerId !== e.pointerId) return;
    let dx = e.clientX - s.startX;
    const atStart = s.index === 0 && dx > 0;
    const atEnd = s.index === slides.length - 1 && dx < 0;
    if (atStart || atEnd) dx *= EDGE_RESISTANCE;
    const dt = e.timeStamp - s.lastT;
    if (dt > 0) s.velocity = (e.clientX - s.lastX) / dt;
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;
    s.dx = dx;
    render(false);
  };

  const endDrag = e => {
    const s = state.current;
    if (s.pointerId !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture?.(s.pointerId)) e.currentTarget.releasePointerCapture(s.pointerId);
    s.pointerId = null;
    const goNext = s.dx < -SWIPE_DISTANCE || s.velocity < -SWIPE_VELOCITY;
    const goPrev = s.dx > SWIPE_DISTANCE || s.velocity > SWIPE_VELOCITY;
    if (goNext) s.index = Math.min(s.index + 1, slides.length - 1);
    else if (goPrev) s.index = Math.max(s.index - 1, 0);
    s.dx = 0;
    render(true);
  };

  return (
    <section className="sidebar-section sidebar-gallery">
      <div
        ref={sliderRef}
        className="gallery-slider gallery-slider--grab"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="gallery-slider__track">
          {slides.map(src => (
            <div className="gallery-slider__slide" key={src}>
              <img src={src} alt="" draggable={false} decoding="async" className="gallery-slider__panel" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
