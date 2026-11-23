/* =========================================================
   OVA Bilingüismo para la Paz — Lógica interactiva (ES / EN)
   Incluye: cambio de idioma, progreso en localStorage,
   pestañas, flip cards, galería con filtros, modal y quiz.
   ========================================================= */

const STORAGE_KEY = "ova_bilinguismo_paz_v1";

const DEFAULT_STATE = {
  lang: "es",
  completedModules: [],
  quizDone: false,
  bestScore: 0
};

let state = loadState();
let activeFilter = "all";
let currentQuestionIndex = 0;
let currentQuizScore = 0;
let quizAnswered = false;

/* ---------- Diccionario bilingüe (ES / EN) ---------- */
const I18N = {
  es: {
    "brand.title": "Bilingüismo para la Paz",
    "brand.subtitle": "OVA · Práctica Pedagógica",
    "nav.m1": "Contexto",
    "nav.m2": "Planeación",
    "nav.m3": "Estrategias",
    "nav.m4": "Evidencias",
    "nav.m5": "Reto",
    "progress.label": "Progreso del OVA:",
    "progress.reset": "Reiniciar",
    "hero.eyebrow": "Universidad de Córdoba · Experiencia Docente Compartida",
    "hero.title": "Enseñar inglés con sentido: nuestra práctica en Bilingüismo para la Paz",
    "hero.lead": "Un Objeto Virtual de Aprendizaje bilingüe creado para estudiantes universitarios y futuros docentes. Descubre cómo planear con Backward Design, dinamizar jornadas sabatinas de 6 horas con niños de 8 a 13 años y transformar el aula en una experiencia comunicativa.",
    "hero.ctaPrimary": "Explorar el OVA",
    "hero.ctaSecondary": "Ir al reto pedagógico",
    "hero.teamTitle": "Equipo de Práctica Pedagógica",
    "hero.site1": "I. E. Camilo Torres · Sede Mocarí, Montería",
    "hero.site2": "Sede La Ribera · Montería",
    "hero.meta1": "Jornada sabatina",
    "hero.meta2": "Edad estudiantes",
    "hero.meta3": "Recurso bilingüe",
    "common.markComplete": "Marcar módulo como completado",
    "common.completed": "Módulo completado",
    "m1.tag": "Módulo 01",
    "m1.title": "Contexto de la práctica y dos sedes, un mismo propósito",
    "m1.desc": "Bilingüismo para la Paz acerca el aprendizaje del inglés a niños y niñas de instituciones educativas de Montería mediante sesiones presenciales los sábados. Aunque trabajamos en dos sedes distintas —Mocarí y La Ribera—, compartimos retos pedagógicos comunes.",
    "m1.c1Title": "El reto del tiempo sabatino",
    "m1.c1Text": "Sostener la motivación de estudiantes de 8 a 13 años durante jornadas de hasta 6 horas exige alternar momentos de exposición, movimiento físico, trabajo en equipo y pausas creativas.",
    "m1.c2Title": "Dos contextos comunitarios",
    "m1.c2Text": "Desde la I. E. Camilo Torres en Mocarí hasta la sede La Ribera, el aprendizaje cobra vida cuando conectamos el vocabulario en inglés con la cultura local, el entorno y la realidad de los niños.",
    "m1.c3Title": "Aprender haciendo y jugando",
    "m1.c3Text": "Reemplazamos bloques extensos de guías escritas por dinámicas comunicativas, juegos de Respuesta Física Total (TPR) y materiales visuales llamativos que reducen la ansiedad al hablar inglés.",
    "m2.tag": "Módulo 02",
    "m2.title": "Cómo creamos una clase: Modelo Backward Design",
    "m2.desc": "Para estructurar cada sesión seguimos la plantilla de Diseño Inverso (Backward Design) de la Universidad de Córdoba: primero definimos qué debe lograr el estudiante, luego cómo lo evidenciaremos y finalmente qué actividades haremos.",
    "m2.tab1": "Etapa 1: Resultados deseados",
    "m2.tab2": "Etapa 2: Evidencia aceptable",
    "m2.tab3": "Etapa 3: Plan de aprendizaje",
    "m2.s1Title": "Stage 1: Desired Results (Resultados deseados)",
    "m2.s1Desc": "Todo plan inicia con una pregunta orientadora (Guiding / Inquiry Question) y resultados de aprendizaje medibles que indiquen exactamente qué podrá producir el estudiante al cierre de la jornada.",
    "m2.exampleLabel": "Ejemplo real de clase (Unidad 4: Culturas y Colombia):",
    "m2.s1Example": "Pregunta guía: \"¿Cómo podemos describir y comparar las maravillas de Colombia con otras culturas en inglés?\" · Resultado medible: Al finalizar la sesión, el estudiante formula al menos 4 oraciones orales usando comparativos y superlativos para describir lugares culturales.",
    "m2.s2Title": "Stage 2: Acceptable Evidence (Evidencia aceptable)",
    "m2.s2Desc": "Antes de escoger juegos, definimos qué evidencias demostrarán que los niños realmente aprendieron: desempeño oral en retos, producción visual, participación en equipos y evaluaciones formativas o finales.",
    "m2.s2Example": "Rúbrica breve de participación oral durante los relevos, tarjetas de roleplay completadas en parejas y una sesión de repaso integral (Mega-Review) previa al examen escrito final.",
    "m2.s3Title": "Stage 3: Learning Plan (Plan de aprendizaje)",
    "m2.s3Desc": "Organizamos la jornada sabatina en bloques dinámicos que contemplan consideraciones diferenciadas (ritmos de aprendizaje), calentamiento activo, actividades centrales comunicativas y cierre con retroalimentación.",
    "m2.tl1": "Activación física y repaso lúdico (20–30 min)",
    "m2.tl2": "Estaciones, flashcards y juegos TPR",
    "m2.tl3": "Producción comunicativa y reflexión grupal",
    "m2.docsTitle": "Planes de clase y plantillas (Carpeta docs/)",
    "m2.docsSubtitle": "Haz clic para consultar la plantilla de ejemplo o reemplaza los PDFs en la carpeta docs/ con tus planes reales antes de subir a GitHub.",
    "m2.doc1Title": "Plantilla modelo Backward Design",
    "m2.doc1Desc": "Ejemplo interactivo listo para imprimir o guardar como PDF",
    "m2.doc2Title": "Plan de clase — Sede Mocarí",
    "m2.doc2Desc": "Guarda tu archivo como docs/plan-clase-mocari.pdf",
    "m2.doc3Title": "Plan de clase — Sede La Ribera",
    "m2.doc3Desc": "Guarda tu archivo como docs/plan-clase-ribera.pdf",
    "m3.tag": "Módulo 03",
    "m3.title": "Caja de herramientas: Dinámicas activas y TPR",
    "m3.desc": "Haz clic en cada tarjeta para voltearla y ver el objetivo pedagógico, los materiales y el consejo práctico de aplicación en aulas con niños de primaria.",
    "m4.tag": "Módulo 04",
    "m4.title": "Galería de evidencias de nuestras clases",
    "m4.desc": "Filtra por categoría y haz clic en cualquier tarjeta para ver la reflexión pedagógica completa. Las ilustraciones incluidas sirven como guía: puedes reemplazarlas por tus fotos reales en la carpeta images/.",
    "m4.fAll": "Todas",
    "m4.fPlan": "Planeación",
    "m4.fAct": "Dinámicas",
    "m4.fMat": "Materiales",
    "m4.fSites": "Sedes",
    "m4.videoTitle": "¿Quieren agregar un video corto de sus clases?",
    "m4.videoDesc": "Guarden su clip en formato MP4 como videos/intro.mp4 y sigan la indicación del archivo README.md para mostrarlo directamente aquí usando rutas relativas.",
    "m5.tag": "Módulo 05",
    "m5.title": "Reto pedagógico gamificado",
    "m5.desc": "Pon a prueba tu criterio como futuro docente con 6 situaciones reales inspiradas en nuestra práctica en Bilingüismo para la Paz. Tu puntaje e insignias se guardan en el navegador.",
    "m5.scoreLabel": "Puntaje:",
    "m5.nextBtn": "Siguiente pregunta",
    "m5.retryBtn": "Volver a intentar",
    "m5.badgesTitle": "Insignias desbloqueables",
    "m5.badgesSub": "Completa los módulos y supera el reto para coleccionarlas todas.",
    "m5.bestScoreLabel": "Mejor puntaje guardado:",
    "footer.credits": "Elaborado por Ana María Arévalo Patiño (I. E. Camilo Torres, Mocarí) y Rosa Ballesteros (Sede La Ribera) · Universidad de Córdoba, Montería, Colombia · 2026.",
    "footer.backTop": "Volver arriba ↑"
  },
  en: {
    "brand.title": "Bilingüismo para la Paz",
    "brand.subtitle": "VLO · Teaching Practicum",
    "nav.m1": "Context",
    "nav.m2": "Planning",
    "nav.m3": "Strategies",
    "nav.m4": "Evidence",
    "nav.m5": "Challenge",
    "progress.label": "VLO Progress:",
    "progress.reset": "Reset",
    "hero.eyebrow": "Universidad de Córdoba · Shared Teaching Experience",
    "hero.title": "Teaching English with Purpose: Our Practicum in Bilingüismo para la Paz",
    "hero.lead": "A bilingual Virtual Learning Object designed for university students and pre-service teachers. Explore how we plan using Backward Design, energize 6-hour Saturday sessions for 8–13-year-olds, and turn the classroom into a communicative space.",
    "hero.ctaPrimary": "Explore the VLO",
    "hero.ctaSecondary": "Go to the Challenge",
    "hero.teamTitle": "Teaching Practicum Team",
    "hero.site1": "I. E. Camilo Torres · Mocarí Site, Montería",
    "hero.site2": "La Ribera Site · Montería",
    "hero.meta1": "Saturday session",
    "hero.meta2": "Learner ages",
    "hero.meta3": "Bilingual resource",
    "common.markComplete": "Mark module as completed",
    "common.completed": "Module completed",
    "m1.tag": "Module 01",
    "m1.title": "Practicum Context: Two School Sites, One Shared Purpose",
    "m1.desc": "Bilingüismo para la Paz brings English learning closer to elementary students in Montería through Saturday face-to-face sessions. Even across two different sites —Mocarí and La Ribera— we share common pedagogical goals.",
    "m1.c1Title": "The Saturday Time Challenge",
    "m1.c1Text": "Keeping 8–13-year-old learners engaged for up to 6 hours requires alternating short input blocks with physical movement, teamwork, and creative breaks.",
    "m1.c2Title": "Two Community Contexts",
    "m1.c2Text": "From I. E. Camilo Torres in Mocarí to La Ribera, English becomes meaningful when we connect vocabulary to local culture, the environment, and students' daily lives.",
    "m1.c3Title": "Learning by Doing & Playing",
    "m1.c3Text": "We replace long seated worksheet blocks with communicative relays, Total Physical Response (TPR) games, and colorful visual aids that lower speaking anxiety.",
    "m2.tag": "Module 02",
    "m2.title": "How We Build a Lesson: Backward Design Model",
    "m2.desc": "Every session follows Universidad de Córdoba's Backward Design template: first we define what learners should achieve, next how we will gather evidence, and finally which activities will get them there.",
    "m2.tab1": "Stage 1: Desired Results",
    "m2.tab2": "Stage 2: Acceptable Evidence",
    "m2.tab3": "Stage 3: Learning Plan",
    "m2.s1Title": "Stage 1: Desired Results",
    "m2.s1Desc": "Planning starts with a Guiding / Inquiry Question and measurable learning outcomes stating exactly what students will produce by the end of the session.",
    "m2.exampleLabel": "Real classroom example (Unit 4: Cultures & Colombia):",
    "m2.s1Example": "Guiding Question: \"How can we describe and compare Colombia's landmarks with other cultures in English?\" · Measurable Outcome: By the end of class, learners produce at least 4 spoken sentences using comparatives and superlatives.",
    "m2.s2Title": "Stage 2: Acceptable Evidence",
    "m2.s2Desc": "Before choosing games, we define concrete evidence of learning: spoken performance during challenges, visual outputs, team participation, and formative or summative assessments.",
    "m2.s2Example": "A quick oral participation checklist during team relays, paired roleplay cards, and a comprehensive Mega-Review session before the written final exam.",
    "m2.s3Title": "Stage 3: Learning Plan",
    "m2.s3Desc": "We organize the Saturday session into dynamic blocks covering differentiated considerations, active warm-ups, communicative core activities, and reflective closure.",
    "m2.tl1": "Physical activation & playful review (20–30 min)",
    "m2.tl2": "Learning stations, flashcards & TPR games",
    "m2.tl3": "Communicative production & group wrap-up",
    "m2.docsTitle": "Lesson Plans & Templates (docs/ folder)",
    "m2.docsSubtitle": "Open the sample template or place your real PDF lesson plans inside the docs/ folder before uploading to GitHub.",
    "m2.doc1Title": "Backward Design Model Template",
    "m2.doc1Desc": "Interactive sample ready to print or save as PDF",
    "m2.doc2Title": "Lesson Plan — Mocarí Site",
    "m2.doc2Desc": "Save your file as docs/plan-clase-mocari.pdf",
    "m2.doc3Title": "Lesson Plan — La Ribera Site",
    "m2.doc3Desc": "Save your file as docs/plan-clase-ribera.pdf",
    "m3.tag": "Module 03",
    "m3.title": "Active Classroom Toolkit: TPR & Communicative Games",
    "m3.desc": "Click any card to flip it and discover the pedagogical objective, materials needed, and a practical classroom tip for elementary learners.",
    "m4.tag": "Module 04",
    "m4.title": "Classroom Evidence Gallery",
    "m4.desc": "Filter by category and click any card to read the full pedagogical reflection. Included illustrations act as placeholders you can easily swap with your real photos in images/.",
    "m4.fAll": "All",
    "m4.fPlan": "Planning",
    "m4.fAct": "Activities",
    "m4.fMat": "Materials",
    "m4.fSites": "Sites",
    "m4.videoTitle": "Want to embed a short video from your classes?",
    "m4.videoDesc": "Save your MP4 clip as videos/intro.mp4 and follow the quick instructions in README.md to display it here using relative paths.",
    "m5.tag": "Module 05",
    "m5.title": "Gamified Pedagogical Challenge",
    "m5.desc": "Test your judgment as a future teacher with 6 real-world scenarios inspired by our Bilingüismo para la Paz practicum. Your score and badges are saved in your browser.",
    "m5.scoreLabel": "Score:",
    "m5.nextBtn": "Next question",
    "m5.retryBtn": "Try again",
    "m5.badgesTitle": "Unlockable Badges",
    "m5.badgesSub": "Complete modules and beat the challenge to collect them all.",
    "m5.bestScoreLabel": "Saved best score:",
    "footer.credits": "Created by Ana María Arévalo Patiño (I. E. Camilo Torres, Mocarí) & Rosa Ballesteros (La Ribera Site) · Universidad de Córdoba, Montería, Colombia · 2026.",
    "footer.backTop": "Back to top ↑"
  }
};

