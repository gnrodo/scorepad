# 🎾 Botonera de Pádel

App web para registrar un partido de pádel **punto por punto** desde el costado
de la cancha: quién definió cada punto (winner, error forzado o no forzado),
asistencias, marcador por sets, estadísticas en vivo y resumen exportable.

**Usala acá → https://gnrodo.github.io/botonera-padel/**

## Características

- **Archivo de partidos**: cada partido se guarda solo, punto por punto, en el
  dispositivo (localStorage — sin cuentas ni servidor). Podés tener varios
  partidos a la vez, continuarlos, verlos y borrarlos.
- **Marcador por sets**: columnas Set 1 / Set 2 / Set 3 + punto en curso, con
  tie-break y súper tie-break decisivo opcional.
- **Punto de oro** opcional y configuración del saque en cancha.
- **Código PADEL1**: el resumen incluye un código para retomar el partido en
  cualquier dispositivo, pegándolo en "Retomar".
- **Estadísticas por jugador**: winners, asistencias, errores y un score de
  contribución (2·W + 1·A − 1·EF − 2·UE).
- Diseño "planilla de torneo" en paleta pádel: verde bosque, verde césped y
  amarillo pelota. Mobile-first, botones grandes para usar con el pulgar.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | La app completa (HTML/CSS/JS vanilla) |
| `store.js` | Archivo local de partidos (localStorage) |

Sin dependencias ni build. Servido por GitHub Pages; las tipografías
(Anton + Space Mono) vienen de Google Fonts.
