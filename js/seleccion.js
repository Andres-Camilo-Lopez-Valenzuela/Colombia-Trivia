/*
  Utilidades puras para seleccionar una ronda y mezclar las opciones.
  Este archivo usa scripts clásicos (no módulos ES) para compartir las funciones
  con app.js mediante los scripts deferidos incluidos en index.html.
*/

// Devuelve una copia mezclada mediante Fisher-Yates; el arreglo recibido no cambia.
const mezclarArray = (array) => {
  const mezcla = [...array];

  for (let indice = mezcla.length - 1; indice > 0; indice -= 1) {
    const indiceAleatorio = Math.floor(Math.random() * (indice + 1));
    [mezcla[indice], mezcla[indiceAleatorio]] = [
      mezcla[indiceAleatorio],
      mezcla[indice]
    ];
  }

  return mezcla;
};

// Filtra, mezcla y limita las preguntas; informa si los filtros no alcanzan la cantidad solicitada.
const seleccionarPreguntas = (preguntas, categoria, dificultad, cantidad = 10) => {
  const filtradas = preguntas.filter((pregunta) => {
    const coincideCategoria = categoria === "Todas" || pregunta.categoria === categoria;
    return coincideCategoria && pregunta.dificultad === dificultad;
  });

  if (filtradas.length < cantidad) {
    console.warn(
      `Solo hay ${filtradas.length} pregunta(s) para la categoría "${categoria}" ` +
      `y dificultad "${dificultad}"; se devolverán todas las disponibles.`
    );
  }

  return mezclarArray(filtradas).slice(0, cantidad);
};

// Mezcla las opciones en una pregunta nueva y conserva la respuesta correcta.
const mezclarOpciones = (pregunta) => {
  const opcionesConIndice = pregunta.opciones.map((opcion, indiceOriginal) => ({
    opcion,
    indiceOriginal
  }));
  const opcionesMezcladas = mezclarArray(opcionesConIndice);

  return {
    ...pregunta,
    opciones: opcionesMezcladas.map(({ opcion }) => opcion),
    correcta: opcionesMezcladas.findIndex(
      ({ indiceOriginal }) => indiceOriginal === pregunta.correcta
    )
  };
};

// Prepara la ronda mezclando tanto el orden de las preguntas como sus opciones.
const prepararRonda = (preguntas, categoria, dificultad, cantidad = 10) =>
  seleccionarPreguntas(preguntas, categoria, dificultad, cantidad)
    .map((pregunta) => mezclarOpciones(pregunta));

/*
  Ejemplo de uso desde app.js, después de cargar preguntas.js y seleccion.js:

  const ronda = prepararRonda(preguntas, "Geografía", "Fácil");
  console.log(ronda);

  El resultado es un arreglo de hasta 10 objetos de pregunta. Cada uno conserva
  id, categoria, dificultad, pregunta y explicacion; sus opciones están mezcladas
  y correcta indica el nuevo índice (0-3) de la opción correcta.
*/
