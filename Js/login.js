/*
 Desarrolla un formulario de registro para una aplicación web y crea pruebas automatizadas usando Cypress para validar su funcionamiento. 

Pasos:

Configurar un entorno de desarrollo con Cypress
Desarrollar un formulario web con validaciones
Implementar pruebas automatizadas para validar el funcionamiento del formulario
Validar el formulario, añadiendo errores de lógica al formulario y corrigiéndolos.
Comprender el ciclo de desarrollo guiado por pruebas


Es necesario tener instalado Node.js en local.
   mkdir proyecto-cypress-testing
   cd proyecto-cypress-testing
   npm init -y
Es necesario instala las dependencias necesarias:
   npm install cypress --save-dev
Es necesario configura Cypress añadiendo un script en tu package.json:
   "scripts": {
     "cy:open": "cypress open",
     "dev": "webpack serve --mode development"
   }
Inicializa Cypress:
   npx cypress open
Se pide crear un formulario de registro que contenga los siguientes campos:

Nombre completo (obligatorio)
Correo electrónico (obligatorio, con validación de formato)
Contraseña (obligatorio, mínimo 8 caracteres, debe incluir al menos una letra mayúscula, una minúscula y un número)
Confirmación de contraseña (debe coincidir con la contraseña)
Fecha de nacimiento (opcional)
Términos y condiciones (checkbox obligatorio)
Botón de envío
El formulario debe incluir las siguientes validaciones con Cypress:

Todos los campos marcados como obligatorios no pueden estar vacíos
El correo electrónico debe tener un formato válido (usar regex adecuada)
La contraseña debe cumplir con los requisitos mínimos de seguridad
Las contraseñas ingresadas deben coincidir
El checkbox de términos y condiciones debe estar marcado para poder enviar el formulario
Mostrar mensajes de error específicos para cada validación fallida
El botón de envío debe deshabilitarse si hay errores de validación
Después de un registro exitoso, el usuario debe ser redirigido a una página de confirmación que:

Muestre un mensaje de bienvenida personalizado con el nombre del usuario
Incluya un resumen de la información registrada (sin mostrar la contraseña)
Tenga un botón para regresar al inicio o continuar al área de usuario
Para la creación de la interfaz, puedes:

1. Programar manualmente el HTML, CSS y JavaScript

2. Utilizar una IA de generación de interfaces a partir de bocetos o capturas de pantalla (como V0, Claude, UXPilot o similares)

Debes crear los siguientes tests con Cypress:

1. Test de carga de página:

   - Verificar que el formulario se carga correctamente

   - Comprobar que todos los campos requeridos están presentes

2. Tests de validación de campos:

   - Comprobar que aparecen mensajes de error al dejar campos obligatorios vacíos

   - Verificar la validación de formato de correo electrónico

   - Probar requisitos de contraseña (longitud y complejidad)

   - Verificar coincidencia de contraseñas

3. Test de flujo completo:

   - Completar todo el formulario correctamente

   - Enviar el formulario

   - Verificar redirección a la página de confirmación

   - Comprobar que se muestra el mensaje de bienvenida y el resumen

4. Tests de casos extremos:

   - Probar valores límite para cada campo

   - Intentar inyección de scripts (básico)

   - Probar caracteres especiales en los campos

Ejemplo de Test con Cypress en la carpeta cypress/e2e/form.cy.js



describe('Formulario de Registro', () => {

  beforeEach(() => {

    cy.visit('/registro.html')

  })



  it('debe cargar el formulario correctamente', () => {

    cy.get('form').should('be.visible')

    cy.get('input[name="nombre"]').should('exist')

    cy.get('input[name="email"]').should('exist')

    cy.get('input[name="password"]').should('exist')

    cy.get('input[name="confirmPassword"]').should('exist')

    cy.get('input[name="fechaNacimiento"]').should('exist')

    cy.get('input[name="terminos"]').should('exist')

    cy.get('button[type="submit"]').should('exist')

  })



  it('debe mostrar errores para campos obligatorios vacíos', () => {

    cy.get('button[type="submit"]').click()

    cy.get('[data-error="nombre"]').should('be.visible')

    cy.get('[data-error="email"]').should('be.visible')

    cy.get('[data-error="password"]').should('be.visible')

    cy.get('[data-error="terminos"]').should('be.visible')

  })



  it('debe validar formato de correo electrónico', () => {

    cy.get('input[name="email"]').type('correo-invalido')

    cy.get('input[name="email"]').blur()

    cy.get('[data-error="email"]').should('be.visible')

    cy.get('[data-error="email"]').should('contain', 'formato válido')

    

    cy.get('input[name="email"]').clear().type('correo@valido.com')

    cy.get('input[name="email"]').blur()

    cy.get('[data-error="email"]').should('not.be.visible')

  })



  it('debe validar requisitos de contraseña', () => {

    cy.get('input[name="password"]').type('abc123')

    cy.get('input[name="password"]').blur()

    cy.get('[data-error="password"]').should('be.visible')

    

    cy.get('input[name="password"]').clear().type('Abc12345')

    cy.get('input[name="password"]').blur()

    cy.get('[data-error="password"]').should('not.be.visible')

  })



  it('debe verificar coincidencia de contraseñas', () => {

    cy.get('input[name="password"]').type('Abc12345')

    cy.get('input[name="confirmPassword"]').type('Abc123456')

    cy.get('input[name="confirmPassword"]').blur()

    cy.get('[data-error="confirmPassword"]').should('be.visible')

    

    cy.get('input[name="confirmPassword"]').clear().type('Abc12345')

    cy.get('input[name="confirmPassword"]').blur()

    cy.get('[data-error="confirmPassword"]').should('not.be.visible')

  })



  it('debe completar el registro exitosamente', () => {

    cy.get('input[name="nombre"]').type('Juan Pérez')

    cy.get('input[name="email"]').type('juan@example.com')

    cy.get('input[name="password"]').type('Password123')

    cy.get('input[name="confirmPassword"]').type('Password123')

    cy.get('input[name="fechaNacimiento"]').type('1990-01-01')

    cy.get('input[name="terminos"]').check()

    

    cy.get('button[type="submit"]').click()

    

    // Verificar redirección a página de confirmación

    cy.url().should('include', '/confirmacion.html')

    

    // Verificar contenido de la página de confirmación

    cy.get('h1').should('contain', 'Bienvenido')

    cy.get('.user-info').should('contain', 'Juan Pérez')

    cy.get('.user-info').should('contain', 'juan@example.com')

  })

})
 */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registro-form');
  const submitBtn = document.getElementById('submit-btn');
  
  // Elementos de formulario
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmarPasswordInput = document.getElementById('confirmar-password');
  const fechaNacimientoInput = document.getElementById('fecha-nacimiento');
  const terminosCheckbox = document.getElementById('terminos');
  const promocionesCheckbox = document.getElementById('promociones');
  
  // Validación en tiempo real
  form.addEventListener('input', validarFormulario);
  
  // Envío del formulario
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validarFormulario()) {

          // Mostrar página de confirmación
          document.getElementById('registro-form').style.display = 'none';
          document.getElementById('confirmation-page').style.display = 'block';
          
          // Mostrar datos de resumen
          document.getElementById('user-name').textContent = nombreInput.value;
          document.getElementById('summary-nombre').textContent = nombreInput.value;
          document.getElementById('summary-email').textContent = emailInput.value;
          
          // Formatear fecha de nacimiento (si existe) 
          if (fechaNacimientoInput.value) {
              const fecha = new Date(fechaNacimientoInput.value);
              document.getElementById('summary-fecha').textContent = fecha.toLocaleDateString();
          } else {
              document.getElementById('summary-fecha').textContent = 'No proporcionada';
          }
          
          // Mostrar si está suscrito a promociones
          document.getElementById('summary-promociones').textContent = 
              promocionesCheckbox.checked ? 'Sí' : 'No';
      }
  });
  
  // Función de validación
  function validarFormulario() {
      let esValido = true;
      
      // Validar nombre (obligatorio y sin caracteres especiales)
      resetearErrores('nombre');
      if (!nombreInput.value.trim()) {
          mostrarError('nombre-error');
          esValido = false;
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreInput.value)) {
          mostrarError('nombre-caracteres-error');
          esValido = false;
      }
      
      // Validar email (obligatorio y formato correcto)
      resetearErrores('email');
      if (!emailInput.value.trim()) {
          mostrarError('email-error');
          esValido = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
          mostrarError('email-formato-error');
          esValido = false;
      }
      
      // Validar contraseña
      resetearErrores('password');
      if (!passwordInput.value) {
          mostrarError('password-error');
          esValido = false;
      } else {
          if (passwordInput.value.length < 8) {
              mostrarError('password-longitud-error');
              esValido = false;
          }
          
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(passwordInput.value)) {
              mostrarError('password-formato-error');
              esValido = false;
          }
      }
      
      // Validar confirmación de contraseña
      resetearErrores('confirmar-password');
      if (!confirmarPasswordInput.value) {
          mostrarError('confirmar-password-error');
          esValido = false;
      } else if (confirmarPasswordInput.value !== passwordInput.value) {
          mostrarError('confirmar-password-match-error');
          esValido = false;
      }
      
      // Validar términos y condiciones
      resetearErrores('terminos');
      if (!terminosCheckbox.checked) {
          mostrarError('terminos-error');
          esValido = false;
      }
      
      // Activar/desactivar botón de envío
      submitBtn.disabled = !esValido;
      
      return esValido;
  }
  
  // Funciones auxiliares
  function mostrarError(id) {
      document.getElementById(id).style.display = 'block';
  }
  
  function resetearErrores(campo) {
      const errores = document.querySelectorAll(`[id^="${campo}-"]`);
      errores.forEach(error => error.style.display = 'none');
  }
});

// Función para mostrar/ocultar contraseña
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === 'password' ? 'text' : 'password';
}

// Funciones para la página de confirmación
function volverInicio() {
  alert('Redirigiendo al inicio...');
  // Aquí iría la redirección real: window.location.href = 'index.html';
  reiniciarFormulario();
}

function irAreaUsuario() {
  alert('Redirigiendo al área de usuario...');
  // Aquí iría la redirección real: window.location.href = 'area-usuario.html';
}

function reiniciarFormulario() {
  document.getElementById('registro-form').reset();
  document.getElementById('registro-form').style.display = 'block';
  document.getElementById('confirmation-page').style.display = 'none';
  document.getElementById('submit-btn').disabled = true;
}