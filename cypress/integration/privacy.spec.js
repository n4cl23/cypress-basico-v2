Cypress._.times(5, function () {
    it.only('testa a página da política de privacidade de forma independente', function () {
        cy.visit('src/index.html')
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()

        cy.url()
            .should('include', '/src/privacy.html')
    });

})