# LaburoYHambre — Backend

¡Bienvenido al repositorio backend de **LaburoYHambre**! La API REST que gestiona la lógica de juego, partidas, usuarios, habilidades, ofertas de trabajo y eventos estocásticos para el simulador de carrera IT.

---

## Acerca del Proyecto

El servidor backend provee la persistencia y reglas de negocio para el simulador **LaburoYHambre**. Gestiona el registro de usuarios con autenticación JWT, la creación y avance de partidas (`RunTrabajo`), cálculo de incrementos salariales y antigüedad, evaluación de eventos y aplicación de efectos sobre las habilidades del jugador.

El proyecto está dividido en **dos repositorios separados**:
1. **Backend**: API REST en Node.js, Express y MongoDB (`LaburoYHambre`).
2. **Frontend**: Aplicación Web React SPA (`frontLaburoYHambre`).

---

## Tecnologías Utilizadas

- **Entorno de Ejecución**: Node.js (ES Modules)
- **Framework Web**: Express.js
- **Base de Datos**: MongoDB (usando [Mongoose ODM](https://mongoosejs.com/))
- **Autenticación**: JSON Web Token (JWT) & bcryptjs
- **Variables de Entorno**: dotenv

---

## Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **MongoDB**: Instancia local corriendo (puerto 27017) o URI de MongoDB Atlas

---

## Instalación y Configuración Local

Sigue estos pasos para levantar la API REST en tu máquina:

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jhonch1s/laburoYhambre.git
cd laburoYhambre
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:
```env
PORT=3000
MONGO_URI=(tu mongo uri)
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRES_IN="1h"
```

### 4. Poblar la Base de Datos (Seeding Obligatorio)
Antes de iniciar por primera vez, ejecuta el script de seed para crear el catálogo inicial de Habilidades, Estudios, Empresas por Tiers, Trabajos y Eventos:
```bash
node seed.js
```

### 5. Iniciar el servidor
Para desarrollo con auto-reload:
```bash
npm run dev
```
O para producción:
```bash
npm start
```
La API estará escuchando en `http://localhost:3000`.

---

## Endpoints Principales de la API

### Autenticación (`/usuario`)
- `POST /usuario/crear`: Registrar nuevo usuario.
- `POST /usuario/login`: Iniciar sesión y obtener JWT token.

### Partidas / Runs (`/runTrabajo`)
- `POST /runTrabajo/iniciarRun/:idUsuario`: Iniciar una nueva partida. (Finaliza cualquier partida activa anterior).
- `GET /runTrabajo/obtenerRunTrabajoActivo/:idUsuario`: Obtener la partida en proceso del usuario.
- `GET /runTrabajo/obtenerRunTrabajo/:idUsuario`: Obtener historial completo de partidas del usuario.
- `PATCH /runTrabajo/aumentarEdad/:idUsuario`: Avanzar un año en la edad del jugador y actualizar antigüedad salarial.
- `PATCH /runTrabajo/aumentarDinero/:idUsuario`: Acumular ingresos del año actual.

### Eventos y Opciones (`/evento`, `/opcion`)
- `GET /evento/ver`: Obtener lista de eventos disponibles.
- `GET /opcion/evento/:idEvento/opciones`: Obtener opciones asociadas a un evento.
- `POST /opcion/tomarOpcion/:idEvento/:idRunTrabajo`: Registrar la decisión tomada por el jugador y aplicar efectos (salario, trabajo o habilidades).

### Ranking (`/ranking`)
- `GET /ranking`: Obtener el leaderboard global de partidas completadas a los 65 años ordenadas por patrimonio acumulado.
