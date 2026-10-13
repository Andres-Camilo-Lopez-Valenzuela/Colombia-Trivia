/*
  Lógica principal de Trivia Colombia.
  Este archivo se carga como script clásico después de preguntas.js, seleccion.js
  y storage.js, por lo que usa sus bindings globales sin import/export.
*/

const DURACION_PREGUNTA = 20;
const TIEMPO_EXTRA_SEGUNDOS = 10;
const PENALIZACION_COMODIN = 30;
const DEMORA_RETROALIMENTACION = 2500;

// Referencias a pantallas y controles del formulario.
const pantallaInicio = document.getElementById("inicio");
const pantallaJuego = document.getElementById("juego");
const pantallaRetroalimentacion = document.getElementById("retroalimentacion");
const pantallaResultados = document.getElementById("resultados");
const pantallaRanking = document.getElementById("ranking");
const formularioInicio = document.getElementById("setup-form");
const inputNombre = document.getElementById("player-name");
const selectorCategoria = document.getElementById("category-select");
const selectorDificultad = document.getElementById("difficulty-select");

// Referencias a los elementos que cambian durante la partida.
const nombreJugadorJuego = document.getElementById("game-player-name");
const categoriaJuego = document.getElementById("game-category");
const dificultadJuego = document.getElementById("game-difficulty");
const contadorPregunta = document.getElementById("question-count");
const textoPregunta = document.getElementById("question-text");
const etiquetaCategoriaPregunta = document.getElementById("question-category-label");
const puntajeActual = document.getElementById("current-score");
const temporizador = document.getElementById("timer");
const tiempoRestanteTexto = document.getElementById("time-remaining");
const progresoPreguntas = document.getElementById("question-progress");
const barraProgreso = document.getElementById("progress-bar");
const progresoTiempo = document.getElementById("time-progress");
const barraTiempo = document.getElementById("time-bar");
const botonesOpciones = [...document.querySelectorAll("#answer-options .answer-option")];
const boton5050 = document.getElementById("fifty-fifty");
const botonTiempoExtra = document.getElementById("extra-time");
const tarjetaRetroalimentacion = document.getElementById("feedback-card");
const tituloRetroalimentacion = document.getElementById("feedback-title");
const respuestaCorrectaTexto = document.getElementById("correct-answer");
const explicacionTexto = document.getElementById("answer-explanation");
const botonContinuar = document.getElementById("next-question");

// Referencias a los resultados y a la navegación entre pantallas.
const nombreJugadorResultados = document.getElementById("results-player-name");
const puntajeFinal = document.getElementById("final-score");
const aciertosResultado = document.getElementById("correct-count");
const erroresResultado = document.getElementById("incorrect-count");
const tiempoTotalResultado = document.getElementById("total-time");
const mejorRachaResultado = document.getElementById("best-streak");
const estadisticasPartidas = document.getElementById("statistics-games");
const estadisticasAciertos = document.getElementById("statistics-correct");
const estadisticasErrores = document.getElementById("statistics-incorrect");
const estadisticasMejorPuntaje = document.getElementById("statistics-best-score");
const estadisticasMejorRacha = document.getElementById("statistics-best-streak");
const cuerpoRanking = document.getElementById("ranking-entries");
const botonJugarDeNuevo = document.getElementById("play-again");
const botonVerRanking = document.getElementById("show-ranking");
const botonVolverInicio = document.getElementById("back-to-home");

// Estado completo de una partida individual.
const estado = {
  nombreJugador: "",
  categoria: "Todas",
  dificultad: "Fácil",
  preguntasRonda: [],
  indiceActual: 0,
  puntaje: 0,
  aciertos: 0,
  errores: 0,
  rachaActual: 0,
  mejorRacha: 0,
  comodinesUsados: {
    cincuentaCincuenta: false,
    tiempoExtra: false
  },
  penalizacionComodines: 0,
  tiempoRestante: DURACION_PREGUNTA,
  tiempoMaximoPregunta: DURACION_PREGUNTA,
  tiempoTotal: 0,
  temporizadorActivo: null,
  esperaRetroalimentacion: null,
  respuestaBloqueada: false,
  respuestasJugador: []
};

