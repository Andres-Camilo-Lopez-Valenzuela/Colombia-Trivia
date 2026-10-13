/*
  Banco de preguntas de Trivia Colombia.
  Cada elemento contiene un id, categoria, dificultad, pregunta, cuatro opciones,
  el índice de la opción correcta (0-3) y una explicación breve.
*/
const preguntas = [
  {
    id: 1,
    categoria: "Geografía",
    dificultad: "Fácil",
    pregunta: "¿Cuál es la capital de Colombia?",
    opciones: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
    correcta: 0,
    explicacion: "Bogotá es la capital de Colombia y está ubicada en la cordillera Oriental."
  },
  {
    id: 2,
    categoria: "Geografía",
    dificultad: "Fácil",
    pregunta: "¿Qué océano baña la costa occidental de Colombia?",
    opciones: ["Océano Pacífico", "Océano Atlántico", "Océano Índico", "Océano Ártico"],
    correcta: 0,
    explicacion: "El litoral del Pacífico colombiano se extiende al oeste del país."
  },
  {
    id: 3,
    categoria: "Geografía",
    dificultad: "Fácil",
    pregunta: "¿Cuál de estas ciudades está en el Caribe colombiano?",
    opciones: ["Barranquilla", "Pasto", "Manizales", "Villavicencio"],
    correcta: 0,
    explicacion: "Barranquilla es una ciudad portuaria del departamento del Atlántico, en el Caribe."
  },
  {
    id: 4,
    categoria: "Geografía",
    dificultad: "Medio",
    pregunta: "¿Cuál es el río más largo que recorre territorio colombiano?",
    opciones: ["Río Magdalena", "Río Amazonas", "Río Cauca", "Río Atrato"],
    correcta: 1,
    explicacion: "El Amazonas recorre el sur de Colombia y es el río más largo del país por longitud total."
  },
  {
    id: 5,
    categoria: "Geografía",
    dificultad: "Medio",
    pregunta: "¿En qué departamento se encuentra el Parque Nacional Natural Tayrona?",
    opciones: ["Magdalena", "La Guajira", "Córdoba", "Sucre"],
    correcta: 0,
    explicacion: "El Parque Tayrona está en la costa del departamento del Magdalena, cerca de Santa Marta."
  },
  {
    id: 6,
    categoria: "Geografía",
    dificultad: "Medio",
    pregunta: "¿Cuál es el departamento más extenso de Colombia?",
    opciones: ["Amazonas", "Vichada", "Guainía", "Caquetá"],
    correcta: 0,
    explicacion: "Amazonas es el departamento colombiano de mayor superficie."
  },
  {
    id: 7,
    categoria: "Geografía",
    dificultad: "Medio",
    pregunta: "¿Qué cordillera atraviesa el departamento de Antioquia?",
    opciones: ["Cordillera Occidental y Central", "Cordillera Oriental únicamente", "Sierra Nevada de Santa Marta", "Serranía de la Macarena"],
    correcta: 0,
    explicacion: "Antioquia ocupa zonas de las cordilleras Central y Occidental de los Andes colombianos."
  },
  {
    id: 8,
    categoria: "Geografía",
    dificultad: "Difícil",
    pregunta: "¿Cuál es el punto más alto de Colombia?",
    opciones: ["Pico Cristóbal Colón", "Nevado del Huila", "Nevado del Cocuy", "Pico Simón Bolívar"],
    correcta: 0,
    explicacion: "El pico Cristóbal Colón, en la Sierra Nevada de Santa Marta, es reconocido como la cumbre más alta del país."
  },
  {
    id: 9,
    categoria: "Geografía",
    dificultad: "Difícil",
    pregunta: "¿Cuál de estos ríos desemboca en el mar Caribe?",
    opciones: ["Río Atrato", "Río Putumayo", "Río Guaviare", "Río Caquetá"],
    correcta: 0,
    explicacion: "El río Atrato fluye hacia el golfo de Urabá, en el mar Caribe."
  },
  {
    id: 10,
    categoria: "Geografía",
    dificultad: "Difícil",
    pregunta: "¿En qué departamento se encuentra el desierto de la Tatacoa?",
    opciones: ["Huila", "Cesar", "Cauca", "Boyacá"],
    correcta: 0,
    explicacion: "La Tatacoa está en el departamento del Huila, cerca del municipio de Villavieja."
  },
  {
    id: 11,
    categoria: "Historia",
    dificultad: "Fácil",
    pregunta: "¿En qué año se conmemora el Grito de Independencia de Colombia?",
    opciones: ["1810", "1819", "1821", "1815"],
    correcta: 0,
    explicacion: "El 20 de julio de 1810 se inició en Santafé un proceso que condujo a la independencia."
  },
  {
    id: 12,
    categoria: "Historia",
    dificultad: "Fácil",
    pregunta: "¿Quién es conocido como el Libertador de Colombia y otros países suramericanos?",
    opciones: ["Simón Bolívar", "Francisco de Paula Santander", "Antonio Nariño", "José María Córdova"],
    correcta: 0,
    explicacion: "Simón Bolívar lideró campañas independentistas en varios países de Suramérica."
  },
  {
    id: 13,
    categoria: "Historia",
    dificultad: "Fácil",
    pregunta: "¿En qué batalla de 1819 se selló la independencia de la Nueva Granada?",
    opciones: ["Batalla de Boyacá", "Batalla de Pichincha", "Batalla de Carabobo", "Batalla de Ayacucho"],
    correcta: 0,
    explicacion: "La victoria patriota en la batalla de Boyacá, el 7 de agosto de 1819, fue decisiva para la campaña libertadora."
  },
  {
    id: 14,
    categoria: "Historia",
    dificultad: "Medio",
    pregunta: "¿Cómo se llamó el territorio que agrupó a Colombia, Venezuela, Ecuador y Panamá entre 1819 y 1830?",
    opciones: ["República de Colombia (Gran Colombia)", "Confederación de los Andes", "Virreinato de Santafé", "Provincias Unidas del Caribe"],
    correcta: 0,
    explicacion: "La República de Colombia, conocida históricamente como Gran Colombia, existió entre 1819 y 1830."
  },
  {
    id: 15,
    categoria: "Historia",
    dificultad: "Medio",
    pregunta: "¿Qué líder de la independencia fue conocido como el Hombre de las Leyes?",
    opciones: ["Francisco de Paula Santander", "Simón Bolívar", "Camilo Torres", "Jorge Tadeo Lozano"],
    correcta: 0,
    explicacion: "Francisco de Paula Santander recibió el sobrenombre de Hombre de las Leyes por su defensa del orden constitucional."
  },
  {
    id: 16,
    categoria: "Historia",
    dificultad: "Medio",
    pregunta: "¿En qué año se separó Panamá de Colombia?",
    opciones: ["1903", "1886", "1819", "1914"],
    correcta: 0,
    explicacion: "Panamá se separó de Colombia en 1903."
  },
  {
    id: 17,
    categoria: "Historia",
    dificultad: "Medio",
    pregunta: "¿Qué nombre recibió Colombia en la Constitución de 1886?",
    opciones: ["República de Colombia", "Estados Unidos de Colombia", "Confederación Granadina", "República de la Nueva Granada"],
    correcta: 0,
    explicacion: "La Constitución de 1886 estableció el nombre República de Colombia."
  },
  {
    id: 18,
    categoria: "Historia",
    dificultad: "Difícil",
    pregunta: "¿Qué líder comunero fue ejecutado tras la rebelión de los Comuneros?",
    opciones: ["José Antonio Galán", "Policarpa Salavarrieta", "Manuela Beltrán", "Jorge Eliécer Gaitán"],
    correcta: 0,
    explicacion: "José Antonio Galán fue uno de los principales líderes comuneros y fue ejecutado en 1782."
  },
  {
    id: 19,
    categoria: "Historia",
    dificultad: "Difícil",
    pregunta: "¿Qué batalla de 1814 fue decisiva en la campaña de independencia del sur de la Nueva Granada?",
    opciones: ["Batalla de Tacines", "Batalla de Junín", "Batalla de Carabobo", "Batalla de Boyacá"],
    correcta: 0,
    explicacion: "La batalla de Tacines, en 1814, formó parte de la campaña de Nariño en el sur."
  },
  {
    id: 20,
    categoria: "Historia",
    dificultad: "Difícil",
    pregunta: "¿En qué año se promulgó la Constitución Política de Colombia actualmente vigente?",
    opciones: ["1991", "1886", "1957", "2002"],
    correcta: 0,
    explicacion: "La Constitución Política vigente fue promulgada el 4 de julio de 1991."
  },
  {
    id: 21,
    categoria: "Cultura y Tradiciones",
    dificultad: "Fácil",
    pregunta: "¿En qué ciudad se celebra el Carnaval de Barranquilla?",
    opciones: ["Barranquilla", "Cartagena", "Sincelejo", "Santa Marta"],
    correcta: 0,
    explicacion: "El Carnaval de Barranquilla se celebra anualmente en la capital del Atlántico."
  },
  {
    id: 22,
    categoria: "Cultura y Tradiciones",
    dificultad: "Fácil",
    pregunta: "¿Cuál de estos instrumentos es característico del vallenato tradicional?",
    opciones: ["Acordeón", "Bandoneón", "Charango", "Ukelele"],
    correcta: 0,
    explicacion: "El acordeón es uno de los instrumentos centrales del vallenato, junto con la caja y la guacharaca."
  },
  {
    id: 23,
    categoria: "Cultura y Tradiciones",
    dificultad: "Fácil",
    pregunta: "¿Cuál es un plato tradicional de la región paisa?",
    opciones: ["Bandeja paisa", "Mote de queso", "Ajiaco santafereño", "Mute santandereano"],
    correcta: 0,
    explicacion: "La bandeja paisa es un plato tradicional asociado con Antioquia y la región paisa."
  },
  {
    id: 24,
    categoria: "Cultura y Tradiciones",
    dificultad: "Medio",
    pregunta: "¿En qué departamento se celebra el Festival de la Leyenda Vallenata?",
    opciones: ["Cesar", "Córdoba", "Bolívar", "La Guajira"],
    correcta: 0,
    explicacion: "El Festival de la Leyenda Vallenata se realiza en Valledupar, capital del Cesar."
  },
  {
    id: 25,
    categoria: "Cultura y Tradiciones",
    dificultad: "Medio",
    pregunta: "¿Qué baile y género musical es emblemático de la región Caribe colombiana?",
    opciones: ["Cumbia", "Bambuco", "Joropo", "Pasillo"],
    correcta: 0,
    explicacion: "La cumbia es una expresión musical y de danza muy representativa del Caribe colombiano."
  },
  {
    id: 26,
    categoria: "Cultura y Tradiciones",
    dificultad: "Medio",
    pregunta: "¿Qué celebración de Pasto se caracteriza por el juego con cosméticos y talco?",
    opciones: ["Carnaval de Negros y Blancos", "Feria de las Flores", "Festival del Bambuco", "Carnaval de Riosucio"],
    correcta: 0,
    explicacion: "El Carnaval de Negros y Blancos se celebra en Pasto y es reconocido por sus jornadas de juego y desfile."
  },
  {
    id: 27,
    categoria: "Cultura y Tradiciones",
    dificultad: "Medio",
    pregunta: "¿Qué escritor colombiano recibió el Premio Nobel de Literatura en 1982?",
    opciones: ["Gabriel García Márquez", "Álvaro Mutis", "Rafael Pombo", "Jorge Isaacs"],
    correcta: 0,
    explicacion: "Gabriel García Márquez recibió el Nobel de Literatura en 1982."
  },
  {
    id: 28,
    categoria: "Cultura y Tradiciones",
    dificultad: "Difícil",
    pregunta: "¿En qué municipio del Cauca se celebra el Carnaval de Negros y Blancos de Pubenza?",
    opciones: ["Popayán", "Silvia", "Santander de Quilichao", "Guapi"],
    correcta: 0,
    explicacion: "El Carnaval de Pubenza se celebra en Popayán, capital del Cauca."
  },
  {
    id: 29,
    categoria: "Cultura y Tradiciones",
    dificultad: "Difícil",
    pregunta: "¿Qué pueblo indígena es reconocido por tejer mochilas con fibras de fique en la Sierra Nevada de Santa Marta?",
    opciones: ["Kankuamo", "Wayuu", "Emberá", "Nasa"],
    correcta: 0,
    explicacion: "El pueblo Kankuamo, de la Sierra Nevada, mantiene la tradición de elaborar mochilas tejidas con fique."
  },
  {
    id: 30,
    categoria: "Cultura y Tradiciones",
    dificultad: "Difícil",
    pregunta: "¿Qué género musical andino colombiano suele interpretarse con tiple, bandola y guitarra?",
    opciones: ["Bambuco", "Champeta", "Mapalé", "Currulao"],
    correcta: 0,
    explicacion: "El bambuco es un género de la región andina que tradicionalmente se interpreta con tiple, bandola y guitarra."
  },
  {
    id: 31,
    categoria: "Deportes",
    dificultad: "Fácil",
    pregunta: "¿Qué ciclista colombiano ganó el Giro de Italia en 2014?",
    opciones: ["Nairo Quintana", "Egan Bernal", "Rigoberto Urán", "Lucho Herrera"],
    correcta: 0,
    explicacion: "Nairo Quintana ganó el Giro de Italia de 2014, convirtiéndose en el primer colombiano en lograrlo."
  },
  {
    id: 32,
    categoria: "Deportes",
    dificultad: "Fácil",
    pregunta: "¿En qué deporte compite la selección Colombia conocida como Las Chicas Superpoderosas?",
    opciones: ["Fútbol femenino", "Baloncesto", "Voleibol", "Ciclismo de pista"],
    correcta: 0,
    explicacion: "Las Chicas Superpoderosas es un apodo de la selección femenina colombiana de fútbol."
  },
  {
    id: 33,
    categoria: "Deportes",
    dificultad: "Fácil",
    pregunta: "¿Qué futbolista colombiano fue conocido como El Pibe?",
    opciones: ["Carlos Valderrama", "Radamel Falcao García", "Freddy Rincón", "James Rodríguez"],
    correcta: 0,
    explicacion: "Carlos Valderrama, destacado por su cabellera rubia, fue conocido como El Pibe."
  },
  {
    id: 34,
    categoria: "Deportes",
    dificultad: "Medio",
    pregunta: "¿Qué ciclista colombiano ganó el Tour de Francia en 2019?",
    opciones: ["Egan Bernal", "Nairo Quintana", "Rigoberto Urán", "Santiago Botero"],
    correcta: 0,
    explicacion: "Egan Bernal ganó el Tour de Francia de 2019 y fue el primer latinoamericano en conseguirlo."
  },
  {
    id: 35,
    categoria: "Deportes",
    dificultad: "Medio",
    pregunta: "¿Qué atleta colombiana ganó oro olímpico en salto triple en Londres 2012?",
    opciones: ["Caterine Ibargüen", "María Isabel Urrutia", "Yuri Alvear", "Jackeline Rentería"],
    correcta: 0,
    explicacion: "Caterine Ibargüen ganó el oro olímpico en salto triple en los Juegos de Londres 2012."
  },
  {
    id: 36,
    categoria: "Deportes",
    dificultad: "Medio",
    pregunta: "¿En qué ciudad se disputaron los Juegos Panamericanos de 1971 en Colombia?",
    opciones: ["Cali", "Bogotá", "Medellín", "Cartagena"],
    correcta: 0,
    explicacion: "Cali fue sede de los VI Juegos Panamericanos en 1971."
  },
  {
    id: 37,
    categoria: "Deportes",
    dificultad: "Medio",
    pregunta: "¿Qué deporte practicaba María Isabel Urrutia cuando ganó el primer oro olímpico de Colombia?",
    opciones: ["Halterofilia", "Judo", "Atletismo", "Lucha"],
    correcta: 0,
    explicacion: "María Isabel Urrutia ganó el oro en levantamiento de pesas en Sídney 2000, el primero para Colombia."
  },
  {
    id: 38,
    categoria: "Deportes",
    dificultad: "Difícil",
    pregunta: "¿En qué categoría fue campeón mundial de boxeo el colombiano Antonio Cervantes, Kid Pambelé?",
    opciones: ["Peso wélter junior (superligero)", "Peso mosca", "Peso pesado", "Peso pluma"],
    correcta: 0,
    explicacion: "Kid Pambelé fue campeón mundial de peso wélter junior, actualmente llamado superligero."
  },
  {
    id: 39,
    categoria: "Deportes",
    dificultad: "Difícil",
    pregunta: "¿En qué año ganó Lucho Herrera la Vuelta a España?",
    opciones: ["1987", "1985", "1991", "1993"],
    correcta: 0,
    explicacion: "Luis Alberto «Lucho» Herrera ganó la Vuelta a España en 1987."
  },
  {
    id: 40,
    categoria: "Deportes",
    dificultad: "Difícil",
    pregunta: "¿En qué edición de los Juegos Olímpicos Colombia obtuvo su primera medalla de oro?",
    opciones: ["Sídney 2000", "Barcelona 1992", "Atenas 2004", "Londres 2012"],
    correcta: 0,
    explicacion: "María Isabel Urrutia logró la primera medalla de oro olímpica colombiana en Sídney 2000."
  },
  {
    id: 41,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Fácil",
    pregunta: "¿Cuál es el ave nacional de Colombia?",
    opciones: ["Cóndor de los Andes", "Águila harpía", "Guacamaya azul", "Colibrí esmeralda"],
    correcta: 0,
    explicacion: "El cóndor de los Andes es el ave nacional de Colombia y aparece en el escudo nacional."
  },
  {
    id: 42,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Fácil",
    pregunta: "¿Qué árbol produce el fruto conocido como guanábana?",
    opciones: ["Guanábano", "Guayabo", "Cocotero", "Mango"],
    correcta: 0,
    explicacion: "La guanábana es el fruto del guanábano, un árbol tropical cultivado en Colombia."
  },
  {
    id: 43,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Fácil",
    pregunta: "¿Qué mamífero de gran tamaño vive en los ríos de la Amazonía colombiana?",
    opciones: ["Delfín rosado", "Nutria marina", "Morsa", "Manatí antillano únicamente"],
    correcta: 0,
    explicacion: "El delfín rosado amazónico habita en los sistemas fluviales de la Amazonía colombiana."
  },
  {
    id: 44,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Medio",
    pregunta: "¿Qué ecosistema de alta montaña ocupa grandes extensiones del Parque Nacional Natural Los Nevados?",
    opciones: ["Páramo", "Manglar", "Sabanas inundables", "Bosque seco tropical"],
    correcta: 0,
    explicacion: "Los Nevados protege páramos y superpáramos andinos, además de glaciares y bosques altoandinos."
  },
  {
    id: 45,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Medio",
    pregunta: "¿Cuál es el nombre científico de la palma de cera del Quindío?",
    opciones: ["Ceroxylon quindiuense", "Quercus humboldtii", "Cattleya trianae", "Puya raimondii"],
    correcta: 0,
    explicacion: "Ceroxylon quindiuense es el nombre científico de la palma nacional de Colombia."
  },
  {
    id: 46,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Medio",
    pregunta: "¿Cuál de estos parques nacionales protege ecosistemas de páramo en la cordillera Oriental?",
    opciones: ["Parque Nacional Natural Chingaza", "Parque Nacional Natural Tayrona", "Parque Nacional Natural Utría", "Parque Nacional Natural Gorgona"],
    correcta: 0,
    explicacion: "Chingaza protege páramos y bosques altoandinos de la cordillera Oriental, cerca de Bogotá."
  },
  {
    id: 47,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Medio",
    pregunta: "¿Qué especie de orquídea es la flor nacional de Colombia?",
    opciones: ["Cattleya trianae", "Vanilla planifolia", "Epidendrum secundum", "Anguloa uniflora"],
    correcta: 0,
    explicacion: "Cattleya trianae, también llamada flor de mayo, fue declarada flor nacional."
  },
  {
    id: 48,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Difícil",
    pregunta: "¿En qué departamento se encuentra el Parque Nacional Natural Serranía de Chiribiquete?",
    opciones: ["Caquetá y Guaviare", "Amazonas y Putumayo", "Meta y Vichada", "Cauca y Nariño"],
    correcta: 0,
    explicacion: "Chiribiquete se extiende entre los departamentos de Caquetá y Guaviare."
  },
  {
    id: 49,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Difícil",
    pregunta: "¿Qué científico dirigió la Real Expedición Botánica del Nuevo Reino de Granada?",
    opciones: ["José Celestino Mutis", "Alexander von Humboldt", "Francisco José de Caldas", "Aimé Bonpland"],
    correcta: 0,
    explicacion: "José Celestino Mutis dirigió la Real Expedición Botánica, iniciada en 1783."
  },
  {
    id: 50,
    categoria: "Ciencia y Naturaleza",
    dificultad: "Difícil",
    pregunta: "¿Qué región colombiana alberga la mayor extensión de selva amazónica del país?",
    opciones: ["Amazonía", "Región Andina", "Región Caribe", "Región Insular"],
    correcta: 0,
    explicacion: "La región Amazónica colombiana concentra la mayor parte de los bosques amazónicos del país."
  }
];