/* ---------- Datos Módulo 3: Flip Cards ---------- */
const STRATEGIES = [
  {
    tag: { es: "Energía alta · TPR", en: "High Energy · TPR" },
    title: { es: "Giant Dice (Dado Gigante)", en: "Giant Dice" },
    hook: {
      es: "Cada cara del dado asigna un reto oral o gramatical en equipo.",
      en: "Each face of the giant die triggers a team speaking or grammar prompt."
    },
    objective: {
      es: "Practicar estructuras (modales, comparativos o preguntas) de forma espontánea.",
      en: "Practice target structures (modals, comparatives, or questions) spontaneously."
    },
    tip: {
      es: "Materiales: dado de cartón forrado. Tip: rota el lanzador para que todos participen.",
      en: "Materials: cardboard giant die. Tip: rotate the roller so every child speaks."
    }
  },
  {
    tag: { es: "Movimiento · Comprensión", en: "Movement · Listening" },
    title: { es: "Corner Sprints", en: "Corner Sprints" },
    hook: {
      es: "Las esquinas del salón representan categorías o respuestas posibles.",
      en: "Classroom corners represent different categories or answer choices."
    },
    objective: {
      es: "Activar escucha rápida y toma de decisiones sin depender de fichas escritas.",
      en: "Activate rapid listening and decision-making without seated worksheets."
    },
    tip: {
      es: "Materiales: 4 carteles grandes. Tip: pide a un alumno en la esquina elegida justificar su respuesta.",
      en: "Materials: 4 large signs. Tip: ask one student in the chosen corner to justify their choice."
    }
  },
  {
    tag: { es: "Vocabulario · Agilidad", en: "Vocabulary · Speed" },
    title: { es: "Fly Swatter (Matamoscas)", en: "Fly Swatter" },
    hook: {
      es: "Dos equipos compiten por señalar la imagen o palabra correcta en el tablero.",
      en: "Two teams race to tap the matching picture or word on the board."
    },
    objective: {
      es: "Reforzar asociación visual-auditiva de vocabulario nuevo.",
      en: "Strengthen visual-auditory recall of new vocabulary."
    },
    tip: {
      es: "Materiales: flashcards pegadas y 2 matamoscas. Tip: da pistas en contexto, no solo traducciones.",
      en: "Materials: board flashcards & 2 swatters. Tip: give contextual clues instead of direct translations."
    }
  },
  {
    tag: { es: "Trabajo en equipo", en: "Teamwork" },
    title: { es: "Scavenger Relays", en: "Scavenger Relays" },
    hook: {
      es: "Relevos de búsqueda donde cada pista desbloquea una oración en inglés.",
      en: "Relay races where each hidden clue unlocks an English sentence."
    },
    objective: {
      es: "Integrar lectura corta, cooperación y movimiento en jornadas extensas.",
      en: "Blend short reading, collaboration, and movement during long sessions."
    },
    tip: {
      es: "Materiales: tarjetas numeradas. Tip: ideal después del descanso para recuperar energía.",
      en: "Materials: numbered clue cards. Tip: ideal right after recess to rebuild focus."
    }
  },
  {
    tag: { es: "Repaso · Gamificación", en: "Review · Gamification" },
    title: { es: "Trashketball", en: "Trashketball" },
    hook: {
      es: "Responder correctamente gana un lanzamiento de pelota a la canasta por puntos extra.",
      en: "Correct answers earn a ball toss into the basket for bonus points."
    },
    objective: {
      es: "Convertir el repaso previo al examen en una competencia memorable.",
      en: "Turn pre-exam review into a memorable, low-stress competition."
    },
    tip: {
      es: "Materiales: cesta y pelota suave. Tip: permite que el equipo discuta 15 segundos antes de responder.",
      en: "Materials: bin & soft ball. Tip: allow 15 seconds of team huddle before answering."
    }
  },
  {
    tag: { es: "Material Visual · Speaking", en: "Visual Aids · Speaking" },
    title: { es: "Flashcards & Roleplay", en: "Flashcards & Roleplay" },
    hook: {
      es: "Tarjetas ilustradas tipo caricatura con letra grande y diálogos guiados.",
      en: "Bright cartoon-style flashcards with large fonts and guided dialogues."
    },
    objective: {
      es: "Brindar andamiaje visual para que los niños construyan diálogos reales.",
      en: "Provide visual scaffolding so learners build authentic short dialogues."
    },
    tip: {
      es: "Materiales: tarjetas impresas a color. Tip: modela primero el diálogo completo con gestos.",
      en: "Materials: printed color cards. Tip: model the full dialogue with gestures first."
    }
  }
];

