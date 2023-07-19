class TopNavigationBarComponent{
    
    constructor(){
        this.containerSelector = '#header_container' 
    }

    /**
     * web elements
     */
    elements = {
        topTitleLabel:  ()=>{return cy.get(`${this.containerSelector} div.primary_header div.header_label div.app_logo`)},
        subTitleLabel:  ()=>{return cy.get(`${this.containerSelector} div.header_secondary_container span.title`)},
        burgerButton:   ()=>{return cy.get(`${this.containerSelector} button#react-burger-menu-btn`)},
        cartButton:     ()=>{return cy.get(`${this.containerSelector} div.shopping_cart_container`)}
    }

    /**
     * gets the cart count showed in the cart icon
     * @returns <chainable object of this class>
     */
    cartIconCount(){
        return this.elements.cartButton().invoke('text')
    }

    /**
     * clicks the Burger icon
     * @returns 
     */
    clickBurger(){
        this.elements.burgerButton().click()
        return this
    }

    /**
     * clicks the Cart icon
     * @returns  <chainable object of this class>
     */
    clickCart(){
        this.elements.cartButton().click()
        return this
    }

    /**
     * asserts the title matches with the given text
     * @param {string} expectedTitle 
     * @returns  <chainable object of this class>
     */
    verifyTitle(expectedText){
        this.elements.topTitleLabel().should('be.visible').invoke('text').should('eq', expectedText)
        return this
    }

    verifySubTitle(expectedText){
        this.elements.subTitleLabel().should('be.visible').invoke('text').should('eq', expectedText)
        return this
    }

    /**
     * asserts the Cart icon count matches with the given value
     * @param {string} expectedCount 
     * @returns 
     */
    verifyCartIconCount(expectedCount){
        this.cartIconCount().should('eq', expectedCount)
        return this
    }

    verifyCartIconCountIsEmpty(){
        this.cartIconCount().should('eq', '')
        return this
    }
}

export {TopNavigationBarComponent}