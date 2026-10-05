import 'dotenv/config';
import { connectMongoDB } from './database/conection.js';
import { Habilidad } from './models/habilidad.model.js';
import { Estudio } from './models/estudio.model.js';
import { Empresa } from './models/empresa.model.js';
import { Trabajo } from './models/trabajo.model.js';
import { Evento } from './models/evento.model.js';
import { Opcion } from './models/opcion.model.js';
import { Efecto } from './models/efecto.model.js';
import { EfectoOpcion } from './models/efectoOpcion.model.js';

async function seedDatabase() {
  console.log("🌱 Conectando a MongoDB e iniciando Seeding Completo de LaburoYHambre...");
  await connectMongoDB();

  // 0. Limpiar catálogos previos para reseeding limpio
  await Promise.all([
    Habilidad.deleteMany({}),
    Estudio.deleteMany({}),
    Empresa.deleteMany({}),
    Trabajo.deleteMany({}),
    Evento.deleteMany({}),
    Opcion.deleteMany({}),
    Efecto.deleteMany({}),
    EfectoOpcion.deleteMany({})
  ]);

  // 1. Habilidades Clave Oficiales
  const habBackend = await Habilidad.create({ nombre: "Backend", categoria: "Software" });
  const habFrontend = await Habilidad.create({ nombre: "Frontend", categoria: "Web" });
  const habIngles = await Habilidad.create({ nombre: "Inglés", categoria: "Idiomas" });
  const habCloud = await Habilidad.create({ nombre: "Cloud y Infraestructura", categoria: "Infraestructura" });
  const habLiderazgo = await Habilidad.create({ nombre: "Liderazgo", categoria: "Blandas" });
  const habDotNet = await Habilidad.create({ nombre: ".NET", categoria: "Software" });
  const habCiberseguridad = await Habilidad.create({ nombre: "Ciberseguridad", categoria: "Seguridad" });

  console.log("✅ 7 Habilidades oficiales creadas.");

  // 2. Único Estudio
  const estTecnologo = await Estudio.create({ nombre: "Tecnólogo en Informática", tier: 1 });

  // 3. Empresas por Tiers
  const empCarniceria = await Empresa.create({ nombre: "Carnicería del Tío Don Tito", tier: 1, tamanio: "Pyme Local", tipo: "Comercio" });
  const empStartup = await Empresa.create({ nombre: "Startup Tech Innovadora", tier: 2, tamanio: "Startup", tipo: "Tecnología" });
  const empGlobant = await Empresa.create({ nombre: "Globant Uruguay", tier: 3, tamanio: "Multinacional", tipo: "Consultoría IT" });
  const empMeLi = await Empresa.create({ nombre: "Mercado Libre", tier: 4, tamanio: "Enterprise", tipo: "E-Commerce / FinTech" });
  const empGoogle = await Empresa.create({ nombre: "Google Silicon Valley", tier: 5, tamanio: "Big Tech Global", tipo: "Big Tech" });

  console.log("✅ Empresas por Tiers creadas.");

  // 4. Trabajos en Español (con áreas pertenecientes al enum de Mongoose)
  const jobSoporte = await Trabajo.create({
    nombre: "Ayudante de Soporte e Informática",
    puesto: "Ayudante de Soporte e Informática",
    area: "Programacion",
    habilidad: habBackend._id,
    salarioBase: 10000,
    salarioAnual: 10000,
    edadMinima: 18,
    descripcion: "Mantenimiento básico de computadoras y equipos de oficina en la carnicería",
    empresa: empCarniceria._id
  });

  const jobDevWebInicial = await Trabajo.create({
    nombre: "Desarrollador Web Inicial",
    puesto: "Desarrollador Web Inicial",
    area: "Web",
    habilidad: habFrontend._id,
    salarioBase: 14000,
    salarioAnual: 14000,
    edadMinima: 18,
    descripcion: "Creación de sitios web sencillos para comercios y pymes locales",
    empresa: empCarniceria._id
  });

  const jobPasante = await Trabajo.create({
    nombre: "Pasante de Programación",
    puesto: "Pasante de Programación",
    area: "Programacion",
    habilidad: habBackend._id,
    salarioBase: 18000,
    salarioAnual: 18000,
    edadMinima: 18,
    descripcion: "Puesto inicial de pasante mientras cursas Tecnólogo en Informática",
    empresa: empStartup._id
  });

  const jobJuniorBackend = await Trabajo.create({
    nombre: "Desarrollador Backend Junior",
    puesto: "Desarrollador Backend Junior",
    area: "Programacion",
    habilidad: habBackend._id,
    salarioBase: 32000,
    salarioAnual: 32000,
    edadMinima: 19,
    descripcion: "Desarrollo de servicios web y bases de datos en Node.js y .NET",
    empresa: empStartup._id
  });

  const jobJuniorFrontend = await Trabajo.create({
    nombre: "Desarrollador Frontend Junior",
    puesto: "Desarrollador Frontend Junior",
    area: "Web",
    habilidad: habFrontend._id,
    salarioBase: 30000,
    salarioAnual: 30000,
    edadMinima: 19,
    descripcion: "Creación de pantallas e interfaces interactivas en React",
    empresa: empStartup._id
  });

  const jobFullstack = await Trabajo.create({
    nombre: "Desarrollador FullStack",
    puesto: "Desarrollador FullStack",
    area: "Web",
    habilidad: habFrontend._id,
    salarioBase: 60000,
    salarioAnual: 60000,
    edadMinima: 21,
    descripcion: "Desarrollo completo de aplicaciones frontend y backend en Globant",
    empresa: empGlobant._id
  });

  const jobInfra = await Trabajo.create({
    nombre: "Especialista en Infraestructura y Nube",
    puesto: "Especialista en Infraestructura y Nube",
    area: "Infraestructura",
    habilidad: habCloud._id,
    salarioBase: 75000,
    salarioAnual: 75000,
    edadMinima: 23,
    descripcion: "Gestión de servidores, redes y despliegues en la nube en Globant",
    empresa: empGlobant._id
  });

  const jobLiderTecnico = await Trabajo.create({
    nombre: "Líder Técnico de Software",
    puesto: "Líder Técnico de Software",
    area: "Programacion",
    habilidad: habLiderazgo._id,
    salarioBase: 110000,
    salarioAnual: 110000,
    edadMinima: 25,
    descripcion: "Coordinación de equipos de programación y arquitectura en Mercado Libre",
    empresa: empMeLi._id
  });

  const jobSeniorArch = await Trabajo.create({
    nombre: "Arquitecto de Sistemas Senior",
    puesto: "Arquitecto de Sistemas Senior",
    area: "Infraestructura",
    habilidad: habCloud._id,
    salarioBase: 140000,
    salarioAnual: 140000,
    edadMinima: 27,
    descripcion: "Diseño de plataformas escalables y alta disponibilidad en Mercado Libre",
    empresa: empMeLi._id
  });

  const jobDirectorTech = await Trabajo.create({
    nombre: "Director de Ingeniería Tecnológica",
    puesto: "Director de Ingeniería Tecnológica",
    area: "Programacion",
    habilidad: habLiderazgo._id,
    salarioBase: 230000,
    salarioAnual: 230000,
    edadMinima: 30,
    descripcion: "Dirección ejecutiva de proyectos tecnológicos globales en Google",
    empresa: empGoogle._id
  });

  console.log("✅ Trabajos creados.");

  // 5. Efectos de Habilidades Positivos y Negativos
  const efBackend1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: 1 });
  const efBackend2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: 2 });
  const efBackend3 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: 3 });
  const efBackendMinus1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Backend", valor: -1 });

  const efFrontend1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Frontend", valor: 1 });
  const efFrontend2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Frontend", valor: 2 });
  const efFrontendMinus1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Frontend", valor: -1 });

  const efIngles1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Inglés", valor: 1 });
  const efIngles2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Inglés", valor: 2 });

  const efCloud1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Cloud y Infraestructura", valor: 1 });
  const efCloud2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Cloud y Infraestructura", valor: 2 });
  const efCloud3 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Cloud y Infraestructura", valor: 3 });

  const efLiderazgo1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Liderazgo", valor: 1 });
  const efLiderazgo2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Liderazgo", valor: 2 });

  const efDotNet1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: ".NET", valor: 1 });
  const efDotNet2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: ".NET", valor: 2 });
  const efDotNetMinus1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: ".NET", valor: -1 });

  const efCiber1 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Ciberseguridad", valor: 1 });
  const efCiber2 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Ciberseguridad", valor: 2 });
  const efCiber3 = await Efecto.create({ tipo: "MODIFICAR_HABILIDAD", objetivo: "Ciberseguridad", valor: 3 });

  console.log("✅ Efectos creados.");

  // 6. TODOS LOS EVENTOS (VIEJOS Y NUEVOS) CON repetible: false

  // Capacitaciones
  const evBootcampCloud = await Evento.create({
    titulo: "Bootcamp Intensivo de Arquitectura Cloud & DevOps",
    tipo: "CAPACITACION",
    bonificacion: 5000,
    probabilidad: 0.8,
    descripcion: "Completas un programa de inmersión total en servidores e infraestructura en la nube.",
    edadMinima: 20,
    edadMaxima: 55,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evMasterclassCiber = await Evento.create({
    titulo: "Especialización Avanzada en Ciberseguridad",
    tipo: "CAPACITACION",
    bonificacion: 6000,
    probabilidad: 0.8,
    descripcion: "Rendiste con éxito el examen de certificación internacional en auditoría de redes.",
    edadMinima: 22,
    edadMaxima: 60,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evCursoDotNet = await Evento.create({
    titulo: "Curso de Aceleración .NET & Microservicios",
    tipo: "CAPACITACION",
    bonificacion: 4000,
    probabilidad: 0.8,
    descripcion: "Capacitación en desarrollo distribuido de alto rendimiento.",
    edadMinima: 20,
    edadMaxima: 55,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evBootcampBackend = await Evento.create({
    titulo: "Curso de Aceleración Backend & Arquitectura",
    tipo: "CAPACITACION",
    bonificacion: 4000,
    probabilidad: 0.8,
    descripcion: "Aprobaste un curso intensivo de diseño de servicios web y bases de datos.",
    edadMinima: 18,
    edadMaxima: 55,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evBootcampFrontend = await Evento.create({
    titulo: "Masterclass de Desarrollo Frontend React",
    tipo: "CAPACITACION",
    bonificacion: 3500,
    probabilidad: 0.8,
    descripcion: "Completaste una capacitación práctica en desarrollo de pantallas e interfaces.",
    edadMinima: 18,
    edadMaxima: 55,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evCapacitacionIngles = await Evento.create({
    titulo: "Inmersión Intensiva en Inglés Técnico",
    tipo: "CAPACITACION",
    bonificacion: 3000,
    probabilidad: 0.8,
    descripcion: "Practicaste conversación e inglés de negocios para clientes del exterior.",
    edadMinima: 18,
    edadMaxima: 60,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  // Emprendimientos y Riesgo
  const evStartupRiesgo = await Evento.create({
    titulo: "Emprendimiento Nocturno: Lanzar Startup de IA",
    tipo: "EMPRENDIMIENTO",
    bonificacion: 35000,
    probabilidad: 0.7,
    descripcion: "Decides crear con unos amigos una plataforma de IA. Puedes arriesgar tu capital o liberarla gratis.",
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
    descripcion: "Programaste un algoritmo cuantitativo. Es momento de probar si genera ganancias o pérdidas.",
    edadMinima: 22,
    edadMaxima: 50,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  // Gastos
  const evGastoCamioneta = await Evento.create({
    titulo: "Compra Impulsiva de Camioneta 4x4 a 60 cuotas",
    tipo: "GASTO",
    bonificacion: -25000,
    probabilidad: 0.6,
    descripcion: "Te compraste una pickup gigante que no necesitabas y devoró tus ahorros.",
    edadMinima: 20,
    edadMaxima: 60,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evGastoFreeFire = await Evento.create({
    titulo: "Recarga Masiva de Diamantes y Skins",
    tipo: "GASTO",
    bonificacion: -8000,
    probabilidad: 0.7,
    descripcion: "Te viciaste en juegos móviles y gastaste un dineral en pases de batalla.",
    edadMinima: 18,
    edadMaxima: 45,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evGastoAnime = await Evento.create({
    titulo: "Fiebre de Coleccionables y Teclados Custom",
    tipo: "GASTO",
    bonificacion: -12000,
    probabilidad: 0.6,
    descripcion: "Importaste estatuas a escala y armaste tres teclados mecánicos de aluminio.",
    edadMinima: 18,
    edadMaxima: 50,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evCS2Fail = await Evento.create({
    titulo: "Te quedaste jugando toda la noche y perdiste la entrevista",
    tipo: "DESPIDO",
    bonificacion: 0,
    probabilidad: 0.5,
    descripcion: "Trasnoches en partidas competitivas, te dormiste y faltaste a la entrevista.",
    edadMinima: 18,
    edadMaxima: 50,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  // IA, Caída de Bolsa, Muerte, Lesiones y Familia
  const evIAReemplazo = await Evento.create({
    titulo: "Una Inteligencia Artificial reemplazó tu puesto",
    tipo: "DESPIDO",
    bonificacion: 0,
    probabilidad: 0.15,
    descripcion: "La empresa implementó agentes de IA que escriben código. Tu puesto fue recortado y quedaste desempleado.",
    edadMinima: 20,
    edadMaxima: 62,
    cd: 5,
    repetible: false,
    reqTrabajo: true,
    reqEstudio: false
  });

  const evColapsoBolsa = await Evento.create({
    titulo: "Colapso de la Bolsa de Valores y Mercado Cripto",
    tipo: "CATASTROFE",
    bonificacion: 0,
    probabilidad: 0.10,
    descripcion: "Una crisis económica internacional provocó una caída masiva. Perdiste el 50% de tu dinero acumulado.",
    edadMinima: 21,
    edadMaxima: 64,
    cd: 6,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evMuertePala = await Evento.create({
    titulo: "Viste una pala y del susto te moriste",
    tipo: "MUERTE",
    bonificacion: 0,
    probabilidad: 0.18,
    descripcion: "Caminando cerca de una obra divisaste una pala manual. El terror a agarrar la pala y ponerte a trabajar te causó un paro cardíaco.",
    edadMinima: 18,
    edadMaxima: 64,
    cd: 10,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evMuerteEnergizantes = await Evento.create({
    titulo: "Sobredosis de 12 Energizantes en un Deploy Nocturno",
    tipo: "MUERTE",
    bonificacion: 0,
    probabilidad: 0.15,
    descripcion: "Intentaste aguantar 48 horas despierto tomando latas de energizante en producción. Tu corazón colapsó.",
    edadMinima: 19,
    edadMaxima: 64,
    cd: 10,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evMuerteRayo = await Evento.create({
    titulo: "Impacto de Rayo por la Ventana en un Refactor",
    tipo: "MUERTE",
    bonificacion: 0,
    probabilidad: 0.15,
    descripcion: "Un rayo cayó en el transformador del edificio y la descarga atravesó tu teclado de aluminio.",
    edadMinima: 18,
    edadMaxima: 64,
    cd: 10,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evLesionDedos = await Evento.create({
    titulo: "Lesión grave en las manos jugando básquetbol",
    tipo: "ENFERMEDAD",
    bonificacion: -2000,
    probabilidad: 0.20,
    descripcion: "Te esguinzaste las manos en un partido de fin de semana y perdiste velocidad para codear.",
    edadMinima: 18,
    edadMaxima: 50,
    cd: 4,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evVacaciones = await Evento.create({
    titulo: "Vacaciones o Burnout en el Proyecto",
    tipo: "EVENTO_RANDOM",
    bonificacion: 0,
    probabilidad: 0.6,
    descripcion: "Llevas meses trabajando a ritmo acelerado. Tu cuerpo te pide descansar antes de colapsar.",
    edadMinima: 20,
    edadMaxima: 60,
    cd: 4,
    repetible: false,
    reqTrabajo: true,
    reqEstudio: false
  });

  const evCasamiento = await Evento.create({
    titulo: "Propuesta de Matrimonio y Vida Familiar",
    tipo: "EVENTO_FAMILIAR",
    bonificacion: 0,
    probabilidad: 0.5,
    descripcion: "Tu pareja te propone casarse y organizar la fiesta de boda.",
    edadMinima: 23,
    edadMaxima: 45,
    cd: 8,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evHijo = await Evento.create({
    titulo: "Nacimiento de tu Primer Hijo",
    tipo: "GASTO",
    bonificacion: -15000,
    probabilidad: 0.5,
    descripcion: "Llegó la noticia del nacimiento de tu hijo. Hay que equipar el hogar con cuna y pañales.",
    edadMinima: 24,
    edadMaxima: 48,
    cd: 8,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evDivorcio = await Evento.create({
    titulo: "Trámite de Divorcio y División de Bienes",
    tipo: "CATASTROFE",
    bonificacion: 0,
    probabilidad: 0.35,
    descripcion: "Diferencias irreconciliables llevaron a iniciar el divorcio legal y dividir el patrimonio acumulado.",
    edadMinima: 28,
    edadMaxima: 60,
    cd: 8,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evPrincipeNigeriano = await Evento.create({
    titulo: "Correo electrónico del Príncipe Nigeriano",
    tipo: "GASTO",
    bonificacion: -5000,
    probabilidad: 0.4,
    descripcion: "Recibiste un correo prometiéndote millones a cambio de una transferencia inicial.",
    edadMinima: 18,
    edadMaxima: 60,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evPendriveCalle = await Evento.create({
    titulo: "Pendrive tirado en la vereda de la oficina",
    tipo: "EVENTO_RANDOM",
    bonificacion: 0,
    probabilidad: 0.4,
    descripcion: "Encontraste una memoria USB tirada en la vereda. La curiosidad te tienta a conectarlo.",
    edadMinima: 18,
    edadMaxima: 55,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evSudoRmRf = await Evento.create({
    titulo: "Comando destructivo ejecutado en producción",
    tipo: "EVENTO_RANDOM",
    bonificacion: 5000,
    probabilidad: 0.35,
    descripcion: "Por un error humano se borraron bases de datos principales en el servidor.",
    edadMinima: 20,
    edadMaxima: 60,
    cd: 4,
    repetible: false,
    reqTrabajo: true,
    reqEstudio: false
  });

  const evHackatonCafe = await Evento.create({
    titulo: "Hackatón de Fin de Semana a Puro Café",
    tipo: "RECOMPENSA",
    bonificacion: 10000,
    probabilidad: 0.5,
    descripcion: "Competiste durante 48 horas continuas en una hackatón creando un prototipo funcional.",
    edadMinima: 18,
    edadMaxima: 45,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evCursoUdemy = await Evento.create({
    titulo: "Compraste 10 cursos en descuento y jamás los abriste",
    tipo: "GASTO",
    bonificacion: -3500,
    probabilidad: 0.6,
    descripcion: "Aprovechaste una liquidación de cursos virtuales y nunca completaste ni un video.",
    edadMinima: 18,
    edadMaxima: 50,
    cd: 3,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  // Ofertas Laborales Duales en Español
  const evOfertaDevWeb = await Evento.create({
    titulo: "Oferta Laboral: Desarrollador Web Inicial",
    tipo: "DESEMPLEO",
    bonificacion: 14000,
    probabilidad: 0.95,
    descripcion: "Carnicería Don Tito busca un programador web para mantener su catálogo virtual.",
    edadMinima: 20,
    edadMaxima: 40,
    cd: 2,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evOfertaBackendJr = await Evento.create({
    titulo: "Oferta Laboral: Desarrollador Backend Junior",
    tipo: "DESEMPLEO",
    bonificacion: 32000,
    probabilidad: 0.95,
    descripcion: "Startup Tech Innovadora busca un programador junior para sumarse al equipo de servicios web.",
    edadMinima: 20,
    edadMaxima: 45,
    cd: 2,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evOfertaFullstack = await Evento.create({
    titulo: "Oferta Laboral: Desarrollador FullStack en Globant",
    tipo: "DESEMPLEO",
    bonificacion: 60000,
    probabilidad: 0.95,
    descripcion: "Globant Uruguay te ofrece un puesto FullStack para proyectos internacionales.",
    edadMinima: 21,
    edadMaxima: 55,
    cd: 2,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evOfertaLider = await Evento.create({
    titulo: "Oferta Laboral: Líder Técnico en Mercado Libre",
    tipo: "DESEMPLEO",
    bonificacion: 110000,
    probabilidad: 0.95,
    descripcion: "Mercado Libre busca un Líder Técnico para coordinar equipos de programación.",
    edadMinima: 25,
    edadMaxima: 65,
    cd: 2,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  const evOfertaDirector = await Evento.create({
    titulo: "Oferta Ejecutiva: Director de Ingeniería en Google",
    tipo: "DESEMPLEO",
    bonificacion: 230000,
    probabilidad: 0.95,
    descripcion: "Google Silicon Valley busca un Director para liderar la estrategia tecnológica global.",
    edadMinima: 30,
    edadMaxima: 65,
    cd: 2,
    repetible: false,
    reqTrabajo: false,
    reqEstudio: false
  });

  console.log("✅ Todos los eventos creados (repetible: false).");

  // 7. Opciones de Eventos (Puros textos sin parentesis de efectos)

  // Capacitaciones
  const opBootCloud_A = await Opcion.create({
    evento: evBootcampCloud._id,
    titulo: "Realizar el Bootcamp completo",
    texto: "Aprobar el programa de certificación en infraestructura en la nube"
  });

  const opCiber_A = await Opcion.create({
    evento: evMasterclassCiber._id,
    titulo: "Rendir el examen de auditoría",
    texto: "Certificarse como auditor de seguridad avanzado"
  });

  const opDotNet_A = await Opcion.create({
    evento: evCursoDotNet._id,
    titulo: "Completar la capacitación",
    texto: "Aprobar los módulos de microservicios distribuídos"
  });

  const opBackend_A = await Opcion.create({
    evento: evBootcampBackend._id,
    titulo: "Completar el curso de Backend",
    texto: "Aprobar los módulos de servicios web y bases de datos"
  });

  const opFrontend_A = await Opcion.create({
    evento: evBootcampFrontend._id,
    titulo: "Realizar el taller de Frontend",
    texto: "Crear proyectos prácticos en React"
  });

  const opIngles_A = await Opcion.create({
    evento: evCapacitacionIngles._id,
    titulo: "Asistir a las clases de conversación",
    texto: "Mejorar la fluidez en reuniones técnicas"
  });

  const opCiberTall_A = await Opcion.create({
    evento: evMasterclassCiber._id,
    titulo: "Aprobar el taller de ciberseguridad",
    texto: "Completar las prácticas de detección de vulnerabilidades"
  });

  // Emprendimientos
  const opStartup_A = await Opcion.create({
    evento: evStartupRiesgo._id,
    titulo: "Invertir ahorros en infraestructura propia",
    texto: "Arriesgar capital propio comprando servidores de IA"
  });
  const opStartup_B = await Opcion.create({
    evento: evStartupRiesgo._id,
    titulo: "Publicar el proyecto como código abierto",
    texto: "Liberar el proyecto sin arriesgar dinero"
  });

  const opTrading_A = await Opcion.create({
    evento: evBotTrading._id,
    titulo: "Conectar el bot con capital real",
    texto: "Poner a operar el algoritmo cuantitativo en el mercado"
  });

  // Gastos
  const opCamioneta_A = await Opcion.create({
    evento: evGastoCamioneta._id,
    titulo: "Firmar la compra de la 4x4 ($25,000)",
    texto: "Pagar la cuota inicial y asumir la deuda prendaria ($25,000)"
  });

  const opFreeFire_A = await Opcion.create({
    evento: evGastoFreeFire._id,
    titulo: "Comprar pases de batalla y diamantes ($8,000)",
    texto: "Gastar ahorros en pases de batalla y cosméticos ($8,000)"
  });

  const opAnime_A = await Opcion.create({
    evento: evGastoAnime._id,
    titulo: "Importar coleccionables y teclados custom ($12,000)",
    texto: "Pagar costos de envío internacional ($12,000)"
  });

  const opCS2_A = await Opcion.create({
    evento: evCS2Fail._id,
    titulo: "Asumir el desvelo y la falta",
    texto: "Aceptar las consecuencias de desvelarte en la clasificatoria"
  });

  // IA y Colapso
  const opIA_A = await Opcion.create({
    evento: evIAReemplazo._id,
    titulo: "Aceptar la desvinculación laboral",
    texto: "Firmar la salida de la empresa y quedar en búsqueda laboral"
  });

  const opBolsa_A = await Opcion.create({
    evento: evColapsoBolsa._id,
    titulo: "Asumir las pérdidas de la crisis financiera",
    texto: "Aceptar la caída del patrimonio generado"
  });

  const opPala_A = await Opcion.create({
    evento: evMuertePala._id,
    titulo: "Sucumbir ante el pavor de la pala",
    texto: "El pavor irracional a agarrar la pala y ponerte a trabajar concluyó tu simulación laboral"
  });

  const opEnergizantes_A = await Opcion.create({
    evento: evMuerteEnergizantes._id,
    titulo: "Aceptar el desenlace del deploy",
    texto: "Tu carrera concluye por el esfuerzo extremo del trasnocho"
  });

  const opRayo_A = await Opcion.create({
    evento: evMuerteRayo._id,
    titulo: "Fin de la simulación por fuerza mayor",
    texto: "Un impacto electromagnético concluyó tu viaje laboral"
  });

  const opLesion_A = await Opcion.create({
    evento: evLesionDedos._id,
    titulo: "Reposar y realizar rehabilitación médica ($2,000)",
    texto: "Hacer terapia física en las manos ($2,000)"
  });

  // Vacaciones y Familia
  const opVacaciones_A = await Opcion.create({
    evento: evVacaciones._id,
    titulo: "Irte de vacaciones 2 semanas a la playa",
    texto: "Viajar a la costa para descansar y despejar la mente"
  });
  const opVacaciones_B = await Opcion.create({
    evento: evVacaciones._id,
    titulo: "Rechazar las vacaciones y seguir trabajando sin parar",
    texto: "Quedarte trabajando sin descanso"
  });

  const opCasamiento_A = await Opcion.create({
    evento: evCasamiento._id,
    titulo: "Casarte y celebrar la boda",
    texto: "Financiar la boda y asumir compromisos familiares"
  });
  const opCasamiento_B = await Opcion.create({
    evento: evCasamiento._id,
    titulo: "Decidir no casarte por ahora",
    texto: "Priorizar tu independencia y proyectos personales"
  });

  const opHijo_A = await Opcion.create({
    evento: evHijo._id,
    titulo: "Dar la bienvenida a tu primer hijo ($15,000)",
    texto: "Preparar el hogar para la llegada del bebé ($15,000)"
  });

  const opDivorcio_A = await Opcion.create({
    evento: evDivorcio._id,
    titulo: "Firmar el acuerdo de divorcio",
    texto: "Dividir el patrimonio acumulado"
  });

  const opPrincipe_A = await Opcion.create({
    evento: evPrincipeNigeriano._id,
    titulo: "Transferir dinero para liberar la herencia ($5,000)",
    texto: "Enviar el dinero con la esperanza de recibir millones ($5,000)"
  });
  const opPrincipe_B = await Opcion.create({
    evento: evPrincipeNigeriano._id,
    titulo: "Marcar el correo como Spam e ignorarlo",
    texto: "Evitar la estafa e ignorar el mensaje"
  });

  const opPendrive_A = await Opcion.create({
    evento: evPendriveCalle._id,
    titulo: "Conectarlo a la computadora del trabajo",
    texto: "Probar el pendrive por curiosidad"
  });
  const opPendrive_B = await Opcion.create({
    evento: evPendriveCalle._id,
    titulo: "Entregarlo al equipo de seguridad informática",
    texto: "Seguir el protocolo oficial de seguridad"
  });

  const opSudo_A = await Opcion.create({
    evento: evSudoRmRf._id,
    titulo: "Trabajar 72 horas seguidas restaurando copias de respaldo",
    texto: "Recuperar la base de datos de producción"
  });

  const opHackaton_A = await Opcion.create({
    evento: evHackatonCafe._id,
    titulo: "Presentar el prototipo ante el jurado",
    texto: "Competir en la presentación final"
  });

  const opUdemy_A = await Opcion.create({
    evento: evCursoUdemy._id,
    titulo: "Asumir la compra impulsiva de cursos ($3,500)",
    texto: "Registrar el gasto en tu saldo sin haber estudiado nada ($3,500)"
  });

  // Ofertas Laborales Duales
  const opOfertaDevWeb_A = await Opcion.create({
    evento: evOfertaDevWeb._id,
    trabajo: jobDevWebInicial._id,
    titulo: "Aceptar trabajo en Carnicería Don Tito ($14,000 / año)",
    texto: "Firmar contrato laboral como Desarrollador Web Inicial ($14,000 / año)"
  });
  const opOfertaDevWeb_B = await Opcion.create({
    evento: evOfertaDevWeb._id,
    titulo: "Rechazar oferta laboral",
    texto: "Rechazar la propuesta y mantenerse desempleado"
  });

  const opOfertaBackendJr_A = await Opcion.create({
    evento: evOfertaBackendJr._id,
    trabajo: jobJuniorBackend._id,
    titulo: "Aceptar puesto en Startup Tech Innovadora ($32,000 / año)",
    texto: "Firmar contrato como Desarrollador Backend Junior ($32,000 / año)"
  });
  const opOfertaBackendJr_B = await Opcion.create({
    evento: evOfertaBackendJr._id,
    titulo: "Rechazar propuesta de la Startup",
    texto: "Rechazar oferta para buscar otras opciones"
  });

  const opOfertaFullstack_A = await Opcion.create({
    evento: evOfertaFullstack._id,
    trabajo: jobFullstack._id,
    titulo: "Aceptar puesto en Globant Uruguay ($60,000 / año)",
    texto: "Firmar contrato como Desarrollador FullStack ($60,000 / año)"
  });
  const opOfertaFullstack_B = await Opcion.create({
    evento: evOfertaFullstack._id,
    titulo: "Rechazar la propuesta de Globant",
    texto: "Rechazar el cambio para conservar estabilidad"
  });

  const opOfertaLider_A = await Opcion.create({
    evento: evOfertaLider._id,
    trabajo: jobLiderTecnico._id,
    titulo: "Aceptar puesto en Mercado Libre ($110,000 / año)",
    texto: "Firmar contrato como Líder Técnico de Software ($110,000 / año)"
  });
  const opOfertaLider_B = await Opcion.create({
    evento: evOfertaLider._id,
    titulo: "Rechazar la propuesta de Mercado Libre",
    texto: "Rechazar la oferta y continuar en tu posición actual"
  });

  const opOfertaDirector_A = await Opcion.create({
    evento: evOfertaDirector._id,
    trabajo: jobDirectorTech._id,
    titulo: "Aceptar la dirección técnica en Google ($230,000 / año)",
    texto: "Firmar contrato ejecutivo como Director de Ingeniería ($230,000 / año)"
  });
  const opOfertaDirector_B = await Opcion.create({
    evento: evOfertaDirector._id,
    titulo: "Rechazar a Google",
    texto: "Rechazar la propuesta ejecutiva y seguir tu propio camino"
  });

  console.log("✅ Opciones sin efectos entre paréntesis creadas.");

  // 8. Vincular Efectos a Opciones (EfectoOpcion)
  await EfectoOpcion.create({ efecto: efCloud3._id, opcion: opBootCloud_A._id });
  await EfectoOpcion.create({ efecto: efCiber3._id, opcion: opCiber_A._id });
  await EfectoOpcion.create({ efecto: efDotNet2._id, opcion: opDotNet_A._id });

  await EfectoOpcion.create({ efecto: efBackend2._id, opcion: opBackend_A._id });
  await EfectoOpcion.create({ efecto: efCloud1._id, opcion: opBackend_A._id });
  await EfectoOpcion.create({ efecto: efFrontend2._id, opcion: opFrontend_A._id });
  await EfectoOpcion.create({ efecto: efIngles2._id, opcion: opIngles_A._id });
  await EfectoOpcion.create({ efecto: efCiber2._id, opcion: opCiberTall_A._id });

  await EfectoOpcion.create({ efecto: efBackend2._id, opcion: opStartup_A._id });
  await EfectoOpcion.create({ efecto: efBackend2._id, opcion: opStartup_B._id });
  await EfectoOpcion.create({ efecto: efFrontend1._id, opcion: opStartup_B._id });

  await EfectoOpcion.create({ efecto: efBackendMinus1._id, opcion: opLesion_A._id });
  await EfectoOpcion.create({ efecto: efFrontendMinus1._id, opcion: opLesion_A._id });
  await EfectoOpcion.create({ efecto: efDotNetMinus1._id, opcion: opLesion_A._id });

  await EfectoOpcion.create({ efecto: efLiderazgo1._id, opcion: opVacaciones_A._id });
  await EfectoOpcion.create({ efecto: efLiderazgo1._id, opcion: opPrincipe_B._id });
  await EfectoOpcion.create({ efecto: efBackendMinus1._id, opcion: opPendrive_A._id });
  await EfectoOpcion.create({ efecto: efCiber1._id, opcion: opPendrive_B._id });
  await EfectoOpcion.create({ efecto: efCloud2._id, opcion: opSudo_A._id });
  await EfectoOpcion.create({ efecto: efBackend1._id, opcion: opSudo_A._id });
  await EfectoOpcion.create({ efecto: efFrontend2._id, opcion: opHackaton_A._id });

  await EfectoOpcion.create({ efecto: efFrontend1._id, opcion: opOfertaDevWeb_A._id });
  await EfectoOpcion.create({ efecto: efBackend1._id, opcion: opOfertaBackendJr_A._id });
  await EfectoOpcion.create({ efecto: efFrontend1._id, opcion: opOfertaFullstack_A._id });
  await EfectoOpcion.create({ efecto: efLiderazgo1._id, opcion: opOfertaLider_A._id });
  await EfectoOpcion.create({ efecto: efLiderazgo2._id, opcion: opOfertaDirector_A._id });

  console.log("🏆 Seeding de todos los eventos (viejos + nuevos) completado con éxito con repetible: false.");
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error("❌ Error ejecutando seed.js:", err);
  process.exit(1);
});
