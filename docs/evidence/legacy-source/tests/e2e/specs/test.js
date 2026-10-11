// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('.note', '注意事項')
  })

  it('Check Number Control', () => {
    cy.visit('/order/check')
    cy.get('.orderul .amount1')
      .should(($input) => {
        const val = $input.val();
        cy.get('.btn-plus1').click();
        expect(val).to.eq(val + 1000)
      })
  })
})
