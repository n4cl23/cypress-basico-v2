/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('../cypress-basico-v2/src/index.html')
    });
    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    });
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.fixture('user').then((user) => {
            cy.get('#firstName').type(user.name),
                cy.get('#lastName').type(user.sobreNome),
                cy.get('#email').type(user.email),
                cy.get('#open-text-area').type(user.helpText, { delay: 0 }),
                cy.get('button[type="submit"]').click(),
                cy.get('.success > strong').should('be.visible')
        })
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.fixture('user').then((user) => {
            cy.get('#firstName').type(user.name),
                cy.get('#lastName').type(user.sobreNome),
                cy.get('#email').type('1234'),
                cy.get('#open-text-area').type(user.helpText, { delay: 0 }),
                cy.get('.button').click()
            cy.get('.error > strong').should('be.visible')
        })
    });
    it('campo de telefone continua vazio quando preenchido com valor não-numérioco', function () {
        cy.get('#phone')
            .type('abcdefg')
            .should('have.value', '')
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.fixture('user').then((user) => {
            cy.get('#firstName').type(user.name),
                cy.get('#lastName').type(user.sobreNome),
                cy.get('#email').type(user.email),
                cy.get('#phone-checkbox').click(),
                cy.get('#open-text-area').type(user.helpText, { delay: 0 }),
                cy.get('button[type="submit"]').click(),
                cy.get('.error').should('be.visible')
        })
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.fixture("user").then((user) => {
            cy.get('#open-text-area').type(user.helpText)
                .should('have.value', user.helpText)
                .clear()
                .should('have.value', '')
        })
    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click(),
            cy.get('.error > strong').should('be.visible')
    });
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
    });
    it('usar contains para selecionar e clicar em um elemento de button', function () {
        cy.contains('button', 'Enviar')
            .click()
    });
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select([1])
            .should('have.value', 'blog')
    });
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[value="elogio"]')
            .check()
            .should('be.checked', 'elogio')
    });
    it('marca cada tipo de atendimento', function () {
        cy.get('#support-type').within(() => {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(function ($radio) {
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('be.checked')
                })
        });
    });
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('#check').within(() => {
            cy.get('input[type="checkbox"]')
                .should('have.length', 2)
                .each(function ($check) {
                    cy.wrap($check).check();
                    cy.wrap($check).should('be.checked');
                });
        });

        cy.get('#check').within(() => {
            cy.get('input[type="checkbox"]')
                .last()
                .uncheck()
                .should('not.be.checked');
        });
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.fixture('user').then((user) => {
            cy.get('#firstName').type(user.name),
                cy.get('#lastName').type(user.sobreNome),
                cy.get('#email').type(user.email),
                cy.get('#phone-checkbox').check(),
                cy.get('#open-text-area').type(user.helpText, { delay: 0 }),
                cy.get('button[type="submit"]').click(),
                cy.get('.error').should('be.visible')
        })
    });
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload').selectFile('./cypress/fixtures/upload.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('upload.json');
            });
    });
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload').selectFile('./cypress/fixtures/upload.json', { action: 'drag-drop' })
            .then(input => {
                expect(input[0].files[0].name).to.equal('upload.json');
            });
    });
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('upload.json').as('uploadFile');

        cy.get('@uploadFile').then(fileContent => {
            const file = new File([fileContent], 'upload.json', { type: 'application/json' });

            cy.get('#file-upload').selectFile({
                contents: file,
                fileName: 'upload.json',
                mimeType: 'application/json',
                lastModified: new Date().getTime()
            }).then(input => {

                expect(input[0].files[0].name).to.equal('upload.json');
            });
        });
    });
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    });
    it('testa a página da política de privacidade de forma independente', function () {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()

        cy.url()
            .should('include', '/cypress-basico-v2/src/privacy.html')
    })



})


