# 🚀 QuetzalX

### Plataforma Inteligente de Arbitraje de Criptomonedas en Tiempo Real

🌐 **Demo en Producción**

https://quetzalx.vercel.app/

# 🦜 ¿Por qué QuetzalX?

El nombre **QuetzalX** surge de la combinación entre identidad cultural mexicana e innovación tecnológica.

## El significado de "Quetzal"

El **quetzal** es una de las aves más emblemáticas de Mesoamérica y un símbolo histórico asociado con la libertad, el valor, la riqueza y la visión estratégica. En las culturas prehispánicas, sus plumas eran consideradas un recurso de gran valor y representaban prestigio y prosperidad.

La elección de este nombre busca reflejar las raíces mexicanas del proyecto y demostrar que es posible desarrollar tecnología financiera moderna desde Latinoamérica para competir en un entorno global.

Dentro del contexto de esta plataforma, el quetzal representa:

* Libertad financiera.
* Inteligencia estratégica.
* Capacidad de adaptación.
* Visión de mercado.
* Orgullo por la identidad mexicana.

## El significado de la "X"

La letra **X** representa el componente tecnológico del proyecto.

Su significado está relacionado con:

* Innovación.
* Tecnología avanzada.
* Sistemas inteligentes.
* Experimentación.
* Evolución continua.

Además, la letra **X** puede interpretarse como una referencia al concepto de **Exchange**, elemento central del sistema, ya que la plataforma monitorea y compara precios entre múltiples exchanges de criptomonedas en tiempo real.

## Significado completo de QuetzalX

**QuetzalX** representa la unión entre la identidad mexicana y la tecnología moderna aplicada a las finanzas digitales.

El proyecto fue concebido como una plataforma capaz de:

* Analizar mercados en tiempo real.
* Detectar oportunidades de arbitraje.
* Gestionar wallets y capital.
* Monitorear exchanges.
* Evaluar rentabilidad después de comisiones y slippage.
* Simular infraestructura profesional de trading.

Más que un simple dashboard, QuetzalX busca demostrar cómo el talento tecnológico mexicano puede desarrollar soluciones financieras modernas utilizando tecnologías web, bases de datos y procesamiento de información en tiempo real.

## Autor

**Hugo Arcos Zúñiga**

Desarrollador del proyecto QuetzalX, una plataforma de arbitraje de criptomonedas creada para explorar la aplicación de tecnologías modernas en el análisis de mercados financieros digitales.

El objetivo principal del proyecto es integrar monitoreo en tiempo real, análisis de oportunidades y gestión de activos dentro de una arquitectura moderna basada en Nuxt 3, TypeScript y PostgreSQL.

---

# 📖 Descripción

**QuetzalX** es una plataforma de inteligencia financiera diseñada para detectar oportunidades de arbitraje de criptomonedas en tiempo real entre múltiples exchanges.

El sistema monitorea continuamente los mercados, compara precios entre plataformas, calcula ganancias potenciales y evalúa si una operación sigue siendo rentable después de considerar:

* Comisiones de trading
* Slippage (deslizamiento)
* Costos operativos
* Reglas básicas de gestión de riesgo

El objetivo es simular la infraestructura de un motor profesional de arbitraje capaz de identificar oportunidades reales dentro del ecosistema de criptomonedas.

---

# ✨ Funcionalidades Principales

## 📊 Dashboard General

* Resumen del estado del sistema.
* Métricas operativas.
* Ganancias acumuladas.
* Oportunidades detectadas.
* Historial reciente.

---

## 🔍 Detección de Arbitraje

* Comparación de precios entre exchanges.
* Cálculo automático de spreads.
* Evaluación de rentabilidad.
* Ranking de oportunidades.
* Filtrado de operaciones no rentables.

---

## 💹 Gestión de Trades

* Registro de operaciones ejecutadas.
* Cálculo de ganancias netas.
* Historial de transacciones.
* Métricas de rendimiento.
* Estadísticas de win rate.

---

## 💰 Administración de Wallets

* Balance por exchange.
* Capital total disponible.
* Distribución de fondos.
* Historial de movimientos.
* Seguimiento de BTC y USDT.

---

## 🏦 Gestión de Exchanges

Exchanges soportados:

* Binance
* Coinbase
* Kraken
* OKX
* Bybit

Características:

* Estado operativo.
* Monitoreo de conectividad.
* Visualización de wallets.
* Ranking de oportunidades.
* Feed de mercado en vivo.

