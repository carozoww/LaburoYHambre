import 'dotenv/config';
import { connectMongoDB } from './database/conection.js';
import { User } from './models/user.model.js';
import { Habilidad } from './models/habilidad.model.js';
import { Estudio } from './models/estudio.model.js';
import { Empresa } from './models/empresa.model.js';
import { Trabajo } from './models/trabajo.model.js';
import { Evento } from './models/evento.model.js';
import { Opcion } from './models/opcion.model.js';
import { Efecto } from './models/efecto.model.js';
import { EfectoOpcion } from './models/efectoOpcion.model.js';
import { RunTrabajo } from './models/runTrabajo.model.js';
import { HabilidadJugador } from './models/habilidadJugador.model.js';

async function seedDatabase() {
  console.log("🌱 Conectando a MongoDB e iniciando Seeding de LaburoYHambre...");
  await connectMongoDB();

  // Limpiar colecciones anteriores
  await User.deleteMany({});
  await Habilidad.deleteMany({});
  await Estudio.deleteMany({});
  await Empresa.deleteMany({});
  await Trabajo.deleteMany({});
  await Evento.deleteMany({});
  await Opcion.deleteMany({});
  await Efecto.deleteMany({});
  await EfectoOpcion.deleteMany({});
  await RunTrabajo.deleteMany({});
  await HabilidadJugador.deleteMany({});

  console.log("🧹 Colecciones limpiadas correctamente.");

  // 1. Crear las 7 Habilidades Clave Oficiales
  const habBackend = await Habilidad.create({ nombre: "Backend", categoria: "Software" });
  const habFrontend = await Habilidad.create({ nombre: "Frontend", categoria: "Web" });
  const habIngles = await Habilidad.create({ nombre: "Inglés", categoria: "Idiomas" });
  const habCloud = await Habilidad.create({ nombre: "Cloud y Infraestructura", categoria: "Infraestructura" });
  const habLiderazgo = await Habilidad.create({ nombre: "Liderazgo", categoria: "Blandas" });
  const habDotNet = await Habilidad.create({ nombre: ".NET", categoria: "Software" });
  const habCiberseguridad = await Habilidad.create({ nombre: "Ciberseguridad", categoria: "Seguridad" });

  console.log("✅ 7 Habilidades oficiales creadas (Backend, Frontend, Inglés, Cloud, Liderazgo, .NET, Ciberseguridad).");

  // 2. ÚNICO ESTUDIO: Tecnólogo en Informática
  const estTecnologo = await Estudio.create({ nombre: "Tecnólogo en Informática", tier: 1 });

  console.log("✅ Estudio 'Tecnólogo en Informática' creado.");

  // 3. Crear Empresas por Tiers Diferenciados
  const empCarniceria = await Empresa.create({ nombre: "Carnicería del Tío Don Tito", tier: 1, tamanio: "Pyme Local", tipo: "Comercio" });
  const empStartup = await Empresa.create({ nombre: "Startup Tech Innovadora", tier: 2, tamanio: "Startup", tipo: "Tecnología" });
  const empGlobant = await Empresa.create({ nombre: "Globant Uruguay", tier: 3, tamanio: "Multinacional", tipo: "Consultoría IT" });
  const empMeLi = await Empresa.create({ nombre: "Mercado Libre", tier: 4, tamanio: "Enterprise", tipo: "E-Commerce / FinTech" });
  const empGoogle = await Empresa.create({ nombre: "Google Silicon Valley", tier: 5, tamanio: "Big Tech Global", tipo: "Big Tech" });

  console.log("✅ 5 Empresas por Tiers creadas (Don Tito, Startup, Globant, Mercado Libre, Google).");

  // 4. Crear Trabajos con Tiers y Requisitos Salariales Distintos
  const jobCarniceria = await Trabajo.create({
    nombre: "Ayudante de Software / Soporte",
    puesto: "Ayudante de Software / Soporte",
    area: "Programacion",
    habilidad: habBackend._id,
    salarioBase: 10000,
    salarioAnual: 10000,
    edadMinima: 18,
    descripcion: "Mantenimiento básico de computadoras y balanzas digitales en la carnicería del tío",
    empresa: empCarniceria._id
  });

  const jobTrainee = await Trabajo.create({
    nombre: "Pasante Trainee de Informática",
    puesto: "Pasante Trainee de Informática",
    area: "Programacion",
    habilidad: habBackend._id,
    salarioBase: 18000,
    salarioAnual: 18000,
    edadMinima: 18,
    descripcion: "Puesto inicial de pasante mientras cursas Tecnólogo en Informática",
    empresa: empStartup._id
  });

  const jobJunior = await Trabajo.create({
    nombre: "Junior Backend Developer",
    puesto: "Junior Backend Developer",
    area: "Programacion",
    habilidad: habBackend._id,
    salarioBase: 32000,
    salarioAnual: 32000,
    edadMinima: 19,
    descripcion: "Desarrollador junior a cargo de servicios REST APIs en Node.js y .NET",
    empresa: empStartup._id
  });

  const jobMid = await Trabajo.create({
    nombre: "Mid FullStack Developer",
    puesto: "Mid FullStack Developer",
    area: "Web",
    habilidad: habFrontend._id,
    salarioBase: 60000,
    salarioAnual: 60000,
    edadMinima: 22,
    descripcion: "Desarrollador semi-senior a cargo de aplicaciones web reactivas en Globant",
    empresa: empGlobant._id
  });

  const jobSenior = await Trabajo.create({
    nombre: "Senior Cloud Architect & Security Lead",
    puesto: "Senior Cloud Architect & Security Lead",
    area: "Infraestructura",
    habilidad: habCloud._id,
    salarioBase: 115000,
    salarioAnual: 115000,
    edadMinima: 26,
    descripcion: "Arquitecto Senior responsable de la nube y seguridad en Mercado Libre",
    empresa: empMeLi._id
  });

  const jobVP = await Trabajo.create({
    nombre: "VP of Engineering & Big Tech Architect",
    puesto: "VP of Engineering & Big Tech Architect",
    area: "Infraestructura",
    habilidad: habLiderazgo._id,
    salarioBase: 230000,
    salarioAnual: 230000,
    edadMinima: 32,
    descripcion: "Director ejecutivo responsable de la estrategia global de tecnología en Google",
    empresa: empGoogle._id
  });

  console.log("✅ Trabajos por Tiers creados.");

  // 5. Crear Efectos de Habilidades (+1, +2, +3, -1, -2)
  const efBackend1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: 1 });
  const efBackend2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: 2 });
  const efBackend3 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: 3 });

  const efFrontend1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Frontend", valor: 1 });
  const efFrontend2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Frontend", valor: 2 });

  const efIngles1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Inglés", valor: 1 });
  const efIngles2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Inglés", valor: 2 });

  const efCloud1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Cloud y Infraestructura", valor: 1 });
  const efCloud2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Cloud y Infraestructura", valor: 2 });
  const efCloud3 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Cloud y Infraestructura", valor: 3 });

  const efLiderazgo1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Liderazgo", valor: 1 });
  const efLiderazgo2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Liderazgo", valor: 2 });

  const efDotNet1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: ".NET", valor: 1 });
  const efDotNet2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: ".NET", valor: 2 });

  const efCiber1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Ciberseguridad", valor: 1 });
  const efCiber3 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Ciberseguridad", valor: 3 });

  const efBackendMinus1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: -1 });

  console.log("✅ Efectos de habilidades variados (+1, +2, +3) creados.");

  // 6. EVENTOS (Capacitaciones +2/+3, Proyectos de Riesgo, Ofertas Duales y Muerte Absurda)

  // A. Eventos de Cursos y Bootcamps (+2 / +3)
  const evBootcampCloud = await Evento.create({
    titulo: "Bootcamp Intensivo de Arquitectura Cloud & DevOps",
    tipo: "CAPACITACION",
    bonificacion: 5000,
    probabilidad: 0.8,
    descripcion: "Completas un programa de inmersión total en AWS, Docker y Kubernetes de 300 horas.",
    edadMinima: 20,
    edadMaxima: 55,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evMasterclassCiber = await Evento.create({
    titulo: "Especialización Avanzada en Ciberseguridad Zero-Trust",
    tipo: "CAPACITACION",
    bonificacion: 6000,
    probabilidad: 0.8,
    descripcion: "Rendiste con éxito el examen de certificación internacional en pentesting y auditoría de redes.",
    edadMinima: 22,
    edadMaxima: 60,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evCursoDotNet = await Evento.create({
    titulo: "Curso de Aceleración .NET 8 & Microservicios",
    tipo: "CAPACITACION",
    bonificacion: 4000,
    probabilidad: 0.8,
    descripcion: "Certificación oficial de Microsoft para desarrollo distribuido de alto rendimiento.",
    edadMinima: 20,
    edadMaxima: 55,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  // B. Eventos de Proyectos a Ciegas / Riesgo
  const evStartupRiesgo = await Evento.create({
    titulo: "Emprendimiento Nocturno: Lanzar Startup de IA Generativa",
    tipo: "EMPRENDIMIENTO",
    bonificacion: 35000,
    probabilidad: 0.7,
    descripcion: "Decides crear con unos amigos una plataforma de IA. Puedes arriesgar tu capital o liberarla como open source.",
    edadMinima: 21,
    edadMaxima: 55,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evBotTrading = await Evento.create({
    titulo: "Bot de Trading Algorítmico Automatizado",
    tipo: "INVERSION",
    bonificacion: 25000,
    probabilidad: 0.6,
    descripcion: "Programaste un algoritmo cuantitativo para arbitraje financiero. Es momento de poner dinero real a prueba.",
    edadMinima: 22,
    edadMaxima: 50,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  // C. Ofertas Laborales Duales (Aceptar vs Rechazar y Conservar Empleo)
  const evOfferJunior = await Evento.create({
    titulo: "Oferta Laboral: Junior Backend en Startup Tech",
    tipo: "DESEMPLEO",
    bonificacion: 32000,
    probabilidad: 0.95,
    descripcion: "Startup Tech Innovadora busca un desarrollador Junior para sumarse al equipo de APIs.",
    edadMinima: 18,
    edadMaxima: 45,
    cd: 2,
    repetible: true,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evOfferMid = await Evento.create({
    titulo: "Oferta Laboral: Mid FullStack Developer en Globant",
    tipo: "DESEMPLEO",
    bonificacion: 60000,
    probabilidad: 0.95,
    descripcion: "Globant Uruguay te ofrece un puesto Mid FullStack con clientes de EE.UU.",
    edadMinima: 21,
    edadMaxima: 60,
    cd: 2,
    repetible: true,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evOfferSenior = await Evento.create({
    titulo: "Oferta Laboral: Senior Cloud Architect en Mercado Libre",
    tipo: "DESEMPLEO",
    bonificacion: 115000,
    probabilidad: 0.95,
    descripcion: "Mercado Libre requiere un Arquitecto Senior para liderar la nube en América Latina.",
    edadMinima: 25,
    edadMaxima: 65,
    cd: 2,
    repetible: true,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evOfferVP = await Evento.create({
    titulo: "Oferta Ejecutiva: VP of Engineering en Google",
    tipo: "DESEMPLEO",
    bonificacion: 230000,
    probabilidad: 0.95,
    descripcion: "Google Silicon Valley busca un Director Ejecutivo de Ingeniería Global.",
    edadMinima: 30,
    edadMaxima: 65,
    cd: 2,
    repetible: true,
    reqTrabajo: false,
    reqEstudio: false
  });

  // D. Eventos de Gastos por Tonterías y Malas Decisiones Financieras
  const evGastoCamioneta = await Evento.create({
    titulo: "Compra Impulsiva de Camioneta 0km 4x4 a 60 cuotas",
    tipo: "GASTO",
    bonificacion: -25000,
    probabilidad: 0.6,
    descripcion: "Te compraste una pickup gigante que no necesitabas para impresionar en la oficina. El crédito prendario devoró tus ahorros.",
    edadMinima: 20,
    edadMaxima: 60,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evGastoFreeFire = await Evento.create({
    titulo: "Recarga Masiva de Diamantes en Free Fire y Skins Legendarias",
    tipo: "GASTO",
    bonificacion: -8000,
    probabilidad: 0.7,
    descripcion: "Te viciaste en el juego mobile y gastaste un dineral en pases de batalla, diamantes y cosméticos virtuales.",
    edadMinima: 18,
    edadMaxima: 45,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evGastoAnime = await Evento.create({
    titulo: "Fiebre de Coleccionables de Anime y Teclados Custom",
    tipo: "GASTO",
    bonificacion: -12000,
    probabilidad: 0.6,
    descripcion: "Importaste estatuas de colección a escala y armaste tres teclados mecánicos personalizados de aluminio.",
    edadMinima: 18,
    edadMaxima: 50,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  // E. Evento Cómico de Fallo de Entrevista por Counter-Strike
  const evCS2Fail = await Evento.create({
    titulo: "🎮 ¡Te quedaste jugando al Counter-Strike y perdiste la entrevista!",
    tipo: "DESPIDO",
    bonificacion: 0,
    probabilidad: 0.5,
    descripcion: "Trasnoches en un clutch 1v4 competitivo de CS2 hasta las 6 AM. Te dormiste profundamente, faltaste a la entrevista y perdiste la oportunidad laboral.",
    edadMinima: 18,
    edadMaxima: 50,
    cd: 4,
    repetible: true,
    reqTrabajo: false,
    reqEstudio: false
  });

  // F. Eventos de Muerte Absurda (Probabilidad estricta < 5%, 2%)
  const evMuerteEnergizantes = await Evento.create({
    titulo: "💀 ¡Sobredosis de 12 Energizantes en un Deploy Nocturno!",
    tipo: "MUERTE",
    bonificacion: 0,
    probabilidad: 0.02,
    descripcion: "Intentaste aguantar 48 horas despierto tomando latas de energizante en el deploy de producción. Tu corazón no resistió.",
    edadMinima: 19,
    edadMaxima: 64,
    cd: 10,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evMuerteRayo = await Evento.create({
    titulo: "⚡ ¡Rayo Cómico por la Ventana en un Refactor!",
    tipo: "MUERTE",
    bonificacion: 0,
    probabilidad: 0.02,
    descripcion: "Un rayo cayó sobre el transformador del edificio y la descarga atravesó tu teclado mecánico de aluminio.",
    edadMinima: 18,
    edadMaxima: 64,
    cd: 10,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  console.log("✅ Eventos creados (Bootcamps, Riesgo, Ofertas Duales y Muerte Absurda).");

  // 7. Crear Opciones para Eventos

  // Opciones Cursos (+2 / +3)
  const opBootcampCloud_A = await Opcion.create({
    evento: evBootcampCloud._id,
    titulo: "Realizar el Bootcamp Intensivo completo",
    texto: "Aprobar el programa de certificación internacional (+3 Cloud y Infraestructura)"
  });

  const opMasterCiber_A = await Opcion.create({
    evento: evMasterclassCiber._id,
    titulo: "Rendir el examen de certificación Zero-Trust",
    texto: "Certificarse como auditor de seguridad avanzado (+3 Ciberseguridad)"
  });

  const opCursoDotNet_A = await Opcion.create({
    evento: evCursoDotNet._id,
    titulo: "Completar la capacitación de Microsoft",
    texto: "Aprobar los módulos de microservicios (+2 .NET)"
  });

  // Opciones Proyectos de Riesgo (A ciegas)
  const opStartup_A = await Opcion.create({
    evento: evStartupRiesgo._id,
    titulo: "Invertir $15,000 de ahorros en servidores de IA GPU",
    texto: "Arriesgar capital en infraestructura propia (Resultado con alto beneficio o pérdida)"
  });
  const opStartup_B = await Opcion.create({
    evento: evStartupRiesgo._id,
    titulo: "Publicar el proyecto como Open Source gratuito",
    texto: "Ganar reputación en la comunidad sin arriesgar dinero (+2 Backend, +1 Frontend)"
  });

  const opTrading_A = await Opcion.create({
    evento: evBotTrading._id,
    titulo: "Conectar el bot a tu cuenta con capital real",
    texto: "Poner a operar el algoritmo cuant en el mercado (Riesgo alto de ganancia o pérdida)"
  });

  // Opciones Ofertas Laborales Duales (Aceptar vs Rechazar y Conservar Puesto)
  const opOfferJunior_A = await Opcion.create({
    evento: evOfferJunior._id,
    trabajo: jobJunior._id,
    titulo: "Aceptar oferta en Startup Tech Innovadora",
    texto: "Firmar contrato laboral ($32,000 / año, +1 Backend)"
  });
  const opOfferJunior_B = await Opcion.create({
    evento: evOfferJunior._id,
    titulo: "Rechazar oferta y conservar empleo actual",
    texto: "Permanecer en la empresa actual para sumar antigüedad y experiencia (+1 Liderazgo)"
  });

  const opOfferMid_A = await Opcion.create({
    evento: evOfferMid._id,
    trabajo: jobMid._id,
    titulo: "Aceptar oferta en Globant Uruguay",
    texto: "Firmar contrato en Globant ($60,000 / año, +1 Frontend)"
  });
  const opOfferMid_B = await Opcion.create({
    evento: evOfferMid._id,
    titulo: "Rechazar la propuesta y mantener estabilidad laboral",
    texto: "Conservar tu puesto actual apostando al crecimiento interno (+1 Liderazgo)"
  });

  const opOfferSenior_A = await Opcion.create({
    evento: evOfferSenior._id,
    trabajo: jobSenior._id,
    titulo: "Aceptar la posición Senior en Mercado Libre",
    texto: "Firmar contrato ejecutivo ($115,000 / año, +2 Cloud)"
  });
  const opOfferSenior_B = await Opcion.create({
    evento: evOfferSenior._id,
    titulo: "Rechazar el pase y quedarte en tu empresa actual",
    texto: "Demostrar lealtad profesional e impulsar tu liderazgo interno (+1 Liderazgo)"
  });

  const opOfferVP_A = await Opcion.create({
    evento: evOfferVP._id,
    trabajo: jobVP._id,
    titulo: "Aceptar la dirección técnica en Google Silicon Valley",
    texto: "Firmar contrato global en Google ($230,000 / año, +2 Liderazgo)"
  });
  const opOfferVP_B = await Opcion.create({
    evento: evOfferVP._id,
    titulo: "Rechazar a Google y seguir tu propio camino",
    texto: "Mantener tu independencia y estabilidad laboral actual (+1 Liderazgo)"
  });

  // Opciones Gastos por Tonterías
  const opGastoCamioneta_A = await Opcion.create({
    evento: evGastoCamioneta._id,
    titulo: "Firmar la compra de la 4x4 a 60 cuotas",
    texto: "Pagar el pie y asumir la deuda mensual (- $25,000 en ahorros)"
  });

  const opGastoFreeFire_A = await Opcion.create({
    evento: evGastoFreeFire._id,
    titulo: "Comprar pases de batalla y diamantes",
    texto: "Gastar ahorros en pases de batalla y pases de skins (- $8,000 en ahorros)"
  });

  const opGastoAnime_A = await Opcion.create({
    evento: evGastoAnime._id,
    titulo: "Importar coleccionables y teclados custom",
    texto: "Pagar costos de envío internacional (- $12,000 en ahorros)"
  });

  // Opción Fallo Entrevista CS2
  const opCS2Fail_A = await Opcion.create({
    evento: evCS2Fail._id,
    titulo: "Asumir la derrota y el trasnocho",
    texto: "Perder la oportunidad laboral por desvelarte en la clasificatoria de CS2 (Quedar Desempleado)"
  });

  // Opciones Muerte Absurda (Opción única obligatoria)
  const opMuerteEnergizantes_A = await Opcion.create({
    evento: evMuerteEnergizantes._id,
    titulo: "Aceptar el desenlace trágico",
    texto: "Tu carrera tecnológica termina abruptamente por el colapso del deploy."
  });

  const opMuerteRayo_A = await Opcion.create({
    evento: evMuerteRayo._id,
    titulo: "Fin de la simulación por fuerza mayor",
    texto: "Un impacto electromagnético inaudito concluyó tu viaje laboral."
  });

  console.log("✅ Opciones creadas.");

  // 8. Vincular Efectos a Opciones (EfectoOpcion)
  await EfectoOpcion.create({ efecto: efCloud3._id, opcion: opBootcampCloud_A._id });
  await EfectoOpcion.create({ efecto: efCiber3._id, opcion: opMasterCiber_A._id });
  await EfectoOpcion.create({ efecto: efDotNet2._id, opcion: opCursoDotNet_A._id });

  await EfectoOpcion.create({ efecto: efBackend2._id, opcion: opStartup_A._id });
  await EfectoOpcion.create({ efecto: efBackend2._id, opcion: opStartup_B._id });
  await EfectoOpcion.create({ efecto: efFrontend1._id, opcion: opStartup_B._id });

  await EfectoOpcion.create({ efecto: efBackend1._id, opcion: opOfferJunior_A._id });
  await EfectoOpcion.create({ efecto: efLiderazgo1._id, opcion: opOfferJunior_B._id });

  await EfectoOpcion.create({ efecto: efFrontend1._id, opcion: opOfferMid_A._id });
  await EfectoOpcion.create({ efecto: efLiderazgo1._id, opcion: opOfferMid_B._id });

  await EfectoOpcion.create({ efecto: efCloud2._id, opcion: opOfferSenior_A._id });
  await EfectoOpcion.create({ efecto: efLiderazgo1._id, opcion: opOfferSenior_B._id });

  await EfectoOpcion.create({ efecto: efLiderazgo2._id, opcion: opOfferVP_A._id });
  await EfectoOpcion.create({ efecto: efLiderazgo1._id, opcion: opOfferVP_B._id });

  console.log("✅ Relaciones EfectoOpcion vinculadas.");

  // 9. Crear Usuarios de prueba & Runs completadas para el Leaderboard
  const u1 = await User.create({ username: "MatiasDev", email: "matias@test.com", password: "123" });
  const u2 = await User.create({ username: "CodeNinja", email: "ninja@test.com", password: "123" });
  const u3 = await User.create({ username: "JuniorHero", email: "junior@test.com", password: "123" });

  await RunTrabajo.create({
    user: u1._id,
    fecha: new Date(),
    edadActual: 65,
    anioActual: 2074,
    trabajo: jobVP._id,
    estudio: estTecnologo._id,
    salarioActual: 230000,
    estado: "Completada",
    empleado: true,
    dineroGenerado: 2150000,
    anosEnTrabajoActual: 6,
    decisionesTomadas: []
  });

  await RunTrabajo.create({
    user: u2._id,
    fecha: new Date(),
    edadActual: 65,
    anioActual: 2074,
    trabajo: jobSenior._id,
    estudio: estTecnologo._id,
    salarioActual: 115000,
    estado: "Completada",
    empleado: true,
    dineroGenerado: 1100000,
    anosEnTrabajoActual: 5,
    decisionesTomadas: []
  });

  await RunTrabajo.create({
    user: u3._id,
    fecha: new Date(),
    edadActual: 65,
    anioActual: 2074,
    trabajo: jobMid._id,
    estudio: estTecnologo._id,
    salarioActual: 60000,
    estado: "Completada",
    empleado: true,
    dineroGenerado: 520000,
    anosEnTrabajoActual: 3,
    decisionesTomadas: []
  });

  console.log("🏆 Seeding completado exitosamente con 7 habilidades oficiales, empresas por Tiers, Seniority y eventos variados.");
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error("❌ Error ejecutando seed.js:", err);
  process.exit(1);
});
