import { TopNavigationBarComponent } from "./components/top-navigation-bar.component"
import { Product }          from './components/product.component'

class DashboardPage{
    
    constructor(){
        this.topNavigationBar   = new TopNavigationBarComponent()
        this._product           = new Product('div.inventory_item')
    }

    /**
     * web elements
     */
    elements = {
        header:                 ()=>{ return cy.get('div.header_secondary_container span.title')},
        productsOrderDropdown:  ()=>{ return cy.get('select[data-test="product_sort_container"]')}
    }

    /**
     * gets the title of the page
     */
    get title(){
        return this.elements.header().invoke('text')
    }

    /**
     * clicks Add To Cart button of a given product
     * @param {string} productName 
     * @returns <chainable object of this class>
     */
    clickAddToCart(productName){
        this._product.clickAddToCart(productName)
        return this
    }

    /**
     * clicks Remove button of a given product
     * @param {string} productName 
     * @returns <chainable object of this class>
     */
    clickRemove(productName){
        this._product.clickRemove(productName)
        return this
    }

    /**
     * gets the price of a given product
     * @param {string} productName 
     * @returns string
     */
    getProductPrice(productName){
        return this._product.getProductPrice(productName)
    }

    sortProductsAZ(){
        this._sortProducts('az')
        return this
    }
    sortProductsZA(){
        this._sortProducts('za')
        return this
    }
    sortProductsHighToLow(){
        this._sortProducts('high2low')
        return this
    }
    sortProductsLowToHigh(){
        this._sortProducts('low2high')
        return this
    }

    /**
     * asserts the title matches with the given one
     * @param {string} expectedTitle 
     */
    verifyTitle(expectedTitle){
        this.title.should('eq', expectedTitle)
    }

    /**
     * gets a list of the listed products
     * @returns Array
     */
    getListedProducts(opts={}){
        return this._product.getListedProducts(opts)
    }
    
    /**
     * asserts the current set of listed products match with the array of given ones
     * @param {Dictionary} expectedListedProducts 
     */
    verifyListedProducts(expectedListedProducts, opts={}){
        // --------------------------------
        // Note: Advanced example to show how to go deeper when creating a matcher
        // --------------------------------
        //dashboardPage
        //    .getListedProducts().should($items=>{
        //        expect($items.length, 'length').to.eq(expectedListedProducts.length)
        //        $items.forEach((item, idx) => {
        //            expect(item, `item ${idx + 1} of ${$items.length}`).to.deep.eq(expectedListedProducts[idx])
        //        })
        //    })
        this.getListedProducts(opts).should('deep.equal', expectedListedProducts)
    }

    _sortProducts(order){
        //let order = undefined
        switch (order) {
            case 'az':
                order = 'az'
                break;
            case 'za':
                order = 'za'
                break;
            case 'high2low':
                order = 'hilo'
                break;
            case 'low2high':
                order = 'lohi'
                break;
        }
        this.elements.productsOrderDropdown().select(order)
        return this
    }
}

export {DashboardPage}
