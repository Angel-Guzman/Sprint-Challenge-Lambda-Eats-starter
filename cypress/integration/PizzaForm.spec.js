import { v4 as uuid } from 'uuid'

const randomUser = uuid().slice(0, 4)
const randomUser1 = uuid().slice(0, 8)


describe('Pizza Form', () => {
    it('navigate to site', () => {
        cy.visit('')
        cy.url().should('include', 'localhost')
    })

    it('add text to inputs', () => {
        cy.get('[data-cy_fullname_input="cy_fullname_input"]')
        .type(randomUser)
        .should('have.value', randomUser)

        cy.get('[data-cy_special_input="cy_special_input"]')
        .type(randomUser1)
        .should('have.value', randomUser1)
    })

    it('check if user can select pizza size', () => {
        cy.get('[data-cy_size_dropdown="cy_size_dropdown"]')
        .select('small')
        .should('have.value', 'small')
    })

    it('check if user can check toppings boxes', () => {
        cy.get('[data-cy_pepperoni_checkbox="cy_pepperoni_checkbox"]')
        .check()
        .should('have.checked')
        cy.get('[data-cy_sausage_checkbox="cy_sausage_checkbox"]')
        .check()
        .should('have.checked')
        cy.get('[data-cy_chicken_checkbox="cy_chicken_checkbox"]')
        .check()
        .should('have.checked')
        cy.get('[data-cy_peppers_checkbox="cy_peppers_checkbox"]')
        .check()
        .should('have.checked')
    })

    it('check if user can submit form', () => {
        cy.get('[data-cy_submit="submit"]')
        .click()
    })
})