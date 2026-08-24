/* ==========================================================================
   lib/manifest.js — brand & content data. The ONLY thing this file does is
   expose window.__BRAND__. No logic here (see main.js).
   ========================================================================== */
(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Cristian Rodríguez Montaño",
    firstName: "Cristian",
    role: "Desarrollador de Software Full Stack",
    tagline:
      "Creamos software a la medida para automatizar procesos, organizar información y ahorrar tiempo a tu empresa.",
    heroKicker: "Estudio de desarrollo de software · Cali, Colombia",
    heroSub:
      "Ingeniero de Sistemas con más de 4 años liderando aplicativos web institucionales de principio a fin: base de datos, backend y frontend. Si tu negocio todavía depende de Excel, papel o procesos manuales, puedo construir la plataforma que lo resuelva.",
    location: "Cali, Valle del Cauca, Colombia · abierto a proyectos remotos",

    contact: {
      whatsappNumber: "573183771231",
      whatsappDisplay: "+57 318 377 1231",
      whatsappMessage:
        "Hola Cristian, vi tu portafolio y quiero contarte sobre un proceso que quiero mejorar en mi empresa.",
      email: "cri.stian123@hotmail.com",
      linkedin: "https://www.linkedin.com/in/cristian-rodriguez-m",
      linkedinLabel: "linkedin.com/in/cristian-rodriguez-m"
    },

    stats: [
      { to: 4, suffix: "+", label: "años de experiencia full stack" },
      { to: 50, suffix: "+", label: "módulos funcionales en producción" },
      { to: 2026, suffix: "", label: "plataforma pública en vivo desde", isYear: true }
    ],

    stack: [
      "Angular", "TypeScript", "JavaScript", "Laravel", "PHP", "Java",
      "Spring Boot", "PostgreSQL", "MySQL", "SQL Server", "Docker",
      "Google Cloud Platform", "API REST", "Git"
    ],

    cases: [
      {
        id: "rethus",
        tag: "Caso insignia — sector público",
        name: "RETHUS Valle del Cauca",
        client: "Gobernación del Valle del Cauca · Secretaría de Salud",
        period: "En producción desde abril de 2026",
        url: "https://rethus.valledelcauca.gov.co",
        urlLabel: "rethus.valledelcauca.gov.co",
        problem:
          "Los egresados del sector salud debían desplazarse físicamente hasta la Gobernación para tramitar la resolución que los habilita a ejercer: filas, papeleo y semanas de espera.",
        build:
          "Diseñé y construí desde cero la base de datos, la API REST en Laravel y la interfaz en Angular: más de 50 módulos funcionales, entre ellos registro de usuario, carga y validación de documentos, gestión de pagos, firma digital y notificaciones automáticas. Integré una API externa de firma digital, respaldo documental en la nube y avisos por correo al ciudadano.",
        result:
          "Un trámite que antes exigía atención presencial —incluido el pago— ahora se resuelve en línea de principio a fin, con trazabilidad completa para la Secretaría de Salud.",
        stackTags: ["Angular", "Laravel", "PostgreSQL", "API REST", "Firma digital", "GCP"],
        mockup: "rethus"
      },
      {
        id: "iptotal-celsia",
        tag: "Cliente corporativo",
        name: "Módulos para el sector energético",
        client: "Iptotal Software S.A. — desarrollos para Celsia",
        period: "Marzo 2022 – Abril 2025",
        url: "",
        urlLabel: "",
        problem:
          "Celsia y otros clientes corporativos necesitaban módulos a la medida para integrarse con procesos y sistemas ya existentes, sin frenar la operación.",
        build:
          "Desarrollé interfaces funcionales, consumo de servicios y lógica de negocio con JavaScript, PHP, Laravel y Java, además de la gestión de bases de datos SQL asociadas, bajo control de versiones con Git y SVN.",
        result:
          "Módulos corporativos estables en producción, con corrección continua de errores y mantenimiento bajo estándares de una empresa de software con clientes del sector energético.",
        stackTags: ["JavaScript", "PHP", "Laravel", "Java", "SQL"],
        mockup: "corporate"
      }
    ],

    services: [
      {
        name: "Digitalización básica",
        summary:
          "Convierto un proceso que hoy vive en Excel o formularios en papel en una aplicación web sencilla, ordenada y fácil de usar.",
        items: ["Formularios y registros en línea", "Reemplazo de hojas de cálculo críticas", "Panel de consulta simple"]
      },
      {
        name: "Sistema empresarial",
        summary:
          "Módulos con usuarios, roles, estados, documentos, búsquedas, reportes y panel administrativo para operar tu negocio.",
        items: ["Gestión de usuarios y roles", "Documentos y flujos de aprobación", "Reportes y dashboards administrativos"]
      },
      {
        name: "Automatización e integración",
        summary:
          "Conecto tus sistemas, automatizo tareas repetitivas y centralizo información entre plataformas y APIs externas.",
        items: ["Integración de APIs externas", "Generación automática de documentos", "Notificaciones y alertas automáticas"]
      }
    ],

    process: [
      { step: "1", title: "Reunión inicial", desc: "Entiendo el proceso que quieres mejorar y el contexto de tu equipo." },
      { step: "2", title: "Definición de alcance", desc: "Delimitamos módulos, prioridades y tiempos reales." },
      { step: "3", title: "Propuesta", desc: "Recibes una propuesta clara: qué se construye, en cuánto tiempo y qué incluye." },
      { step: "4", title: "Desarrollo", desc: "Construyo el backend, la base de datos y el frontend con avances visibles." },
      { step: "5", title: "Pruebas", desc: "Validamos juntos que cada módulo funcione como el negocio lo necesita." },
      { step: "6", title: "Entrega y soporte", desc: "Despliegue en producción y acompañamiento posterior al lanzamiento." }
    ],

    about: {
      title: "Ingeniero de Sistemas, responsable de un aplicativo público de punta a punta",
      body:
        "Soy Ingeniero de Sistemas por la Universidad Antonio José Camacho (Cali), con más de 4 años desarrollando software para instituciones y empresas. Desde abril de 2025 soy el responsable único del desarrollo de RETHUS Valle del Cauca para la Secretaría de Salud del Valle del Cauca: base de datos, backend y frontend construidos por mí, de cero a producción. Antes, en Iptotal Software, desarrollé módulos para clientes corporativos como Celsia. Trabajo con Angular, TypeScript, Laravel, PHP, Java, PostgreSQL, MySQL, Docker y Google Cloud."
    },

    education: [
      { school: "Universidad Antonio José Camacho", degree: "Ingeniero de Sistemas", period: "Feb. 2020 – Sep. 2023" },
      { school: "Universidad Antonio José Camacho", degree: "Tecnólogo en Sistemas", period: "Ene. 2016 – Nov. 2019" }
    ],

    cta: {
      primary: "Solicita una cotización",
      secondary: "Cuéntanos qué proceso quieres mejorar"
    }
  };
})();
