import { MAP_ELEMENT } from '../constants/dom/map.cjs';
import { GOOGLE_MAP_EMBED_STYLES } from './googleMapStyles';

const ESTATE_COORDINATES = { lat: 54.291652, lng: 27.480454 };
const GOOGLE_MAPS_API_SRC =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCEjXw1mbGTXw12jnM_YTAveRGb1I4c3gQ';

/** Fallback if `idle` never fires (offline API, blocked maps, etc.). */
const MAP_READY_FALLBACK_MS = 15_000;

let googleMapsApiPromise;

function loadGoogleMapsApi() {
  if (typeof google !== 'undefined' && google.maps) {
    return Promise.resolve();
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

  if (!mapEl || typeof google === 'undefined' || !google.maps) {
    loadGoogleMapsApi()
      .then(googleMapInit)
      .catch(() => {
        shell?.classList.add(MAP_ELEMENT.shellReadyClass);
        shell?.classList.remove(MAP_ELEMENT.shellLoadingClass);
      });
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
    shell?.classList.add(MAP_ELEMENT.shellReadyClass);
    shell?.classList.remove(MAP_ELEMENT.shellLoadingClass);
  }

  google.maps.event.addListenerOnce(map, 'idle', markMapReady);

  window.setTimeout(markMapReady, MAP_READY_FALLBACK_MS);
}