// Muestra una pantalla y oculta el resto.
const mostrarPantalla = (idPantalla) => {
  const pantallas = [
    pantallaInicio,
    pantallaJuego,
    pantallaRetroalimentacion,
    pantallaResultados,
    pantallaRanking
  ];
  const pantallaDestino = document.getElementById(idPantalla);

  if (!pantallas.includes(pantallaDestino)) {
    console.error(`No existe una pantalla válida con el id "${idPantalla}".`);
    return;
  }

  const mostrarJuegoConRetroalimentacion =
    pantallaDestino === pantallaRetroalimentacion;

  pantallas.forEach((pantalla) => {
    const esVisible =
      pantalla === pantallaDestino ||
      (mostrarJuegoConRetroalimentacion && pantalla === pantallaJuego);
    pantalla.hidden = !esVisible;
    pantalla.classList.toggle("screen--active", esVisible);
  });

  pantallaJuego.inert = mostrarJuegoConRetroalimentacion;
  pantallaJuego.setAttribute(
    "aria-hidden",
    String(mostrarJuegoConRetroalimentacion)
  );

  if (mostrarJuegoConRetroalimentacion) {
    botonContinuar.focus();
  }
};

// Convierte segundos en minutos y segundos (m:ss).
const formatearTiempo = (segundos) => {
  const minutos = Math.floor(segundos / 60);
  const restoSegundos = segundos % 60;
  return `${minutos}:${String(restoSegundos).padStart(2, "0")}`;
};

// Calcula la bonificación de rapidez a partir del tiempo que queda.
const calcularBonificacionRapidez = (tiempoRestante) =>
  Math.min(tiempoRestante * 5, 100);

// Devuelve el multiplicador correspondiente al nivel elegido.
const obtenerMultiplicador = (dificultad) => {
  const multiplicadores = {
    "Fácil": 1,
    "Medio": 1.5,
    "Difícil": 2
  };
  return multiplicadores[dificultad] ?? 1;
};

// Detiene el intervalo y cualquier avance automático pendiente.
const detenerTemporizador = () => {
  if (estado.temporizadorActivo !== null) {
    window.clearInterval(estado.temporizadorActivo);
    estado.temporizadorActivo = null;
  }

  if (estado.esperaRetroalimentacion !== null) {
    window.clearTimeout(estado.esperaRetroalimentacion);
    estado.esperaRetroalimentacion = null;
  }
};

// Actualiza el número, la barra y el aviso visual del tiempo.
const actualizarTemporizador = () => {
  tiempoRestanteTexto.textContent = String(estado.tiempoRestante);
  temporizador.setAttribute("aria-label", `${estado.tiempoRestante} segundos restantes`);
  progresoTiempo.setAttribute("aria-valuemax", String(estado.tiempoMaximoPregunta));
  progresoTiempo.setAttribute("aria-valuenow", String(estado.tiempoRestante));
  barraTiempo.style.width =
    `${(estado.tiempoRestante / estado.tiempoMaximoPregunta) * 100}%`;

  const quedaPocoTiempo =
    estado.tiempoRestante <= Math.ceil(estado.tiempoMaximoPregunta * 0.25);
  temporizador.classList.toggle("timer--low", quedaPocoTiempo);
  progresoTiempo.classList.toggle("is-low", quedaPocoTiempo);
};

// Decrementa el contador una vez por segundo y registra el agotamiento del tiempo.
const iniciarTemporizador = () => {
  detenerTemporizador();
  estado.temporizadorActivo = window.setInterval(() => {
    estado.tiempoRestante = Math.max(0, estado.tiempoRestante - 1);
    actualizarTemporizador();

    if (estado.tiempoRestante === 0) {
      responder(null);
    }
  }, 1000);
};

// Habilita o deshabilita las opciones de respuesta.
const establecerOpcionesHabilitadas = (habilitadas) => {
  botonesOpciones.forEach((boton) => {
    boton.disabled = !habilitadas;
  });
};

