# Prueba técnica - Web components

Proyecto básico hecho con Typescript, utilizando web components mostrar la información de un usuario de GitHub, a través de tarjeta desplegable

## Técnologias utilizadas

- Empaquetado: [Bun](https://bun.sh/)
- Lenguaje de programación: [Typescript](https://www.typescriptlang.org/docs/)
- Estilos: [CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- Reglas de estilo de código: [Eslint](https://eslint.org/docs/latest/)
- Formateador de código: [Prettier](https://prettier.io/docs/)
- Componentes: [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- Testing: [Jest](https://jestjs.io/)

## Instalación

Tienes dos opciones:

1. **Clonar vía git:**

   ```sh
   git clone https://github.com/mmponce/prueba-tecnica
   ```

2. **Clonar vía GitHub Desktop:**
   - Descarga [GitHub Desktop](https://desktop.github.com/download/)
   - Ingresa con una cuenta github y clona el [repositorio](https://github.com/mmponce/prueba-tecnica)

En caso de no tener bun se debe instalar y seguido de esto, instalar las dependencias del proyecto:

```sh
npm install -g bun
bun install
```

## Scripts

- Modo desarrollo:

```sh
bun run dev
```

- Crear build:

```sh
bun run build
```

- Previsualización del build:

```sh
bun run preview
```

- Verificar reglas de código:

```sh
bun run lint
```

- Formatear código del proyecto:

```sh
bun run format
```
- Ejecutar test del proyecto:

```sh
bun run test
```

## Estructura de carpetas principales

```plaintext
prueba-tecnica /
├── src/
│   ├── adapters/ <- Adapters para convertir la data de la API al modelo en ts
│   ├── components/ <- Web-components
│   ├── test/ <- Archivos test de los Web-components
│   └── types/ <- Interfaces generadas para el proyecto
├── package.json <- Dependencias del proyecto
└── README.md <- Instructivo para instalación de proyecto
```