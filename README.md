# OVA: Bilingüismo para la Paz (Bilingüe ES / EN)

**Autoras:**
- Ana María Arévalo Patiño — I. E. Camilo Torres (Sede Mocarí, Montería)
- Rosa Ballesteros — Sede La Ribera (Montería)
- Universidad de Córdoba · Práctica Pedagógica (2026)

## Estructura de la carpeta

```text
ova-bilinguismo-para-la-paz/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   ├── evidencia-01.svg ... evidencia-06.svg
├── docs/
│   └── ejemplo-backward-design.html
└── videos/
    └── LEEME.txt
```

## 1. Cómo probarlo en tu computador
1. Descomprime el archivo `.zip`.
2. Haz doble clic sobre `index.html`. Se abrirá directamente en tu navegador (Chrome, Edge, Safari o Firefox) sin instalar nada.
3. Usa los botones **ES / EN** en la esquina superior derecha para cambiar el idioma de todo el OVA.

## 2. Cómo agregar tus fotos y planes de clase reales
- **Fotos de evidencias:** Guarda tus fotos (JPG, PNG o WebP, sin tildes ni espacios) dentro de `images/` con nombres como `evidencia-01.jpg`, `evidencia-02.jpg`, etc. Luego abre `js/app.js`, busca la lista `EVIDENCES` y cambia `.svg` por `.jpg` (y ajusta el título o descripción si deseas).
- **Planes de clase en PDF:** Guarda tus archivos en `docs/` con los nombres:
  - `docs/plan-clase-mocari.pdf`
  - `docs/plan-clase-ribera.pdf`
  Los botones del Módulo 2 ya están apuntando a esos nombres exactos.
- **Video opcional:** Guarda un video corto en `videos/intro.mp4` y reemplaza el bloque `<div class="video-callout">...</div>` en `index.html` por:
  ```html
  <video controls playsinline style="width:100%; border-radius:14px; margin-top:1.5rem;">
    <source src="videos/intro.mp4" type="video/mp4">
  </video>
  ```

## 3. Cómo publicarlo en GitHub Pages
1. Entra a tu cuenta en GitHub y crea un repositorio público nuevo (por ejemplo: `ova-bilinguismo-paz`).
2. Haz clic en **Add file → Upload files** y arrastra **el contenido** de esta carpeta (`index.html`, `css/`, `js/`, `images/`, `docs/`, `videos/`, `README.md`) para que `index.html` quede en la raíz.
3. Escribe un mensaje de commit (por ejemplo: `Primera version del OVA`) y haz clic en **Commit changes**.
4. Ve a **Settings → Pages**.
5. En **Branch**, elige `main` y la carpeta `/(root)`, y haz clic en **Save**.
6. En 1 a 2 minutos tendrás tu enlace público: `https://tu-usuario.github.io/ova-bilinguismo-paz/`.
