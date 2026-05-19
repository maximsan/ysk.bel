import { MAP_ELEMENT } from '@constants/dom/map.js';
import { GOOGLE_MAP_EMBED_STYLES } from './googleMapStyles';

const ESTATE_COORDINATES = { lat: 54.291652, lng: 27.480454 };

/**
 * Passed through Eleventy’s esbuild define (`eleventy.config.js`).
 * When absent locally builds omit Maps altogether (`GOOGLE_MAPS_API_SRC` stays empty).
 */
const GOOGLE_MAPS_API_KEY = __GOOGLE_MAPS_API_KEY__;
const GOOGLE_MAPS_API_SRC = GOOGLE_MAPS_API_KEY
  ? `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GOOGLE_MAPS_API_KEY)}`
  : '';

/**
 * Maps JS sometimes never reaches `idle` when the script is blocked or offline.
 * After this timeout we still swap the loading skeleton for the map container so the UI finishes settling.
 */
const MAP_READY_FALLBACK_MS = 15_000;

let googleMapsApiPromise;

function markMapUnavailable(shell = document.getElementById(MAP_ELEMENT.shellId)) {
  const fallback = document.getElementById(MAP_ELEMENT.fallbackId);
  shell?.classList.add(
    MAP_ELEMENT.shellReadyClass,
    MAP_ELEMENT.shellUnavailableClass,
  );
  shell?.classList.remove(MAP_ELEMENT.shellLoadingClass);
  fallback?.removeAttribute('hidden');
}

/**
 * Google Maps JS calls `window.gm_authFailure` when the key/referrer is rejected.
 * Treat that the same as a blocked script so visitors get the route fallback.
 */
if (typeof window !== 'undefined') {
  window.gm_authFailure = () => markMapUnavailable();
}

function loadGoogleMapsApi() {
  if (typeof google !== 'undefined' && google.maps) {
    return Promise.resolve();
  }

  if (!GOOGLE_MAPS_API_SRC) {
    return Promise.reject(new Error('Google Maps API key is not configured'));
  }

  if (googleMapsApiPromise) {
    return googleMapsApiPromise;
  }

  googleMapsApiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GOOGLE_MAPS_API_SRC;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return googleMapsApiPromise;
}

export function googleMapInit() {
  const mapEl = document.getElementById(MAP_ELEMENT.canvasId);
  const shell = document.getElementById(MAP_ELEMENT.shellId);

  if (!mapEl) {
    return;
  }

  if (!GOOGLE_MAPS_API_SRC) {
    markMapUnavailable(shell);
    return;
  }

  if (!mapEl || typeof google === 'undefined' || !google.maps) {
    loadGoogleMapsApi()
      .then(googleMapInit)
      .catch(() => markMapUnavailable(shell));
    return;
  }

  const map = new google.maps.Map(mapEl, {
    zoom: 16,
    center: ESTATE_COORDINATES,
    mapTypeId: 'satellite',
    styles: GOOGLE_MAP_EMBED_STYLES,
    scrollwheel: false,
  });

  new google.maps.Marker({
    position: ESTATE_COORDINATES,
    map,
  });

  function markMapReady() {
    const fallback = document.getElementById(MAP_ELEMENT.fallbackId);
    shell?.classList.add(MAP_ELEMENT.shellReadyClass);
    shell?.classList.remove(MAP_ELEMENT.shellUnavailableClass);
    shell?.classList.remove(MAP_ELEMENT.shellLoadingClass);
    fallback?.setAttribute('hidden', '');
  }

  google.maps.event.addListenerOnce(map, 'idle', markMapReady);

  window.setTimeout(markMapReady, MAP_READY_FALLBACK_MS);
}