/* ---------- Datos Módulo 4: Galería de Evidencias ---------- */
const EVIDENCES = [
  {
    id: 1,
    category: "planeacion",
    img: "images/evidencia-01.svg",
    catLabel: { es: "Planeación", en: "Planning" },
    title: { es: "Diseño de clase con Backward Design", en: "Lesson Planning with Backward Design" },
    desc: {
      es: "Estructura de las 3 etapas alineando pregunta guía, resultados medibles y secuencia didáctica para 6 horas.",
      en: "Three-stage layout aligning guiding question, measurable outcomes, and a 6-hour sequence."
    },
    tip: {
      es: "Para personalizar: reemplaza images/evidencia-01.svg por una foto real de tu planeación o cuaderno de campo.",
      en: "To customize: replace images/evidencia-01.svg with a real photo of your lesson plan or field notes."
    }
  },
  {
    id: 2,
    category: "dinamicas",
    img: "images/evidencia-02.svg",
    catLabel: { es: "Dinámicas", en: "Activities" },
    title: { es: "Juegos TPR y relevos en el patio", en: "TPR Games & Courtyard Relays" },
    desc: {
      es: "Estaciones activas que permiten practicar inglés en movimiento y mantener la atención de los estudiantes.",
      en: "Active stations enabling learners to practice English through movement while staying focused."
    },
    tip: {
      es: "Para personalizar: reemplaza images/evidencia-02.svg por una foto de una dinámica grupal (sin rostros identificables si no tienen permiso).",
      en: "To customize: replace images/evidencia-02.svg with a classroom activity photo (respecting student privacy)."
    }
  },
  {
    id: 3,
    category: "materiales",
    img: "images/evidencia-03.svg",
    catLabel: { es: "Materiales", en: "Materials" },
    title: { es: "Flashcards, bingos y tarjetas de roleplay", en: "Flashcards, Bingos & Roleplay Cards" },
    desc: {
      es: "Recursos visuales coloridos diseñados especialmente para edades de 8 a 13 años con tipografía clara.",
      en: "Colorful visual resources tailored for 8–13-year-olds with large, readable typography."
    },
    tip: {
      es: "Para personalizar: reemplaza images/evidencia-03.svg por fotos de tus carteleras, flashcards o bingos impresos.",
      en: "To customize: replace images/evidencia-03.svg with photos of your printed flashcards or bingo boards."
    }
  },
  {
    id: 4,
    category: "sedes",
    img: "images/evidencia-04.svg",
    catLabel: { es: "Sedes", en: "Sites" },
    title: { es: "Experiencia en I. E. Camilo Torres (Mocarí)", en: "Experience at I. E. Camilo Torres (Mocarí)" },
    desc: {
      es: "Práctica pedagógica liderada por Ana María Arévalo Patiño con énfasis en repaso integral y cultura colombiana.",
      en: "Teaching practicum led by Ana María Arévalo Patiño focusing on mega-reviews and Colombian culture."
    },
    tip: {
      es: "Para personalizar: reemplaza images/evidencia-04.svg por una foto representativa de la sede Mocarí.",
      en: "To customize: replace images/evidencia-04.svg with a representative photo from the Mocarí site."
    }
  },
  {
    id: 5,
    category: "sedes",
    img: "images/evidencia-05.svg",
    catLabel: { es: "Sedes", en: "Sites" },
    title: { es: "Experiencia en Sede La Ribera", en: "Experience at La Ribera Site" },
    desc: {
      es: "Práctica pedagógica liderada por Rosa Ballesteros promoviendo la participación comunicativa y el trabajo colaborativo.",
      en: "Teaching practicum led by Rosa Ballesteros fostering communicative participation and teamwork."
    },
    tip: {
      es: "Para personalizar: reemplaza images/evidencia-05.svg por una foto representativa de la sede La Ribera.",
      en: "To customize: replace images/evidencia-05.svg with a representative photo from the La Ribera site."
    }
  },
  {
    id: 6,
    category: "planeacion",
    img: "images/evidencia-06.svg",
    catLabel: { es: "Planeación", en: "Planning" },
    title: { es: "Evaluación formativa y cierre de unidad", en: "Formative Assessment & Unit Wrap-Up" },
    desc: {
      es: "Combinación de juegos de repaso (Mega-Review) y valoración escrita para confirmar los aprendizajes alcanzados.",
      en: "Blending interactive Mega-Review games with written assessment to verify learning outcomes."
    },
    tip: {
      es: "Para personalizar: reemplaza images/evidencia-06.svg por evidencias de cierre o producciones estudiantiles.",
      en: "To customize: replace images/evidencia-06.svg with wrap-up evidence or student work samples."
    }
  }
];