---

## 🖥️ Monitoreo del Sistema

* Estado de APIs.
* Latencia de feeds.
* Actividad reciente.
* Estado de base de datos.
* Estado de motores internos.

---

# 🛠️ Stack Tecnológico

| Categoría            | Tecnología              |
| -------------------- | ----------------------- |
| Frontend             | Nuxt 3                  |
| Lenguaje             | TypeScript              |
| Estilos              | Tailwind CSS            |
| Backend              | Nitro Server            |
| Base de Datos        | PostgreSQL              |
| ORM                  | Drizzle ORM             |
| Gestión de Paquetes  | PNPM                    |
| Despliegue           | Vercel                  |
| Datos de Mercado     | WebSockets de Exchanges |
| Control de Versiones | Git + GitHub            |

---

# 🏗️ Arquitectura General

```text
WebSockets Exchanges
         │
         ▼
Estado de Mercado
         │
         ▼
Detector de Arbitraje
         │
         ▼
Motor de Oportunidades
         │
         ▼
Motor de Ejecución
         │
         ▼
PostgreSQL
         │
         ▼
Dashboard Nuxt 3
```

---

# 📂 Estructura del Proyecto

```text
app/
├── components/
├── layouts/
├── pages/
├── composables/

server/
├── api/
├── arbitrage/
├── feeds/
├── db/

drizzle/
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/QuetzalX.git

cd QuetzalX
```

---

## 2. Instalar dependencias

```bash
pnpm install
```

---

## 3. Configurar variables de entorno

Crear el archivo:

```env
.env
```

Ejemplo:

```env
DATABASE_URL=postgresql://usuario:password@host:5432/database
```

---

## 4. Ejecutar migraciones

```bash
pnpm drizzle-kit push
```

---

## 5. Iniciar el proyecto

```bash
pnpm dev
```

Abrir:

```text
http://localhost:3000
```

---

# 🗄️ Persistencia de Datos

El sistema almacena:

* Exchanges
* Oportunidades
* Trades
* Wallets
* Transacciones de Wallet
* Eventos del Sistema
* Métricas del Dashboard

Los precios de mercado se mantienen en memoria para maximizar la velocidad de detección de oportunidades en tiempo real.

---

# 📸 Capturas de Pantalla

## Dashboard Principal

Agregar imagen:

```text
/public/screenshots/dashboard.png
```

---

## Oportunidades de Arbitraje

Agregar imagen:

```text
/public/screenshots/opportunities.png
```

---

## Historial de Trades

Agregar imagen:

```text
/public/screenshots/trades.png
```

---

## Gestión de Wallets

Agregar imagen:

```text
/public/screenshots/wallets.png
```

---

## Monitoreo del Sistema

Agregar imagen:

```text
/public/screenshots/system.png
```

---

## Gestión de Exchanges

Agregar imagen:

```text
/public/screenshots/exchanges.png
```

---

# 🧮 Lógica de Arbitraje

El sistema compara todas las combinaciones posibles entre exchanges.

Ejemplo:

```text
Comprar en Coinbase
Vender en Binance
```

Posteriormente calcula:

```text
Spread
Ganancia estimada
Comisiones
Slippage
Ganancia neta
```

Solo se considera válida una oportunidad cuando:

```text
Ganancia Neta > 0
```

Esto evita operaciones artificiales o poco realistas.

---

# 📌 Nota Importante

QuetzalX utiliza datos reales del mercado.

Por esta razón es completamente normal que en determinados momentos el sistema muestre:

* 0 Trades
* 0 Profit
* 0 Win Rate

cuando no existen oportunidades de arbitraje rentables después de aplicar comisiones y slippage.

Este comportamiento demuestra que el motor de arbitraje está funcionando correctamente y descartando operaciones no rentables.

---

# 🚀 Mejoras Futuras

* Historial completo de precios.
* Soporte para más criptomonedas.
* Sistema de alertas.
* Notificaciones en tiempo real.
* Backtesting.
* Gestión avanzada de riesgo.
* Ejecución automática de operaciones.
* Análisis predictivo mediante IA.

---

# 👨‍💻 Autor

**Hugo Arcos Zúñiga**

Proyecto desarrollado como plataforma de monitoreo y detección de arbitraje de criptomonedas en tiempo real.

🌐 Demo:

https://quetzalx.vercel.app/