// Actualiza enunciado, opciones, progreso, puntaje y temporizador.
const cargarPregunta = () => {
  const pregunta = estado.preguntasRonda[estado.indiceActual];

  if (!pregunta) {
    finalizarPartida();
    return;
  }

  estado.respuestaBloqueada = false;
  estado.tiempoRestante = DURACION_PREGUNTA;
  estado.tiempoMaximoPregunta = DURACION_PREGUNTA;
  textoPregunta.textContent = pregunta.pregunta;
  etiquetaCategoriaPregunta.textContent = pregunta.categoria;
  contadorPregunta.textContent =
    `Pregunta ${estado.indiceActual + 1} de ${estado.preguntasRonda.length}`;
  puntajeActual.textContent = String(estado.puntaje);
  progresoPreguntas.setAttribute("aria-valuemax", String(estado.preguntasRonda.length));
  progresoPreguntas.setAttribute("aria-valuenow", String(estado.indiceActual));
  barraProgreso.style.width =
    `${(estado.indiceActual / estado.preguntasRonda.length) * 100}%`;

  botonesOpciones.forEach((boton, indice) => {
    boton.hidden = false;
    boton.disabled = false;
    boton.classList.remove("is-correct", "is-incorrect");
    boton.querySelector(".answer-option__text").textContent = pregunta.opciones[indice];
  });

  boton5050.disabled = estado.comodinesUsados.cincuentaCincuenta;
  botonTiempoExtra.disabled = estado.comodinesUsados.tiempoExtra;
  actualizarTemporizador();
  iniciarTemporizador();
  textoPregunta.tabIndex = -1;
  textoPregunta.focus();
};

// Inicia una nueva partida con los valores seleccionados en el formulario.
const iniciarPartida = () => {
  const nombre = inputNombre.value.trim();

  if (!nombre) {
    inputNombre.setCustomValidity("Escribe tu nombre para comenzar.");
    inputNombre.reportValidity();
    inputNombre.setCustomValidity("");
    inputNombre.focus();
    return;
  }

  detenerTemporizador();
  estado.nombreJugador = nombre;
  estado.categoria = selectorCategoria.value;
  estado.dificultad = selectorDificultad.value;

  const ronda = prepararRonda(
    preguntas,
    estado.categoria,
    estado.dificultad
  );

  if (ronda.length === 0) {
    console.error(
      `No se pudo iniciar la partida: no hay preguntas para ` +
      `"${estado.categoria}" / "${estado.dificultad}".`
    );
    return;
  }

  estado.preguntasRonda = ronda;
  estado.indiceActual = 0;
  estado.puntaje = 0;
  estado.aciertos = 0;
  estado.errores = 0;
  estado.rachaActual = 0;
  estado.mejorRacha = 0;
  estado.comodinesUsados = {
    cincuentaCincuenta: false,
    tiempoExtra: false
  };
  estado.penalizacionComodines = 0;
  estado.tiempoTotal = 0;
  estado.respuestasJugador = [];

  nombreJugadorJuego.textContent = estado.nombreJugador;
  categoriaJuego.textContent = estado.categoria;
  dificultadJuego.textContent = estado.dificultad;
  mostrarPantalla("juego");
  cargarPregunta();
};

// Enseña la respuesta correcta, la explicación y el resultado de la respuesta.
const mostrarRetroalimentacion = (pregunta, indiceOpcion, fueCorrecta) => {
  botonesOpciones.forEach((boton, indice) => {
    boton.disabled = true;
    if (indice === pregunta.correcta) {
      boton.classList.add("is-correct");
    } else if (indice === indiceOpcion && !fueCorrecta) {
      boton.classList.add("is-incorrect");
    }
  });

  tarjetaRetroalimentacion.classList.toggle("is-correct", fueCorrecta);
  tarjetaRetroalimentacion.classList.toggle("is-incorrect", !fueCorrecta);
  tituloRetroalimentacion.textContent = fueCorrecta
    ? "¡Respuesta correcta!"
    : indiceOpcion === null
      ? "¡Se acabó el tiempo!"
      : "Respuesta incorrecta";
  respuestaCorrectaTexto.textContent = pregunta.opciones[pregunta.correcta];
  explicacionTexto.textContent = pregunta.explicacion;
  mostrarPantalla("retroalimentacion");
};

