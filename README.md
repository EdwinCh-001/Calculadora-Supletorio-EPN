# Calculadora de Supletorios EPN 🎓

Calculadora web (Mobile-First) que permite a los estudiantes de la **Escuela Politécnica Nacional (EPN)** determinar, a partir de sus calificaciones bimestrales:

1. Si **aprueban directamente** la asignatura (exonerados).
2. Si están **en suspenso** y la **nota mínima necesaria** para aprobar el Examen Final / Supletorio (en escalas de 40, 20 y 10 puntos).
3. Si **reprueban directamente** sin derecho a supletorio.

## ⚙️ Stack

- **React 19** + **TypeScript** (fuertemente tipado, sin `any`)
- **Vite** (bundler)
- **CSS moderno** con variables de diseño, tema claro/oscuro automático y Mobile-First

## 🧮 Fórmulas oficiales (no modificar)

| Concepto | Fórmula |
| :-- | :-- |
| Nota semestral | $N_S = B_1 + B_2$ sobre 40 |
| Aprobado directo | $N_S \ge 28.00$ |
| En suspenso | $18.00 \le N_S < 28.00$ |
| Reprobado directo | $N_S < 18.00$ |
| Nota de supletorio | $\text{Nota}_{sup40} = \max(24.00,\ 48.00 - N_S)$ |

## 🗂️ Estructura del proyecto

```text
src/
├── assets/                 # Logo SVG EPN
├── components/             # Header, Footer, GradeForm, ResultCard
├── logic/
│   ├── epnRules.ts         # Lógica pura de cálculo (sin dependencias de UI)
│   └── epnRules.test.ts    # Pruebas unitarias de las reglas
├── App.tsx                 # Contenedor principal (cálculo reactivo)
└── main.tsx                # Punto de entrada
```

## 🚀 Comandos

```powershell
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run lint     # ESLint
npm run build    # verificación de tipos + build de producción
```

## ✅ Validación de reglas académicas

Los 7 casos de prueba mandatorios de `AGENTS.md` se validan con:

```powershell
node .agents/skills/epn-calculator-dev/scripts/validate-rules.mjs
```

Y las pruebas unitarias de TypeScript con:

```powershell
npx --yes tsx src/logic/epnRules.test.ts
```

## 🎨 Identidad visual

- Azul institucional `#003876` y Rojo Politécnico `#B30006`.
- Semáforo de resultados: 🟢 Aprobado / 🟠 Suspenso / 🔴 Reprobado.
- Responsive Mobile-First con update en tiempo real al tipear.