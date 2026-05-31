# 🚀 Arbitrage Trading Platform

Sistema completo de monitoreo, detección y ejecución de oportunidades de arbitraje entre múltiples exchanges de criptomonedas, desarrollado con **Nuxt 3**, **TypeScript**, **PostgreSQL**, **Drizzle ORM** y arquitectura modular orientada a tiempo real.

---

# 📖 Descripción General

Este proyecto implementa una plataforma de arbitraje que permite:

* Monitorear cotizaciones en tiempo real de múltiples exchanges.
* Detectar oportunidades de arbitraje automáticamente.
* Ejecutar operaciones simuladas de compra y venta.
* Administrar balances por exchange.
* Registrar historial completo de operaciones.
* Monitorear la infraestructura y salud del sistema.
* Analizar el rendimiento operativo mediante dashboards visuales.

---

# 🏗️ Arquitectura Tecnológica

| Tecnología            | Uso                           |
| --------------------- | ----------------------------- |
| Nuxt 3                | Frontend y Backend Full Stack |
| Vue 3 Composition API | Componentes reactivos         |
| TypeScript            | Tipado estático               |
| PostgreSQL            | Base de datos principal       |
| Drizzle ORM           | Acceso y modelado de datos    |
| TailwindCSS           | Diseño UI                     |
| Nitro Server          | API Backend                   |
| WebSockets / Polling  | Actualización en tiempo real  |

---

# 📂 Estructura del Proyecto

```text
components/
├── dashboard/
├── exchanges/
├── opportunities/
├── system/
├── trades/
├── wallets/
└── ui/

pages/
├── dashboard/
├── exchanges/
├── opportunities/
├── system/
├── trades/
└── wallets/

server/
├── api/
├── arbitrage/
├── db/
└── services/
```

---

# ⚙️ Módulos Implementados

## 1. Exchanges

Gestión y monitoreo de exchanges conectados.

### Funcionalidades

* Visualización de exchanges activos.
* Estado operativo por exchange.
* Capital asignado por exchange.
* Distribución porcentual de capital.
* Feed de mercado en tiempo real.
* Detección de exchanges sin datos.

### Métricas

| Métrica          | Descripción                    |
| ---------------- | ------------------------------ |
| Exchanges        | Total de exchanges registrados |
| Active           | Exchanges operativos           |
| Wallet Capital   | Capital total distribuido      |
| Live Market Feed | Cotizaciones en tiempo real    |

---

## 2. Opportunities

Detección de oportunidades de arbitraje.

### Funcionalidades

* Comparación entre exchanges.
* Diferencia de precios.
* Estimación de ganancias.
* Ranking de oportunidades.
* Historial de detecciones.

### Información almacenada

| Campo            |
| ---------------- |
| Buy Exchange     |
| Sell Exchange    |
| Buy Price        |
| Sell Price       |
| Spread           |
| Estimated Profit |
| Volume BTC       |
| Score            |
| Status           |
| Detection Time   |

---

## 3. Trades

Historial de operaciones ejecutadas.

### Funcionalidades

* Registro completo de trades.
* Paginación.
* Búsqueda.
* Filtrado.
* Estadísticas generales.

### Métricas

| Métrica      | Descripción                        |
| ------------ | ---------------------------------- |
| Total Trades | Operaciones ejecutadas             |
| Total Profit | Ganancia acumulada                 |
| Win Rate     | Porcentaje de operaciones exitosas |
| Best Trade   | Mejor operación registrada         |

### Información por Trade

| Campo          |
| -------------- |
| Buy Exchange   |
| Sell Exchange  |
| Route          |
| Buy Price      |
| Sell Price     |
| Gross Profit   |
| Fees           |
| Slippage       |
| Net Profit     |
| Status         |
| Execution Date |

---

## 4. Wallets

Administración de capital.

### Funcionalidades

* Balance por exchange.
* Distribución de capital.
* Historial de movimientos.
* Monitoreo de BTC y USDT.
* Capital total consolidado.

### Métricas

| Métrica        |
| -------------- |
| Active Wallets |
| Total Capital  |
| BTC Holdings   |

### Gestión de Activos

* BTC
* USDT

---

## 5. System

Centro de monitoreo de infraestructura.

### Funcionalidades

* Estado del motor de arbitraje.
* Estado de mercado.
* Estado de base de datos.
* Estado de APIs.
* Monitoreo de latencia.
* Feed de mercado.
* Timeline de eventos.

### Componentes

| Componente         |
| ------------------ |
| Market Feed        |
| Trade Engine       |
| Opportunity Engine |
| Database           |
| API Health         |

---

# 🗄️ Modelo de Datos

## Exchanges

```sql
id
code
name
is_active
created_at
updated_at
```

## Wallets

```sql
id
exchange_id
btc_balance
usdt_balance
created_at
updated_at
```

## Opportunities

```sql
id
buy_exchange_id
sell_exchange_id
buy_price
sell_price
spread
estimated_profit
volume_btc
score
status
detected_at
```

## Trades

```sql
id
buy_exchange_id
sell_exchange_id
buy_price
sell_price
gross_profit
fees
slippage
net_profit
status
executed_at
```

## Wallet Transactions

```sql
id
wallet_id
asset
amount
transaction_type
created_at
```

---

# 🔄 Flujo Operativo

```text
Market Quotes
      ↓
Opportunity Detection
      ↓
Score Calculation
      ↓
Trade Execution
      ↓
Wallet Update
      ↓
Transaction Log
      ↓
Dashboard Visualization
```

---

# 🎯 Características Destacadas

## Tiempo Real

* Actualización automática de cotizaciones.
* Monitoreo continuo.
* Detección instantánea de oportunidades.

## Escalabilidad

* Arquitectura modular.
* Componentes reutilizables.
* Separación clara de responsabilidades.

## Observabilidad

* Dashboard operativo completo.
* Historial de eventos.
* Métricas del sistema.
* Monitoreo de latencia.

## Experiencia de Usuario

* Diseño responsivo.
* Dark Theme.
* Paginación optimizada.
* Estados vacíos controlados.
* Visualización clara de métricas.

---

# 📊 Funcionalidades Implementadas

| Funcionalidad            | Estado |
| ------------------------ | ------ |
| Gestión de Exchanges     | ✅      |
| Gestión de Wallets       | ✅      |
| Detección de Arbitraje   | ✅      |
| Ejecución de Trades      | ✅      |
| Historial de Operaciones | ✅      |
| Feed de Mercado          | ✅      |
| Dashboard de Sistema     | ✅      |
| Monitoreo de Latencia    | ✅      |
| Paginación               | ✅      |
| Búsqueda y Filtros       | ✅      |
| PostgreSQL               | ✅      |
| Drizzle ORM              | ✅      |
| API REST                 | ✅      |

---

# 🚀 Instalación

```bash
git clone <repository-url>

cd arbitrage-platform

npm install

npm run dev
```

---

# 🧪 Desarrollo

```bash
npm run dev
```

Servidor:

```text
http://localhost:3000
```

---

# 🛢️ Base de Datos

Migraciones:

```bash
npm run db:generate

npm run db:migrate
```

Studio:

```bash
npm run db:studio
```

---

# 👨‍💻 Autor

Proyecto desarrollado como plataforma integral de arbitraje de criptomonedas utilizando tecnologías modernas Full Stack con enfoque en monitoreo, observabilidad y ejecución de operaciones en tiempo real.

---

# 📄 Licencia

MIT License