/* ---------- Datos Módulo 5: Quiz Pedagógico ---------- */
const QUIZ_QUESTIONS = [
  {
    q: {
      es: "1. En el modelo Backward Design usado en la Universidad de Córdoba, ¿qué se define primero al planear una clase?",
      en: "1. In the Backward Design model used at Universidad de Córdoba, what do you define first when planning a lesson?"
    },
    options: {
      es: [
        "Los juegos y el calentamiento del inicio.",
        "Los resultados de aprendizaje deseados y la pregunta guía (Stage 1).",
        "Las hojas de trabajo que se van a imprimir."
      ],
      en: [
        "The warm-up games and icebreakers.",
        "The desired learning outcomes and guiding question (Stage 1).",
        "The printed worksheets to hand out."
      ]
    },
    correct: 1,
    feedback: {
      es: "¡Exacto! Backward Design empieza por el fin en mente (Stage 1: Desired Results) para que todas las actividades tengan propósito.",
      en: "Spot on! Backward Design begins with the end in mind (Stage 1: Desired Results) so every activity serves a clear goal."
    }
  },
  {
    q: {
      es: "2. Son las 11:00 a. m. de una jornada sabatina de 6 horas y notas que los niños de 9 años están inquietos. ¿Cuál es la mejor decisión?",
      en: "2. It is 11:00 a.m. during a 6-hour Saturday session and 9-year-old learners are getting restless. What is the best move?"
    },
    options: {
      es: [
        "Entregar dos fichas de gramática adicionales para que trabajen en silencio.",
        "Cambiar a una dinámica activa con movimiento (como Corner Sprints o Fly Swatter) ligada al tema.",
        "Extender la explicación magistral en el tablero durante 40 minutos más."
      ],
      en: [
        "Hand out two extra grammar worksheets for silent seatwork.",
        "Switch to a movement-based activity (like Corner Sprints or Fly Swatter) tied to the topic.",
        "Extend the board lecture for 40 more minutes."
      ]
    },
    correct: 1,
    feedback: {
      es: "Muy bien: alternar con dinámicas TPR reactiva la atención y convierte el repaso en práctica comunicativa real.",
      en: "Great choice: switching to TPR activities restores energy and turns review into meaningful communication."
    }
  },
  {
    q: {
      es: "3. ¿Cuál de estos ejemplos corresponde a la Etapa 2 (Acceptable Evidence) del plan de clase?",
      en: "3. Which of these belongs to Stage 2 (Acceptable Evidence) of the lesson plan?"
    },
    options: {
      es: [
        "Una lista de chequeo oral donde cada estudiante formula 4 comparaciones sobre Colombia.",
        "La decoración del salón antes de que lleguen los niños.",
        "El horario del descanso sabatino."
      ],
      en: [
        "An oral checklist verifying each student produces 4 comparisons about Colombia.",
        "Classroom decorations set up before students arrive.",
        "The Saturday recess schedule."
      ]
    },
    correct: 0,
    feedback: {
      es: "Correcto: la Etapa 2 define cómo verificaremos de forma observable que el estudiante alcanzó los resultados propuestos.",
      en: "Correct: Stage 2 defines observable proof that learners achieved the target outcomes."
    }
  },
  {
    q: {
      es: "4. Al diseñar flashcards y bingos para niños de 8 a 13 años en Bilingüismo para la Paz, ¿qué criterio funciona mejor?",
      en: "4. When designing flashcards and bingo boards for 8–13-year-olds in Bilingüismo para la Paz, what works best?"
    },
    options: {
      es: [
        "Párrafos densos en letra pequeña sin imágenes.",
        "Ilustraciones coloridas, texto grande y claro, y vocabulario contextualizado.",
        "Solo texto en español sin apoyo visual."
      ],
      en: [
        "Dense small-print paragraphs with no visuals.",
        "Colorful illustrations, large clear typography, and contextualized vocabulary.",
        "Spanish-only text without visual cues."
      ]
    },
    correct: 1,
    feedback: {
      es: "¡Así es! El apoyo visual claro y atractivo facilita la comprensión sin depender de la traducción literal.",
      en: "Exactly! Clear, engaging visuals support comprehension without relying on word-for-word translation."
    }
  },
  {
    q: {
      es: "5. Trabajar el mismo programa en dos sedes distintas (Mocarí y La Ribera) demuestra que un buen docente debe:",
      en: "5. Running the same program across two different sites (Mocarí and La Ribera) shows that an effective teacher must:"
    },
    options: {
      es: [
        "Adaptar ejemplos y ritmos a cada grupo manteniendo objetivos pedagógicos sólidos.",
        "Ignorar los intereses del grupo para no alterar ni una palabra del guion.",
        "Eliminar las actividades colaborativas."
      ],
      en: [
        "Adapt examples and pacing to each group while keeping strong learning outcomes.",
        "Ignore learners' interests to avoid changing a single word of the script.",
        "Remove collaborative activities."
      ]
    },
    correct: 0,
    feedback: {
      es: "Exacto: en la Etapa 3 (Different Considerations) adaptamos la enseñanza al contexto real de cada sede.",
      en: "Spot on: in Stage 3 (Different Considerations) we adapt instruction to each school's real context."
    }
  },
  {
    q: {
      es: "6. Para publicar este OVA estático en GitHub Pages sin errores, ¿qué regla práctica es clave?",
      en: "6. To publish this static VLO on GitHub Pages without broken links, which practical rule is essential?"
    },
    options: {
      es: [
        "Guardar index.html en la raíz publicada y usar rutas relativas con nombres simples sin tildes ni espacios.",
        "Usar rutas absolutas del disco C:\\ de tu computador personal.",
        "Instalar un servidor PHP dentro de GitHub Pages."
      ],
      en: [
        "Place index.html in the published root and use relative paths with simple filenames (no accents or spaces).",
        "Use absolute C:\\ file paths from your personal computer.",
        "Install a PHP server inside GitHub Pages."
      ]
    },
    correct: 0,
    feedback: {
      es: "¡Excelente! GitHub Pages sirve archivos estáticos (HTML, CSS, JS) y busca index.html en la carpeta raíz.",
      en: "Excellent! GitHub Pages serves static files (HTML, CSS, JS) and looks for index.html in the root folder."
    }
  }
];

