/*
  Persistencia local de Trivia Colombia.
  Los datos se guardan únicamente en el navegador, sin servidor ni cuenta.
*/

const CLAVE_RANKING = "triviaColombia_ranking";
const CLAVE_ESTADISTICAS = "triviaColombia_estadisticas";
const CLAVE_PREFERENCIAS = "triviaColombia_preferencias";

const ESTADISTICAS_INICIALES = {
  partidasJugadas: 0,
  aciertosTotales: 0,
  erroresTotales: 0,
  mejorPuntaje: 0,
  mejorRacha: 0
};

// Lee una lista de puntajes y devuelve una lista vacía si no hay datos válidos.
const obtenerRanking = () => {
  try {
    const datos = window.localStorage.getItem(CLAVE_RANKING);
    if (datos === null) {
      return [];
    }

    const ranking = JSON.parse(datos);
    if (!Array.isArray(ranking)) {
      throw new TypeError("El formato del ranking guardado no es válido.");
    }

    return ranking;
  } catch (error) {
    console.error("No se pudo leer el ranking local.", error);
    return [];
  }
};

// Añade un resultado, lo ordena por puntaje y conserva únicamente los diez mejores.
const guardarEnRanking = (jugador) => {
  try {
    const ranking = obtenerRanking();
    ranking.push(jugador);
    ranking.sort((a, b) => Number(b.puntaje) - Number(a.puntaje));
    const topDiez = ranking.slice(0, 10);
    window.localStorage.setItem(CLAVE_RANKING, JSON.stringify(topDiez));
    return true;
  } catch (error) {
    console.error("No se pudo guardar la partida en el ranking local.", error);
    return false;
  }
};

// Borra el ranking local; se usa para reiniciar datos durante pruebas.
const limpiarRanking = () => {
  try {
    window.localStorage.removeItem(CLAVE_RANKING);
    return true;
  } catch (error) {
    console.error("No se pudo limpiar el ranking local.", error);
    return false;
  }
};

// Lee estadísticas acumuladas y completa cualquier valor ausente con cero.
const obtenerEstadisticas = () => {
  try {
    const datos = window.localStorage.getItem(CLAVE_ESTADISTICAS);
    if (datos === null) {
      return { ...ESTADISTICAS_INICIALES };
    }

    const estadisticas = JSON.parse(datos);
    if (!estadisticas || typeof estadisticas !== "object" || Array.isArray(estadisticas)) {
      throw new TypeError("El formato de las estadísticas guardadas no es válido.");
    }

    const valoresCompletos = {
      ...ESTADISTICAS_INICIALES,
      ...estadisticas
    };

    Object.keys(ESTADISTICAS_INICIALES).forEach((clave) => {
      const valor = Number(valoresCompletos[clave]);
      valoresCompletos[clave] =
        Number.isFinite(valor) && valor >= 0
          ? valor
          : ESTADISTICAS_INICIALES[clave];
    });

    return valoresCompletos;
  } catch (error) {
    console.error("No se pudieron leer las estadísticas locales.", error);
    return { ...ESTADISTICAS_INICIALES };
  }
};

// Guarda el objeto de estadísticas acumuladas.
const guardarEstadisticas = (estadisticas) => {
  try {
    window.localStorage.setItem(CLAVE_ESTADISTICAS, JSON.stringify(estadisticas));
    return true;
  } catch (error) {
    console.error("No se pudieron guardar las estadísticas locales.", error);
    return false;
  }
};

// Lee las últimas preferencias usadas y devuelve un objeto vacío si no hay datos.
const obtenerPreferencias = () => {
  try {
    const datos = window.localStorage.getItem(CLAVE_PREFERENCIAS);
    if (datos === null) {
      return {};
    }

    const preferencias = JSON.parse(datos);
    if (!preferencias || typeof preferencias !== "object" || Array.isArray(preferencias)) {
      throw new TypeError("El formato de las preferencias guardadas no es válido.");
    }

    return preferencias;
  } catch (error) {
    console.error("No se pudieron leer las preferencias locales.", error);
    return {};
  }
};

// Guarda el último nombre, categoría y dificultad seleccionados.
const guardarPreferencias = (preferencias) => {
  try {
    window.localStorage.setItem(CLAVE_PREFERENCIAS, JSON.stringify(preferencias));
    return true;
  } catch (error) {
    console.error("No se pudieron guardar las preferencias locales.", error);
    return false;
  }
};

/*
  Ejemplos de uso (ejecutar desde app.js o la consola del navegador):

  guardarEnRanking({
    nombre: "Camila",
    puntaje: 1250,
    categoria: "Geografía",
    dificultad: "Medio",
    aciertos: 8,
    errores: 2,
    mejorRacha: 5,
    fecha: new Date().toISOString()
  });
  const mejoresPartidas = obtenerRanking();
  limpiarRanking();

  guardarEstadisticas({
    partidasJugadas: 1,
    aciertosTotales: 8,
    erroresTotales: 2,
    mejorPuntaje: 1250,
    mejorRacha: 5
  });
  const estadisticas = obtenerEstadisticas();

  guardarPreferencias({
    ultimoNombre: "Camila",
    ultimaCategoria: "Geografía",
    ultimaDificultad: "Medio"
  });
  const preferencias = obtenerPreferencias();
*/
