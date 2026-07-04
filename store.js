/* =========================================================================
   PadelStore — persistencia local de partidos de la Botonera de Pádel.
   Guarda los partidos en localStorage del dispositivo (sin servidor).
   Cada partido: {id, createdAt, updatedAt, finished, names[4], sets[2],
   line, payload:{c,l}} donde payload usa el MISMO formato que el código
   PADEL1 (c=config, l=log de puntos), así continuar un partido reusa el
   mecanismo de "retomar" ya existente.
   ========================================================================= */
(function () {
  "use strict";
  const KEY = "padel.matches.v1";
  const MAX = 60; // tope de partidos guardados; se descartan los más viejos

  let ok = true;
  try {
    const t = "__padel_probe__";
    localStorage.setItem(t, "1");
    localStorage.removeItem(t);
  } catch (e) {
    ok = false; // modo incógnito/bloqueado: la app funciona igual, sin historial
  }

  function read() {
    if (!ok) return [];
    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function write(arr) {
    if (!ok) return false;
    try {
      localStorage.setItem(KEY, JSON.stringify(arr));
      return true;
    } catch (e) {
      return false; // storage lleno: no rompemos el partido en curso
    }
  }

  window.PadelStore = {
    get ok() { return ok; },

    list() {
      return read().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    },

    get(id) {
      return read().find(m => m.id === id) || null;
    },

    upsert(m) {
      const arr = read();
      const i = arr.findIndex(x => x.id === m.id);
      if (i >= 0) arr[i] = m; else arr.push(m);
      if (arr.length > MAX) {
        arr.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        arr.length = MAX;
      }
      return write(arr);
    },

    remove(id) {
      write(read().filter(m => m.id !== id));
    },

    newId() {
      return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
    },

    fmtDate(ts) {
      const d = new Date(ts);
      const p = n => String(n).padStart(2, "0");
      return p(d.getDate()) + "/" + p(d.getMonth() + 1) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
    }
  };
})();
