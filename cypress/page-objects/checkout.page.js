import {Product} from '../page-objects/components/product.component'

class CheckoutPage{

    constructor(){
    }

    /**
     * web elements
     */
    elements = {
        header:         ()=>{ return cy.get('div.header_secondary_container span.title')},
        firstNameBox:   ()=>{ return cy.get('input[data-test="firstName"]')},
        lastNameBox:    ()=>{ return cy.get('input[data-test="lastName"]')},
        zipCodeBox:     ()=>{ return cy.get('input[data-test="postalCode"]')},
        cancelButton:   ()=>{ return cy.get('button[data-test="cancel"]')},
        continueButton: ()=>{ return cy.get('input[data-test="continue"]')}
    }

    /**
     * gets the page title
     * @returns string
     */
    get title(){
        return this.elements.header().invoke('text')
    }

    /**
     * enters a value into the First Name box
     * @param {string} value 
     * @returns <chainable object of this class>
     */
    fillFirstName(value){
        this.elements.firstNameBox().clear().type(value)
        return this
    }

    /**
     * enters a value into the Last Name box
     * @param {string} value 
     * @returns <chainable object of this class>
     */    
    fillLastName(value){
        this.elements.lastNameBox().clear().type(value)
        return this
    }

    /**
     * enters a value into the Zip Code box
     * @param {string} value 
     * @returns <chainable object of this class>
     */
    fillZipCode(value){
        this.elements.zipCodeBox().clear().type(value)
        return this
    }

    /**
     * clicks on Cancel button
     * @returns <chainable object of this class>
     */
    clickCancel(){
        this.elements.cancelButton().click()
        return this
    }

    /**
     * clicks on Continue button
     * @returns <chainable object of this class>
     */
    clickContinue(){
        this.elements.continueButton().click()
        return this
    }

    /**
     * fills the Checkout form with
     * @param {Dictionary} formInformation hash containing the expected values
     * @returns <chainable object of this class>
     */
    fillCheckoutForm(formInformation = {}){
        this
            .fillFirstName(formInformation.firstName)
            .fillLastName(formInformation.lastName)
            .fillZipCode(formInformation.zipCode)
        return this
    }
}

class CheckoutOverviewPage{
    
    constructor(){
        this._product = new Product('div.cart_item')
    }

    /**
     * web elements
     */
    elements = {
        header:         ()=>{ return cy.get('div.header_secondary_container span.title')},
        paymentInformationLabel:    ()=>{ return cy.contains('div.summary_info_label', 'Payment Information').next('div') },
        shippingInformationLabel:   ()=>{ return cy.contains('div.summary_info_label', 'Shipping Information').next('div') },
        subTotalLabel:              ()=>{ return cy.get('div.summary_subtotal_label') },
        taxLabel:                   ()=>{ return cy.get('div.summary_tax_label') },
        totalLabel:                 ()=>{ return cy.get('div.summary_total_label') },
        cancelButton:               ()=>{ return cy.get('button[data-test="cancel"]')},
        finishButton:               ()=>{ return cy.get('button[data-test="finish"]')}
    }

    /**
     * gets the title of the page
     * @returns string
     */
    get title(){
        return this.elements.header().invoke('text')
    }

    /**
     * clicks on Cancel button
     * @returns <chainable object of this class>
     */
    clickCancel(){
        this.elements.cancelButton().click()
        return this
    }

    /**
     * clicks on Finish button
     * @returns <chainable object of this class>
     */
    clickFinish(){
        this.elements.finishButton().click()
        return this
    }

    /**
     * gets a list of listed products
     * @returns {Array} array of strings
     */
    getListedProducts(){
        return this._product.getListedProducts()
    }

    /**
     * asserts the listed products match with the given values
     * @param {Array} expectedProducts array representing the expected listed products
     * @returns <chainable object of this class>
     */    
    verifyListedProducts(expectedProducts){
        this._product.getListedProducts().should('deep.equal', expectedProducts)
        return this
    }

    /**
     * asserts the Summary match with the given values
     * @param {Dictionary} expectedSummaryDetails hash representing the expected listed details
     * @returns 
     */    
    verifySummary(expectedSummaryDetails={}){
        this.elements.paymentInformationLabel().invoke('text').should('eq', expectedSummaryDetails.paymentInformation)
        this.elements.shippingInformationLabel().invoke('text').should('eq', expectedSummaryDetails.shippingInformation)
        this.elements.subTotalLabel().invoke('text').should('eq', expectedSummaryDetails.subTotal)
        this.elements.taxLabel().invoke('text').should('eq', expectedSummaryDetails.tax)
        this.elements.totalLabel().invoke('text').should('eq', expectedSummaryDetails.total)
        return this
    }
}

class CheckoutCompletePage{
    /**
     * web elements
     */
    elements = {
        header:             ()=>{ return cy.get('div.header_secondary_container span.title')},
        completeHeader:     ()=>{ return cy.get('h2.complete-header')},
        completeSubHeader:  ()=>{ return cy.get('div.complete-text')},
        backHomeButton:     ()=>{ return cy.get('button[data-test="back-to-products"]')}
    }

    /**
     * gets the title of the page
     * @returns string
     */
    get title(){
        return this.elements.header().invoke('text')    
    }
    
    /**
     * clicks on Back Home button
     * @returns <chainable object of this class>
     */
    clickBackHome(){
        this.elements.backHomeButton().click()
        return this
    }

    /**
     * verifies the title and subtitle match with the given values
     * @param {Dictionary} expectedCompleteNotificationMessage Hash representing the expected title and subtitle values
     * @returns <chainable object of this class>
     */
    verifyCompleteNotificationMessage(expectedCompleteNotificationMessage){
        this.elements.completeHeader().invoke('text').should('eq', expectedCompleteNotificationMessage.title)
        this.elements.completeSubHeader().invoke('text').should('eq', expectedCompleteNotificationMessage.subtitle)
        return this
    }
}

export {CheckoutPage, CheckoutOverviewPage, CheckoutCompletePage}