/* ---------- Insignias ---------- */
const BADGES = [
  {
    id: "explorer",
    icon: "01",
    title: { es: "Explorador/a Bilingüe", en: "Bilingual Explorer" },
    desc: { es: "Completa el Módulo 1 (Contexto)", en: "Complete Module 1 (Context)" },
    check: (s) => s.completedModules.includes("m1")
  },
  {
    id: "planner",
    icon: "02",
    title: { es: "Arquitecto/a Backward Design", en: "Backward Design Architect" },
    desc: { es: "Completa el Módulo 2 (Planeación)", en: "Complete Module 2 (Planning)" },
    check: (s) => s.completedModules.includes("m2")
  },
  {
    id: "tpr",
    icon: "03",
    title: { es: "Maestro/a de Dinámicas TPR", en: "TPR Strategies Master" },
    desc: { es: "Completa los Módulos 3 y 4", en: "Complete Modules 3 & 4" },
    check: (s) => s.completedModules.includes("m3") && s.completedModules.includes("m4")
  },
  {
    id: "peace",
    icon: "★",
    title: { es: "Embajador/a Bilingüismo para la Paz", en: "Bilingüismo para la Paz Ambassador" },
    desc: { es: "Logra al menos 5/6 en el reto pedagógico", en: "Score at least 5/6 on the challenge" },
    check: (s) => s.bestScore >= 5
  }
];

