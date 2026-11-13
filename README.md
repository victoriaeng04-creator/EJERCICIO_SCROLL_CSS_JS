# Ejercicio: la tienda se cuenta con el scroll

**Maquetación Web con Hojas de Estilo · Tema 2 · Animaciones ligadas al scroll**

La web de **La Aguja y el Tornillo** ya está maquetada con Tailwind. Tu trabajo es darle vida con el scroll:

- **Tareas 1 a 4**: animaciones ligadas al scroll **solo con CSS**, en `css/styles.css`.
- **Tarea 5**: scroll suave con la librería **Lenis**, en `js/main.js`.

Todo el HTML ya tiene las clases que necesitas (`.barra-progreso`, `.revelar`, `.marco-parallax`, `.portada-texto`...). No hace falta tocar el HTML salvo para enlazar Lenis.

> Prueba la web en Chrome, Edge, Safari 26 o Firefox 159 (o posteriores): son los navegadores que ya entienden estas animaciones.

---

## La receta (para todas las tareas)

```css
/* 1. Un @keyframes de los de siempre (fuera de capas) */
@keyframes aparecer {
    from { opacity: 0; transform: translateY(3rem); }
    to   { opacity: 1; transform: none; }
}

/* 2. Dentro del @supports y de @layer components */
.revelar {
    animation: aparecer linear both;   /* SIN duración */
    animation-timeline: view();        /* SIEMPRE después de "animation" */
    animation-range: entry 10% cover 30%;
}
```

Tres cosas que no se te pueden olvidar:

1. **Sin duración.** La animación no dura segundos: avanza con el scroll.
2. **`animation-timeline` después de `animation`.** El atajo `animation` la resetea; si la escribes antes, no funciona.
3. **`linear both`.** `linear` para que vaya al ritmo del scroll y `both` para que mantenga el estado inicial antes de empezar y el final al acabar.

Las dos líneas de tiempo:

| Línea de tiempo | Avanza mientras... | Para qué |
|---|---|---|
| `scroll(root)` | haces scroll en toda la página | Barras de progreso, fondos que cambian con la página |
| `view()` | el elemento cruza la pantalla | Entradas, parallax, salidas |

Y los rangos más útiles de `animation-range` con `view()`:

| Rango | Va desde... hasta... |
|---|---|
| `entry` | que el elemento asoma por abajo hasta que ha entrado entero |
| `exit` | que empieza a salir por arriba hasta que desaparece |
| `cover` | que asoma por abajo hasta que desaparece por arriba (todo el recorrido) |
| `contain` | el tramo en el que está entero dentro de la pantalla |

Juega con los rangos en este visualizador: [scroll-driven-animations.style · ranges](https://scroll-driven-animations.style/tools/view-timeline/ranges/)

---

## Tarea 1 · Barra de progreso de lectura

`.barra-progreso` es una línea fija arriba que empieza con `transform: scaleX(0)`. Haz que crezca hasta `scaleX(1)` a medida que bajas por la página.

- Línea de tiempo: `scroll(root)`.
- No hace falta `animation-range`.

## Tarea 2 · Los bloques aparecen al verse

Todos los `.revelar` (títulos, hitos de la historia, tarjetas) deben aparecer suavemente cuando entran en pantalla: de transparentes y un poco más abajo, a su sitio.

- Línea de tiempo: `view()`.
- Empieza con `animation-range: entry 10% cover 30%` y prueba otros valores.
- **Bonus:** en escritorio las tarjetas van de tres en tres. Haz que la 2.ª y la 3.ª de cada fila entren un poco más tarde cambiando su `animation-range` con `.tarjeta:nth-child(3n + 2)` y `.tarjeta:nth-child(3n)`.

## Tarea 3 · Parallax de la foto

La foto de la portada (`.marco-parallax img`) mide un 125 % de alto y el marco recorta lo que sobra. Haz que se mueva más despacio que la página: de `translateY(-20%)` a `translateY(0)`.

- Línea de tiempo: `view()`, sin rango (todo el recorrido).

## Tarea 4 · La portada se aleja

Cuando empiezas a bajar, el texto de la portada (`.portada-texto`) se desvanece, sube un poco y se hace algo más pequeño.

- Línea de tiempo: `view()`.
- Rango: `exit 0% exit 90%` (solo mientras sale de pantalla).

## Tarea 5 · Scroll suave con Lenis

1. En `index.html`, en los huecos marcados:
   ```html
   <!-- en el <head>, antes de css/styles.css -->
   <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.27/dist/lenis.css">

   <!-- al final del <body>, ANTES de js/main.js -->
   <script src="https://unpkg.com/lenis@1.3.27/dist/lenis.min.js"></script>
   ```
2. En `js/main.js`:
   ```js
   const lenis = new Lenis({
       autoRaf: true,
       anchors: { offset: -80 }   // enlaces del menú suaves, sin quedar tapados por la cabecera
   });
   ```
3. Prueba a añadir `lerp: 0.05` o `lerp: 0.2` y nota la diferencia.

Fíjate en que las animaciones de las tareas 1 a 4 siguen funcionando: Lenis mueve el scroll de verdad de la página, así que todo lo que depende del scroll lo acompaña.

> No uses `scroll-behavior: smooth` en tu CSS si usas Lenis: el suavizado ya lo hace él y los dos juntos se pelean.

---

## Extras

**Extra 1 · La línea del tiempo se dibuja.** La línea vertical de la historia es el `::before` de `.linea-tiempo`. Haz que crezca de `scaleY(0)` a `scaleY(1)` mientras recorres la lista. Como el `::before` necesita la línea de tiempo de la lista, ponle nombre: `view-timeline-name: --historia` en `.linea-tiempo` y `animation-timeline: --historia` en su `::before`.

**Extra 2 · Escaparate horizontal.** Ahora el escaparate es una fila que se desliza de lado. Conviértelo en una sección que, al bajar, mueve las piezas hacia la izquierda:

- `.escaparate`: `height: 300vh` y `view-timeline-name: --escaparate`.
- `.escaparate-fijo`: `position: sticky; top: 0; height: 100vh; overflow: hidden;`.
- `.escaparate-pista`: `width: max-content` y una animación con `transform: translateX(calc(-100% + 100vw))`, con `animation-timeline: --escaparate` y `animation-range: contain 0% contain 100%`.

**Extra 3 · Movimiento reducido.** Comprueba que el bloque `@media (prefers-reduced-motion: reduce)` del final de `styles.css` desactiva tus animaciones. Lenis ya lo respeta solo.

---

## Y después, a vuestra práctica

Llevad a la web de la Práctica 1 **al menos un efecto** de los de hoy. Las animaciones con CSS cuentan en el criterio 4 de la rúbrica (CSS propio y animaciones) y Lenis os vale como librería de JavaScript extra (criterio 5).

## Documentación

- MDN: [guía de scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) · [animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) · [animation-range](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range) (en inglés)
- Chrome for Developers: [Animate elements on scroll with scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- WebKit: [A guide to scroll-driven animations with just CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)
- Visualizador de rangos: [scroll-driven-animations.style](https://scroll-driven-animations.style/tools/view-timeline/ranges/)
- Lenis: [github.com/darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)
