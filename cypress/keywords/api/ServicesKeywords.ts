/// <reference types='cypress' />
import {Given, When, Then, Before} from 'cypress-cucumber-preprocessor/steps';

let headers:    any;
let body:     any;
let response:   any;

Before(() => {
    cy.fixture("ServiceRequestHeaders").then((data) => {
        headers = data
    })
    cy.fixture("ServiceRequestBody").then((data) => {
        body = data
    })
});

// Ref: https://docs.cypress.io/api/commands/intercept#Controlling-the-outbound-request-with-req-continue
Given('all API end-point mocked', () =>{
    cy.intercept('POST', Cypress.env('createServiceURL'), (req) => {
        req.reply({
            statusCode: 401,
            fixture: 'mock/TC_TRG_00016.json'
        })
    })
});

When('request to create TRG Service with {string} payload',
    (testCaseCode) => {
        response = cy.request({
            method: 'POST', url:Cypress.env('createServiceURL'),
            headers: headers["TC_TRG_Default"],
            body: body[testCaseCode]
        })
});

Then('response failed with status code {string} and response code {string}',
    (statusCode, responseCode) => {
    cy.wait('@createService')
    response.status.should('equal', statusCode);
    response.body['response_code'].should('equal', responseCode)
});