/* ---------- Persistencia en localStorage ---------- */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Si el navegador bloquea localStorage en modo privado, continúa sin error
  }
}

/* ---------- Idioma (ES / EN) ---------- */
function applyLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  saveState();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const text = I18N[lang][key];
    if (text) el.textContent = text;
  });

  updateModuleButtons();
  renderFlipCards();
  renderGallery();
  renderQuiz();
  renderBadges();
}

/* ---------- Progreso Global ---------- */
function updateProgressUI() {
  const totalUnits = 5; // 4 módulos + quiz
  const completedCount = state.completedModules.length + (state.quizDone ? 1 : 0);
  const pct = Math.round((completedCount / totalUnits) * 100);

  document.getElementById("progressPercent").textContent = `${pct}%`;
  document.getElementById("progressFill").style.width = `${pct}%`;
  document.getElementById("progressTrack").setAttribute("aria-valuenow", String(pct));
  document.getElementById("bestScoreDisplay").textContent = `${state.bestScore} / ${QUIZ_QUESTIONS.length}`;

  updateModuleButtons();
  renderBadges();
}

function updateModuleButtons() {
  const lang = state.lang;
  document.querySelectorAll(".btn-complete").forEach((btn) => {
    const mod = btn.dataset.module;
    const isDone = state.completedModules.includes(mod);
    btn.classList.toggle("completed", isDone);
    const labelSpan = btn.querySelector("[data-i18n]");
    if (labelSpan) {
      labelSpan.textContent = isDone ? I18N[lang]["common.completed"] : I18N[lang]["common.markComplete"];
    }
  });
}

