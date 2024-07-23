Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.fixture('user').then((user) => {
        cy.get('#firstName').type(user.name),
            cy.get('#lastName').type(user.sobreNome),
            cy.get('#email').type(user.email),
            cy.get('#open-text-area').type(user.helpText, { delay: 0 }),
            cy.get('button[type="submit"]').click(),
            cy.get('.success > strong').should('be.visible')
    })
})