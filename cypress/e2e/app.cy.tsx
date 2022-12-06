describe('Navigation', () => {
  it('navigué jusqua la page evenenement', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('input[name=login]').type('admin')
    cy.get('input[name=password]').type(`admin{enter}`)
    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="evenements"]').click()

    // The new url should include "/about"
    cy.url().should('include', 'evenements')

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains('Tableaux des evenements : ')
  })
})