/* ---------- Render Flip Cards ---------- */
function renderFlipCards() {
  const grid = document.getElementById("flipGrid");
  const lang = state.lang;
  const flipHint = lang === "es" ? "Clic para ver cómo aplicarla ↻" : "Click to see how to apply it ↻";
  const objLabel = lang === "es" ? "Objetivo pedagógico" : "Pedagogical Objective";
  const tipLabel = lang === "es" ? "Aplicación en aula" : "Classroom Tip";

  grid.innerHTML = STRATEGIES.map((item, idx) => `
    <div class="flip-card" tabindex="0" role="button" aria-label="${item.title[lang]}" data-idx="${idx}">
      <div class="flip-card-inner">
        <div class="flip-face flip-front">
          <div>
            <span class="flip-tag">${item.tag[lang]}</span>
            <h3>${item.title[lang]}</h3>
            <p>${item.hook[lang]}</p>
          </div>
          <span class="flip-hint">${flipHint}</span>
        </div>
        <div class="flip-face flip-back">
          <div>
            <h4>${objLabel}</h4>
            <p>${item.objective[lang]}</p>
            <h4>${tipLabel}</h4>
            <p>${item.tip[lang]}</p>
          </div>
          <span class="flip-hint" style="color:#fde68a;">↻</span>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".flip-card").forEach((card) => {
    const toggle = () => card.classList.toggle("flipped");
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/* ---------- Render Galería ---------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  const lang = state.lang;
  const filtered = activeFilter === "all"
    ? EVIDENCES
    : EVIDENCES.filter((item) => item.category === activeFilter);

  grid.innerHTML = filtered.map((item) => `
    <article class="gallery-card" tabindex="0" data-id="${item.id}">
      <img src="${item.img}" alt="${item.title[lang]}" loading="lazy" />
      <div class="gallery-body">
        <span class="gallery-cat">${item.catLabel[lang]}</span>
        <h3>${item.title[lang]}</h3>
        <p>${item.desc[lang]}</p>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".gallery-card").forEach((card) => {
    const open = () => openEvidenceModal(Number(card.dataset.id));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

function openEvidenceModal(id) {
  const item = EVIDENCES.find((e) => e.id === id);
  if (!item) return;
  const lang = state.lang;
  document.getElementById("modalImg").src = item.img;
  document.getElementById("modalImg").alt = item.title[lang];
  document.getElementById("modalCat").textContent = item.catLabel[lang];
  document.getElementById("modalTitle").textContent = item.title[lang];
  document.getElementById("modalDesc").textContent = item.desc[lang];
  document.getElementById("modalTip").textContent = item.tip[lang];
  document.getElementById("evidenceModal").hidden = false;
}

/* ---------- Render Quiz ---------- */
function renderQuiz() {
  const lang = state.lang;
  const counterEl = document.getElementById("quizCounter");
  const scoreEl = document.getElementById("quizScore");
  const qEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const feedbackEl = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("nextQuestionBtn");
  const retryBtn = document.getElementById("restartQuizBtn");

  scoreEl.textContent = String(currentQuizScore);

  if (currentQuestionIndex >= QUIZ_QUESTIONS.length) {
    counterEl.textContent = lang === "es" ? "Reto completado" : "Challenge completed";
    qEl.textContent = lang === "es"
      ? `¡Excelente trabajo! Obtuviste ${currentQuizScore} de ${QUIZ_QUESTIONS.length} respuestas correctas.`
      : `Great job! You scored ${currentQuizScore} out of ${QUIZ_QUESTIONS.length} correct answers.`;
    optionsEl.innerHTML = "";
    feedbackEl.hidden = false;
    feedbackEl.className = "quiz-feedback ok";
    feedbackEl.textContent = currentQuizScore >= 5
      ? (lang === "es"
        ? "Has desbloqueado la insignia de Embajador/a Bilingüismo para la Paz."
        : "You unlocked the Bilingüismo para la Paz Ambassador badge.")
      : (lang === "es"
        ? "Puedes repasar los módulos y volver a intentarlo para alcanzar 5/6 y desbloquear la insignia final."
        : "Review the modules and try again to reach 5/6 and unlock the final badge.");
    nextBtn.hidden = true;
    retryBtn.hidden = false;
    return;
  }

  const qObj = QUIZ_QUESTIONS[currentQuestionIndex];
  counterEl.textContent = lang === "es"
    ? `Pregunta ${currentQuestionIndex + 1} de ${QUIZ_QUESTIONS.length}`
    : `Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}`;
  qEl.textContent = qObj.q[lang];
  feedbackEl.hidden = true;
  nextBtn.hidden = true;
  retryBtn.hidden = true;
  quizAnswered = false;

  optionsEl.innerHTML = qObj.options[lang].map((opt, idx) => `
    <button type="button" class="quiz-option" data-opt="${idx}">${opt}</button>
  `).join("");

  optionsEl.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => handleQuizAnswer(Number(btn.dataset.opt)));
  });
}

