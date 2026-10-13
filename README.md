# Trivia Colombia

Juego de preguntas sobre Colombia para un jugador. Incluye categorías, niveles de
dificultad, comodines, temporizador, resultados, ranking y estadísticas guardados
en el navegador mediante `localStorage`.

## Tecnologías

- HTML5 semántico
- CSS3 responsive
- JavaScript moderno (ES6+)
- `localStorage` del navegador

## Estructura del proyecto

```text
trivia-colombia/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── preguntas.js
│   ├── seleccion.js
│   ├── storage.js
│   └── app.js
└── README.md
```

## Ejecutar localmente

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Instala la extensión **Live Server** si todavía no la tienes.
3. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
4. Abre la dirección local que muestra VS Code, normalmente `http://127.0.0.1:5500`.
5. Juega una partida y comprueba el ranking. Los puntajes, estadísticas y
   preferencias quedan guardados en el almacenamiento local de ese navegador y
   origen.

Usar Live Server (HTTP) permite probar `localStorage` de forma consistente. Los
datos no se comparten entre navegadores ni entre distintas direcciones de origen.

## Publicar en GitHub

1. Inicia sesión en GitHub y crea un repositorio **público** llamado
   `trivia-colombia`. Para este flujo, créalo vacío, sin README ni archivos
   iniciales.
2. Abre una terminal en la carpeta raíz del proyecto y ejecuta:

   ```bash
   git init
   git add .
   git commit -m "Crear Trivia Colombia"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/trivia-colombia.git
   git push -u origin main
   ```

3. Sustituye `TU-USUARIO` por tu nombre de usuario de GitHub. Si el proyecto ya
   tiene Git inicializado o un remoto configurado, conserva esa configuración y
   no repitas `git init` ni `git remote add`.

## Desplegar en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com/) o inicia sesión.
2. Selecciona **Add New... → Project** y conecta tu cuenta de GitHub si hace
   falta.
3. Importa el repositorio `trivia-colombia`.
4. En la configuración del proyecto selecciona:
   - **Framework Preset:** Other
   - **Build Command:** vacío / sin comando
   - **Output Directory:** `.` (raíz del proyecto)
   - **Root Directory:** `./`
5. Pulsa **Deploy**. Al finalizar, Vercel mostrará la URL pública del juego.
6. Los siguientes `git push` a la rama conectada (normalmente `main`) iniciarán
   automáticamente un nuevo despliegue.

No se necesita servidor ni paso de compilación: Vercel publica directamente el
`index.html` y sus archivos estáticos.

## Capturas de pantalla

Para documentar el diseño, crea una carpeta `capturas/`, guarda allí imágenes de
la pantalla inicial, una pregunta, los resultados y el ranking, y enlázalas desde
esta sección. Por ejemplo:

```markdown
![Pantalla inicial](./capturas/inicio.png)
![Ranking](./capturas/ranking.png)
```
