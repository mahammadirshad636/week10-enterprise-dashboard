describe('auth flow', () => {
  it('shows login page', () => {
    cy.visit('/auth/login');
    cy.contains('Enterprise Login').should('be.visible');
  });
});
