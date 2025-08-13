/// <reference types="cypress"/>

describe('Update booking', () => {
    let token = ''

    before('Login', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        }).then((response) => {
            expect(response.status).equal(200)
            token = response.body.token

        })
    });

    

})