function handleQuizAnswer(selectedIdx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const lang = state.lang;
  const qObj = QUIZ_QUESTIONS[currentQuestionIndex];
  const isRight = selectedIdx === qObj.correct;

  if (isRight) {
    currentQuizScore += 1;
    document.getElementById("quizScore").textContent = String(currentQuizScore);
  }

  document.querySelectorAll(".quiz-option").forEach((btn) => {
    const idx = Number(btn.dataset.opt);
    btn.disabled = true;
    if (idx === qObj.correct) btn.classList.add("correct");
    else if (idx === selectedIdx && !isRight) btn.classList.add("wrong");
  });

  const feedbackEl = document.getElementById("quizFeedback");
  feedbackEl.hidden = false;
  feedbackEl.className = `quiz-feedback ${isRight ? "ok" : "err"}`;
  feedbackEl.textContent = isRight
    ? qObj.feedback[lang]
    : (lang === "es"
      ? `Revisa esta idea: ${qObj.feedback[lang]}`
      : `Review this idea: ${qObj.feedback[lang]}`);

  const nextBtn = document.getElementById("nextQuestionBtn");
  nextBtn.hidden = false;
  nextBtn.textContent = currentQuestionIndex === QUIZ_QUESTIONS.length - 1
    ? (lang === "es" ? "Ver resultado final" : "View final result")
    : I18N[lang]["m5.nextBtn"];
}

/* ---------- Render Insignias ---------- */
function renderBadges() {
  const list = document.getElementById("badgesList");
  const lang = state.lang;

  list.innerHTML = BADGES.map((b) => {
    const unlocked = b.check(state);
    return `
      <div class="badge-item ${unlocked ? "unlocked" : ""}">
        <span class="badge-medal" aria-hidden="true">${b.icon}</span>
        <div>
          <strong>${b.title[lang]}</strong>
          <small>${b.desc[lang]}</small>
        </div>
      </div>
    `;
  }).join("");
}

/* ---------- Inicialización y Eventos ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mainNav.classList.remove("open"));
  });

  // Cambio de idioma
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  // Pestañas de Backward Design
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach((b) => {
        const active = b.dataset.tab === target;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === `tab-${target}`);
      });
    });
  });

  // Botones completar módulo
  document.querySelectorAll(".btn-complete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mod = btn.dataset.module;
      if (state.completedModules.includes(mod)) {
        state.completedModules = state.completedModules.filter((m) => m !== mod);
      } else {
        state.completedModules.push(mod);
      }
      saveState();
      updateProgressUI();
    });
  });

  // Filtros de galería
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("active", b === btn);
      });
      renderGallery();
    });
  });

  // Modal evidencias
  const modal = document.getElementById("evidenceModal");
  document.getElementById("closeModalBtn").addEventListener("click", () => {
    modal.hidden = true;
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.hidden = true;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) modal.hidden = true;
  });

  // Quiz botones
  document.getElementById("nextQuestionBtn").addEventListener("click", () => {
    currentQuestionIndex += 1;
    if (currentQuestionIndex >= QUIZ_QUESTIONS.length) {
      state.quizDone = true;
      if (currentQuizScore > state.bestScore) {
        state.bestScore = currentQuizScore;
      }
      saveState();
      updateProgressUI();
    }
    renderQuiz();
  });

  document.getElementById("restartQuizBtn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    currentQuizScore = 0;
    renderQuiz();
  });

  // Reiniciar progreso completo
  document.getElementById("resetProgressBtn").addEventListener("click", () => {
    state = { ...DEFAULT_STATE, lang: state.lang };
    currentQuestionIndex = 0;
    currentQuizScore = 0;
    saveState();
    updateProgressUI();
    renderQuiz();
  });

  // Arranque inicial
  applyLanguage(state.lang);
  updateProgressUI();
});
