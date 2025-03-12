describe('Formulario de Registro', () => {

  beforeEach(() => {

    cy.visit('http://127.0.0.1:5500/login.html')

  })



  it('debe cargar el formulario correctamente', () => {

    cy.get('form').should('be.visible')

    cy.get('input[name="nombre"]').should('exist')

    cy.get('input[name="email"]').should('exist')

    cy.get('input[name="password"]').should('exist')

    cy.get('input[name="confirmar-password"]').should('exist')

    cy.get('input[name="fecha-nacimiento"]').should('exist')

    cy.get('input[name="terminos"]').should('exist')

    cy.get('button[type="submit"]').should('exist')

  })



  it('debe mostrar errores para campos obligatorios vacíos', () => {

    cy.get('button[type="submit"]').click()

    cy.get('[id="nombre-error"]').should('be.visible')

    cy.get('[id="email-error"]').should('be.visible')

    cy.get('[id="password-error"]').should('be.visible')

    cy.get('[id="confirmar-password-error"]').should('be.visible')

    cy.get('[id="terminos-error"]').should('be.visible')

  })



  it('debe validar formato de correo electrónico', () => {

    cy.get('input[name="email"]').type('correo-invalido')

    cy.get('input[name="email"]').blur()

    cy.get('[id="email-formato-error"]').should('be.visible')
    

    cy.get('input[name="email"]').clear().type('correo@valido.com')

    cy.get('input[name="email"]').blur()

    cy.get('[id="email-formato-error"]').should('not.be.visible')

  })



  it('debe validar requisitos de contraseña', () => {

    cy.get('input[name="password"]').clear().type('abc123')

    cy.get('input[name="password"]').blur()

    cy.get('[id="password-longitud-error"]').should('be.visible')


    cy.get('input[name="password"]').clear().type('abc12345')

    cy.get('input[name="password"]').blur()

    cy.get('[id="password-formato-error"]').should('be.visible')


    cy.get('input[name="password"]').clear().type('abcdefghijk')

    cy.get('input[name="password"]').blur()

    cy.get('[id="password-formato-error"]').should('be.visible')

    cy.get('input[name="password"]').clear().type('ABC12345')

    cy.get('input[name="password"]').blur()

    cy.get('[id="password-formato-error"]').should('be.visible')
    

    cy.get('input[name="password"]').clear().type('Abc12345')

    cy.get('input[name="password"]').blur()

    cy.get('[id="password-longitud-error"]').should('not.be.visible')

  })



  it('debe verificar coincidencia de contraseñas', () => {

    cy.get('input[name="password"]').type('Abc12345')

    cy.get('input[name="confirmar-password"]').type('Abc123456')

    cy.get('input[name="confirmar-password"]').blur()

    cy.get('[id="confirmar-password-match-error"]').should('be.visible')

    

    cy.get('input[name="confirmar-password"]').clear().type('Abc12345')

    cy.get('input[name="confirmar-password"]').blur()

    cy.get('[id="confirmar-password-match-error"]').should('not.be.visible')

  })



  it('debe completar el registro exitosamente', () => {

    cy.get('input[name="nombre"]').type('Juan Pérez')

    cy.get('input[name="email"]').type('juan@example.com')

    cy.get('input[name="password"]').type('Password123')

    cy.get('input[name="confirmar-password"]').type('Password123')

    cy.get('input[name="fecha-nacimiento"]').type('1990-01-01')

    cy.get('input[name="terminos"]').check()

    

    cy.get('button[type="submit"]').click()

    

    // Verificar redirección a página de confirmación

    cy.get('[id="confirmation-page"]').should('have.css', 'display','block')

    

    // Verificar contenido de la página de confirmación

    cy.get('h2').should('contain', 'Bienvenido')

    cy.get('.user-info').should('contain', 'Juan Pérez')

    cy.get('.user-info').should('contain', 'juan@example.com')

  })

})