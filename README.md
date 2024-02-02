# Proyecto de Autenticación y Registro de Usuarios con NodeJS y TypeScript

¡Bienvenido al proyecto de Autenticación y Registro de Usuarios! Este repositorio te proporcionará una base sólida para desarrollar un Restful API con NodeJS y TypeScript. Se utiliza Clean Architecture y patrones de desarrollo avanzados para estructurar el código de manera eficiente y segura.

## Contenido

- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Json Web Tokens (JWT)](#json-web-tokens-jwt)
- [Contribuciones](#contribuciones)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el archivo **.env.template** y renómbralo a **.env**.

2. Instala las dependencias.
   ```bash
   npm install```

3. Levanta la base de datos.
   ```bash
   docker-compose up -d```

4. Ejecuta el proyecto.
   ```bash
    npm run dev```

## Estructura del Proyecto

Este proyecto sigue los principios de Clean Architecture para organizar el código de manera eficiente. La arquitectura se divide en capas: aplicación, dominio e infraestructura. Explora cada una para entender cómo se organiza el código.

## Json Web Tokens (JWT)

El proyecto hace uso de JWT para autenticar a los usuarios. JWT es un estándar abierto que define una forma compacta y autónoma para transmitir información de forma segura entre las partes como un objeto JSON. La información puede ser verificada y confiable porque está firmada digitalmente. Aprende más sobre JWT [aquí](https://jwt.io/introduction/).

## Contribuciones

Contribuciones son bienvenidas! Si encuentras errores, mejoras posibles o nuevas características que podrían ser implementadas, siéntete libre de abrir un issue o enviar un pull request.
