# Validacion__formulario_Cypress

Ejemplo de uso de cypress, para validar en este caso un formulario.

![Descripción del video](video_explicacion.gif)

## Características

### Formulario de Registro
- **Campos obligatorios**:
  - Nombre completo
  - Correo electrónico (con validación de formato)
  - Contraseña (con requisitos de seguridad)
  - Confirmación de contraseña
  - Aceptación de términos y condiciones
- **Campos opcionales**:
  - Fecha de nacimiento
- **Validaciones en tiempo real**:
  - Errores específicos para cada tipo de validación
  - Habilitación/deshabilitación automática del botón de envío
  - Verificación de coincidencia de contraseñas

### Página de Confirmación
- Mensaje de bienvenida personalizado
- Resumen de la información registrada (sin mostrar la contraseña)
- Opciones para navegar al inicio o continuar al área de usuario

### Tests Automatizados con Cypress
- Validación de carga correcta del formulario
- Verificación de campos obligatorios
- Pruebas de formato y validación de correo electrónico
- Verificación de requisitos de seguridad de contraseña
- Pruebas de flujo completo de registro
- Manejo de caracteres especiales
- Pruebas básicas de seguridad contra inyección de scripts

## Estructura del Proyecto

```
├── registro.html       # Página principal con el formulario de registro
├── confirmacion.html   # Página de confirmación tras registro exitoso
├── styles.css          # Estilos CSS para ambas páginas
├── script.js           # Lógica JavaScript para validaciones
├── cypress/            # Directorio de pruebas Cypress
│   └── e2e/            # Tests end-to-end
│       └── form.cy.js  # Tests del formulario de registro
└── cypress.config.js   # Configuración de Cypress
```

## Requisitos Técnicos

### Validaciones Implementadas
1. **Campos obligatorios**: No pueden estar vacíos
2. **Correo electrónico**: Debe tener un formato válido (validado con regex)
3. **Contraseña**: Mínimo 8 caracteres, al menos una letra mayúscula, una minúscula y un número
4. **Confirmación de contraseña**: Debe coincidir con la contraseña
5. **Términos y condiciones**: Debe estar marcado para poder enviar el formulario

### Mensajes de Error
- Todos los campos tienen mensajes de error específicos
- Los errores se muestran/ocultan dinámicamente según el estado de validación
- Se muestran inmediatamente después de que el usuario interactúa con un campo

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-directorio>
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar servidor local**:
   ```bash
   # Si tienes instalado http-server:
   npx http-server -p 3000
   
   # Alternativamente, puedes usar cualquier servidor local:
   # - Python: python -m http.server 3000
   # - PHP: php -S localhost:3000
   # - Node.js: con express o similar
   ```

4. **Ejecutar pruebas de Cypress**:
   ```bash
   # Abrir la interfaz de Cypress
   npx cypress open
   
   # O ejecutar tests en modo headless
   npx cypress run
   ```

## Criterios de Evaluación

Este proyecto fue desarrollado siguiendo estos criterios:

1. **Funcionalidad (40%)**
   - Implementación correcta del formulario
   - Validaciones funcionales
   - Navegación entre páginas

2. **Pruebas (40%)**
   - Cobertura de los casos de prueba
   - Estructura y organización de las pruebas
   - Efectividad de los selectores y aserciones

3. **Diseño y Experiencia de Usuario (10%)**
   - Interfaz intuitiva y atractiva
   - Mensajes de error claros y útiles
   - Experiencia de usuario fluida

4. **Código y Documentación (10%)**
   - Organización del código
   - Comentarios explicativos
   - Documentación de la instalación y ejecución
