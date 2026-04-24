import { MAP_ELEMENT } from '../constants/dom/map.js';
import { GOOGLE_MAP_EMBED_STYLES } from './googleMapStyles';

const ESTATE_COORDINATES = { lat: 54.291652, lng: 27.480454 };

/** Fallback if `idle` never fires (offline API, blocked maps, etc.). */
const MAP_READY_FALLBACK_MS = 15_000;

export function googleMapInit() {
  const mapEl = document.getElementById(MAP_ELEMENT.canvasId);
  const shell = document.getElementById(MAP_ELEMENT.shellId);

  if (!mapEl || typeof google === 'undefined' || !google.maps) {
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
