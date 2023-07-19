import {Product} from './components/product.component'

class YourCartPage{
    
    constructor(){
        this._product = new Product('div.cart_item')
    }

    elements = {
        continueShoppingButton: ()=>{ return cy.get('button[data-test="continue-shopping"]')},
        checkoutButton:         ()=>{ return cy.get('button[data-test="checkout"]')}
    }

    /**
     * clicks on Remove button of a given product name
     * @param {string} productName product name
     * @returns <chainable object of this class instance>
     */
    clickRemove(productName){
        this._product.clickRemove(productName)
        return this
    }

    /**
     * clicks on Continue Shopping
     * @returns <chainable object of this class instance>
     */
    clickContinueShopping(){
        this.elements.continueShoppingButton().click()
        return this
    }

    /**
     * clicks on Checkout button
     * @returns <chainable object of this class instance>
     */
    clickCheckout(){
        this.elements.checkoutButton().click()
        return this
    }

    /**
     * gets the price of a given product
     * @param {string} productName product name
     * @returns {string} product price
     */
    getProductPrice(productName){
        return this._product.getProductPrice(productName)
    }

    /**
     * gets a list of all the listed products
     * @returns collection of arrays that includes Name, Description and Price
     */
    getListedProducts(){
        return this._product.getListedProducts()
    }

    /**
     * asserts if the listed products match the given ones
     * @param {string} expectedListedProducts collection of arrays having this format [["name", "description", "price"], [collection2]...]
     * @returns <chainable object of this class instance>
     */
    verifyListedProducts(expectedListedProducts){
        this._product.getListedProducts().should('deep.equal', expectedListedProducts)
        return this
    }
}

export { YourCartPage }