// Evalúa una opción; null representa que se agotó el tiempo.
const responder = (indiceOpcion) => {
  if (estado.respuestaBloqueada) {
    return;
  }

  const pregunta = estado.preguntasRonda[estado.indiceActual];
  if (!pregunta) {
    return;
  }

  estado.respuestaBloqueada = true;
  detenerTemporizador();

  const fueCorrecta = indiceOpcion === pregunta.correcta;
  const tiempoUsado = estado.tiempoMaximoPregunta - estado.tiempoRestante;
  estado.tiempoTotal += tiempoUsado;
  let puntosGanados = 0;

  if (fueCorrecta) {
    estado.aciertos += 1;
    estado.rachaActual += 1;
    estado.mejorRacha = Math.max(estado.mejorRacha, estado.rachaActual);

    const bonificacionRapidez = calcularBonificacionRapidez(estado.tiempoRestante);
    const multiplicador = obtenerMultiplicador(estado.dificultad);
    puntosGanados = Math.round((100 + bonificacionRapidez) * multiplicador);

    if (estado.rachaActual >= 3) {
      puntosGanados += 50;
    }

    estado.puntaje += puntosGanados;
  } else {
    estado.errores += 1;
    estado.rachaActual = 0;
  }

  puntajeActual.textContent = String(estado.puntaje);
  estado.respuestasJugador.push({
    preguntaId: pregunta.id,
    opcionElegida: indiceOpcion,
    correcta: fueCorrecta,
    puntosGanados,
    tiempoUsado
  });

  mostrarRetroalimentacion(pregunta, indiceOpcion, fueCorrecta);
  estado.esperaRetroalimentacion = window.setTimeout(
    avanzarPregunta,
    DEMORA_RETROALIMENTACION
  );
};

// Continúa con la pregunta siguiente o finaliza la ronda.
const avanzarPregunta = () => {
  if (estado.esperaRetroalimentacion !== null) {
    window.clearTimeout(estado.esperaRetroalimentacion);
    estado.esperaRetroalimentacion = null;
  }

  estado.indiceActual += 1;

  if (estado.indiceActual >= estado.preguntasRonda.length) {
    finalizarPartida();
    return;
  }

  mostrarPantalla("juego");
  cargarPregunta();
};

// Usa el comodín 50/50: oculta dos opciones incorrectas y aplica la penalización.
const usarComodin5050 = () => {
  if (estado.comodinesUsados.cincuentaCincuenta || estado.respuestaBloqueada) {
    return;
  }

  const pregunta = estado.preguntasRonda[estado.indiceActual];
  const incorrectas = mezclarArray(
    botonesOpciones.filter((_, indice) => indice !== pregunta.correcta)
  ).slice(0, 2);

  incorrectas.forEach((boton) => {
    boton.hidden = true;
  });

  estado.comodinesUsados.cincuentaCincuenta = true;
  estado.penalizacionComodines += PENALIZACION_COMODIN;
  estado.puntaje -= PENALIZACION_COMODIN;
  puntajeActual.textContent = String(estado.puntaje);
  boton5050.disabled = true;
};

// Añade diez segundos una sola vez y aplica la penalización del comodín.
const usarComodinTiempo = () => {
  if (estado.comodinesUsados.tiempoExtra || estado.respuestaBloqueada) {
    return;
  }

  estado.comodinesUsados.tiempoExtra = true;
  estado.penalizacionComodines += PENALIZACION_COMODIN;
  estado.puntaje -= PENALIZACION_COMODIN;
  estado.tiempoRestante += TIEMPO_EXTRA_SEGUNDOS;
  estado.tiempoMaximoPregunta += TIEMPO_EXTRA_SEGUNDOS;
  puntajeActual.textContent = String(estado.puntaje);
  botonTiempoExtra.disabled = true;
  actualizarTemporizador();
};

// Prepara el resumen y persiste puntajes, estadísticas y preferencias locales.
const finalizarPartida = () => {
  detenerTemporizador();
  estado.indiceActual = estado.preguntasRonda.length;
  barraProgreso.style.width = "100%";
  progresoPreguntas.setAttribute("aria-valuenow", String(estado.preguntasRonda.length));

  const resultado = {
    nombre: estado.nombreJugador,
    puntaje: estado.puntaje,
    categoria: estado.categoria,
    dificultad: estado.dificultad,
    aciertos: estado.aciertos,
    errores: estado.errores,
    mejorRacha: estado.mejorRacha,
    fecha: new Date().toISOString()
  };

  const estadisticasPrevias = obtenerEstadisticas();
  const estadisticasActualizadas = {
    partidasJugadas: estadisticasPrevias.partidasJugadas + 1,
    aciertosTotales: estadisticasPrevias.aciertosTotales + estado.aciertos,
    erroresTotales: estadisticasPrevias.erroresTotales + estado.errores,
    mejorPuntaje: Math.max(estadisticasPrevias.mejorPuntaje, estado.puntaje),
    mejorRacha: Math.max(estadisticasPrevias.mejorRacha, estado.mejorRacha)
  };

  nombreJugadorResultados.textContent = estado.nombreJugador;
  puntajeFinal.textContent = String(estado.puntaje);
  puntajeFinal.nextElementSibling.textContent = `de ${estado.preguntasRonda.length}`;
  aciertosResultado.textContent = String(estado.aciertos);
  erroresResultado.textContent = String(estado.errores);
  tiempoTotalResultado.textContent = formatearTiempo(estado.tiempoTotal);
  mejorRachaResultado.textContent = String(estado.mejorRacha);
  guardarEnRanking(resultado);
  guardarEstadisticas(estadisticasActualizadas);
  guardarPreferencias({
    ultimoNombre: estado.nombreJugador,
    ultimaCategoria: estado.categoria,
    ultimaDificultad: estado.dificultad
  });
  renderizarEstadisticas();
  mostrarPantalla("resultados");
};

