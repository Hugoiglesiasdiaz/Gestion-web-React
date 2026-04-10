# 📱 Mobile Store - Premium E-commerce Experience

![CI Status](https://github.com/Hugoiglesiasdiaz/Gestion-web-React/actions/workflows/automatizacion.yml/badge.svg)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat&logo=vercel)](https://gestion-web-react.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

Una aplicación de comercio electrónico de alto rendimiento diseñada con un enfoque **Mobile-First**, priorizando la estética premium, la accesibilidad y la robustez técnica.

## 🚀 Demo en Vivo
Puedes ver el proyecto desplegado aquí: **[Ver Demo en Vercel](https://gestion-web-react.vercel.app)**

---

## 🛠️ Tech Stack & Arquitectura

El proyecto se ha construido bajo principios de **Clean Code** y **Arquitectura Atómica**:

* **Frontend:** React 19 con Vite para una experiencia de desarrollo ultra-rápida.
* **Estilos:** Tailwind CSS, utilizando una paleta minimalista y tipografías ligeras.
* **Gestión de Estado:** Context API con persistencia automática en `LocalStorage`.
* **Testing:** Vitest y React Testing Library para asegurar la fiabilidad de los componentes.
* **Seguridad:** Dependencias auditadas (0 vulnerabilidades críticas).

### Estructura Atómica
Para garantizar la escalabilidad, los componentes se dividen en:
-   **Atoms:** Componentes básicos (Botones, Badges, Inputs).
-   **Molecules:** Combinación de átomos (SearchBar, Selector de Variantes).
-   **Organisms:** Secciones complejas (ProductCard, CartSummary).
-   **Pages:** Orquestadores de la lógica de negocio y vistas principales.

---

## ✨ Características Destacadas

### 🛒 Gestión Avanzada de Carrito
-   **Agrupación Inteligente:** Los productos duplicados se agrupan automáticamente, incrementando su cantidad en lugar de crear nuevas entradas.
-   **Sincronización Atómica:** Manejo de estado funcional para evitar *race conditions* en las actualizaciones de cantidad.

### ♿ Accesibilidad (A11y) & SEO
-   **Lighthouse 100/100:** Optimización completa en accesibilidad y buenas prácticas.
-   **Image Optimization:** Carga diferida y manejo de fallos en imágenes de la API.

### 🧪 CI/CD & Calidad
Pipeline de integración continua configurado en **GitHub Actions**:
1.  **Linting:** Verificación de reglas de estilo.
2.  **Unit Tests:** Validación de lógica de negocio (formateo de precios, cálculos).
3.  **Component Tests:** Verificación de interacciones de usuario.
4.  **Build Check:** Garantía de que la aplicación compila correctamente para producción.

---

## 📦 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Hugoiglesiasdiaz/Gestion-web-React.git
    cd Gestion-web-React
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Copia el archivo de ejemplo y añade tu clave de API:
    ```bash
    cp .env.example .env
    ```

4.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

5.  **Ejecutar tests:**
    ```bash
    npm run test:run
    ```

---

## 🛡️ Auditoría de Seguridad
Este proyecto ha sido parcheado contra vulnerabilidades comunes (CVEs en Axios/Vite).
```bash
# Estado actual:
found 0 vulnerabilities
```
