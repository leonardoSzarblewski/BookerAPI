/// <reference types="cypress"/>

describe('Update booking', () => {
    let token = ''
    let bookingId = ''

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

    beforeEach('Create booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                "firstname": "Matheus",
                "lastname": "Laurindo",
                "totalprice": 500,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-08-01",
                    "checkout": "2025-09-01"
                },
                "additionalneeds": "Breakfast"
            },
        }).then((responsePost) => {
            expect(responsePost.status).equal(200)
            expect(responsePost.body.booking.firstname).equal('Matheus')
            expect(responsePost.body.booking.lastname).equal('Laurindo')
            expect(responsePost.body.bookingid).to.be.a('number')
            bookingId = responsePost.body.bookingid
            
        })
    });

    it('Update booking', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
            body: {
                "firstname": "Leonardo",
                "lastname": "Szarblewski",
                "totalprice": 400,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-08-05",
                    "checkout": "2025-09-05"
                },
                "additionalneeds": "Breakfast"
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`,
            }

        }).then((responsePut) => {
            expect(responsePut.status).equal(200)
            expect(responsePut.body.firstname).equal('Leonardo')
            expect(responsePut.body.lastname).equal('Szarblewski')

        })
    });

    it('Update bookin without token', () => {
        cy.request({
            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/439',
            body: {
                "firstname": "Leonardo",
                "lastname": "Szarblewski",
                "totalprice": 400,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-08-05",
                    "checkout": "2025-09-05"
                },
                "additionalneeds": "Breakfast"
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            failOnStatusCode: false,

        }).then((responsePut) => {
            expect(responsePut.status).equal(403)
        })
    });

    

})