// Renderiza el ranking local sin interpretar nombres como HTML.
const renderizarRanking = () => {
  const ranking = obtenerRanking();
  cuerpoRanking.replaceChildren();

  if (ranking.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.className = "ranking-table__empty";
    const mensaje = document.createElement("td");
    mensaje.colSpan = 6;
    mensaje.textContent = "Aún no hay partidas registradas.";
    filaVacia.append(mensaje);
    cuerpoRanking.append(filaVacia);
    return;
  }

  const formatoFecha = new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  ranking.forEach((jugador, indice) => {
    const fila = document.createElement("tr");
    const fecha = new Date(jugador.fecha);
    const valores = [
      String(indice + 1),
      jugador.nombre,
      String(jugador.puntaje),
      jugador.categoria,
      jugador.dificultad,
      Number.isNaN(fecha.getTime()) ? "Fecha no disponible" : formatoFecha.format(fecha)
    ];

    valores.forEach((valor) => {
      const celda = document.createElement("td");
      celda.textContent = valor;
      fila.append(celda);
    });
    cuerpoRanking.append(fila);
  });
};

// Actualiza los indicadores acumulados de la pantalla de resultados.
const renderizarEstadisticas = () => {
  const estadisticas = obtenerEstadisticas();
  estadisticasPartidas.textContent = String(estadisticas.partidasJugadas);
  estadisticasAciertos.textContent = String(estadisticas.aciertosTotales);
  estadisticasErrores.textContent = String(estadisticas.erroresTotales);
  estadisticasMejorPuntaje.textContent = String(estadisticas.mejorPuntaje);
  estadisticasMejorRacha.textContent = String(estadisticas.mejorRacha);
};

// Restaura las últimas opciones guardadas, cuando todavía coinciden con el formulario.
const cargarPreferencias = () => {
  const preferencias = obtenerPreferencias();

  if (typeof preferencias.ultimoNombre === "string") {
    inputNombre.value = preferencias.ultimoNombre;
  }

  const categoriasDisponibles = [...selectorCategoria.options].map((opcion) => opcion.value);
  if (categoriasDisponibles.includes(preferencias.ultimaCategoria)) {
    selectorCategoria.value = preferencias.ultimaCategoria;
  }

  const dificultadesDisponibles = [...selectorDificultad.options].map((opcion) => opcion.value);
  if (dificultadesDisponibles.includes(preferencias.ultimaDificultad)) {
    selectorDificultad.value = preferencias.ultimaDificultad;
  }
};

// El envío del formulario inicia la partida sin recargar la página.
formularioInicio.addEventListener("submit", (evento) => {
  evento.preventDefault();
  iniciarPartida();
});

// Conecta botones de respuesta, comodines y navegación.
botonesOpciones.forEach((boton) => {
  boton.addEventListener("click", () => {
    responder(Number(boton.dataset.option));
  });
});

boton5050.addEventListener("click", usarComodin5050);
botonTiempoExtra.addEventListener("click", usarComodinTiempo);
botonContinuar.addEventListener("click", avanzarPregunta);
botonJugarDeNuevo.addEventListener("click", iniciarPartida);
botonVerRanking.addEventListener("click", () => {
  renderizarRanking();
  mostrarPantalla("ranking");
});
botonVolverInicio.addEventListener("click", () => mostrarPantalla("inicio"));

cargarPreferencias();
