# Documentación de Datos Semilla y Módulo Backend (MongoDB)

Este documento detalla la estructura completa de datos iniciales del juego **LaburoYHambre**, sembrados directamente en MongoDB, y la guía para ejecutar el script de carga.

---

## Script de Inicialización

El script ejecutable se encuentra en:
`..\LaburoYHambre\seed.js`

### Comando de Ejecución (en cualquier momento):
```bash
node seed.js
```

El script limpia las colecciones existentes en MongoDB y siembra todos los datos iniciales necesarios para el flujo del juego.

---

## Detalle de Datos Iniciales Creados en MongoDB

### 1. Habilidades (`Habilidad`)
| ID / Nombre | Categoría | Descripción |
| :--- | :--- | :--- |
| **Backend** | Software | Desarrollo en Node.js, Express y bases de datos |
| **Inglés** | Idiomas | Dominio técnico e interactivo del idioma inglés |
| **Cloud y Infraestructura** | Infraestructura | Gestión en AWS, Docker y Kubernetes |
| **Frontend** | Web | Desarrollo web con React y TypeScript |

---

### 2. Estudios (`Estudio`)
| Nombre | Tier |
| :--- | :---: |
| Autodidacta / BootCamp Tech | 1 |
| Tecnicatura Universitaria en Programación | 2 |
| Ingeniería en Sistemas / Ciencias de la Computación | 3 |

---

### 3. Empresas (`Empresa`)
| Nombre | Tier | Tamaño | Tipo |
| :--- | :---: | :--- | :--- |
| Startup Tech Innovadora | 1 | Startup | Tecnología |
| Globant | 2 | Multinacional | Consultoría IT |
| Mercado Libre | 3 | Enterprise | E-Commerce / FinTech |
| Unicorn Global San Francisco | 4 | Unicornio | Big Tech |

---

### 4. Trabajos (`Trabajo`)
| Puesto | Área | Salario Base | Edad Mínima | Empresa Asociada |
| :--- | :--- | :---: | :---: | :--- |
| **Trainee Software Engineer** | Programacion | $15,000 / año | 18 | Startup Tech Innovadora |
| **Junior Backend Developer** | Programacion | $30,000 / año | 20 | Startup Tech Innovadora |
| **Mid FullStack Developer** | Web | $60,000 / año | 24 | Globant |
| **Senior Cloud Architect** | Infraestructura | $110,000 / año | 28 | Mercado Libre |
| **VP of Engineering** | Programacion | $220,000 / año | 35 | Unicorn Global San Francisco |

---

### 5. Eventos y Decisiones (`Evento`, `Opcion`, `Efecto`, `EfectoOpcion`)

#### Evento 1: ¡Refactor de Emergencia en Producción!
- **Descripción**: El servidor principal cayó un domingo a las 3 AM. Tienes la oportunidad de liderar el arreglo del sistema.
- **Rango de Edad**: 18 a 35 años.
- **Opciones**:
  1. *Resolver solo en la madrugada*: Aplica **+2 Backend** y **+2 Cloud y Infraestructura**.
  2. *Coordinar llamada en inglés*: Aplica **+2 Inglés**.

#### Evento 2: Propuesta de Startup Internacional
- **Descripción**: Una empresa unicornio de San Francisco busca un desarrollador remoto con inglés fluido.
- **Rango de Edad**: 22 a 50 años.
- **Opciones**:
  1. *Aceptar la oferta remota*: Aplica **+2 Inglés** y **+2 Frontend**.
  2. *Permanecer en la empresa*: Aplica **+2 Backend**.

#### Evento 3: Certificación Oficial de AWS DevOps
- **Descripción**: La empresa ofrece financiar tu examen de certificación internacional en arquitectura cloud.
- **Rango de Edad**: 20 a 55 años.
- **Opciones**:
  1. *Rendir la certificación Cloud*: Aplica **+2 Cloud y Infraestructura**.
  2. *Pedir bono salarial*: Otorga bonificación directa de dinero en la partida.

#### Evento 4: Negociación de Ascenso a Tech Lead
- **Descripción**: Se abre una vacante de liderazgo técnico para dirigir el equipo de arquitectura y producto.
- **Rango de Edad**: 28 a 64 años.
- **Opciones**:
  1. *Asumir la posición de Tech Lead*: Aplica **+2 Backend** y **+2 Cloud y Infraestructura**.
  2. *Continuar como Desarrollador Individual*: Aplica **+2 Frontend**.

---

### 6. Usuarios de Prueba y Ranking Global (`User`, `RunTrabajo`)
| Posición | Usuario | Email | Edad Final | Patrimonio Generado | Estado |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 🥇 | **MatiasDev** | matias@test.com | 65 años | $1,480,000 | Completada |
| 🥈 | **CodeNinja** | ninja@test.com | 65 años | $950,000 | Completada |
| 🥉 | **JuniorHero** | junior@test.com | 65 años | $420,000 | Completada |