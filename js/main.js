/* =========================================================
   main.js · TAREA 5 · Scroll suave con Lenis
   Docs: https://github.com/darkroomengineering/lenis
   =========================================================

   1. Enlaza en index.html el CSS y el JS de Lenis desde el CDN (huecos marcados).
   2. Crea aquí la instancia con autoRaf: true.
   3. Haz que los enlaces del menú bajen suave y dejen hueco a la cabecera
      (opción anchors con un offset negativo).
   4. Prueba a cambiar lerp (entre 0 y 1) y fíjate en la diferencia.

*/

// Escribe aquí tu código
const lenis = new Lenis ({
   autoRaf: true, // se activa el bucle de animación
   lerp: 0.05, // suavidad del scroll entre 0 y 1 
   anchors: {
      offset: -60
   } // Scroll a secciones suavizado y offset de 60 px pra que encaje el menu 
})