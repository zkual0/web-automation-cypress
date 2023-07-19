class Product{

    constructor(itemContainerSelector){
        this.itemContainerSelector = itemContainerSelector
    }

    /**
     * web elements
     */
    elements = {
        productContainer:   (productName)=>{ return cy.contains(this.itemContainerSelector, productName)},
        addToCartButton:    (productName)=>{ return this.elements.productContainer(productName).find('button') } //cy.get('li:contains("blablabla")').should('have.length', 3)
    }

    /**
     * clicks Add button of a given product
     * @param {string} productName 
     * @returns <chainable object of this class>
     */
    clickAddToCart(productName){
        this.elements.addToCartButton(productName).click()
        return this
    }

    /**
     * clicks Remove button of a given product
     * @param {string} productName 
     * @returns <chainable object of this class>
     */
    clickRemove(productName){
        this.elements.addToCartButton(productName).click()
        return this
    }

    /**
     * asserts a given product has the expected text
     * @param {string} productName 
     * @param {string} expectedText 
     * @returns <chainable object of this class>
     */
    verifyAddToCartButtonText(productName, expectedText){
        this.elements.addToCartButton(productName).invoke('text').should('eq', expectedText)
        return this
    }

    /**
     * gets the price of a given product
     * @param {string} productName 
     * @returns string
     */
    getProductPrice(productName){
        return this.elements.productContainer(productName).find('div.inventory_item_price').invoke('text')
    }
    
    /**
     * gets a list of current set of listed products.
     * This method allows to choose specific column names by passing their names 
     * as parameters within a Dictionary. ie {name:true, price: true}
     * @param {Dictionary} columns supported column names: name, description and price
     * @returns Array of selected columns
     */
    getListedProducts(columns={}){
        return cy.wrap(new Cypress.Promise(resolve=>{
            let _items = []
            cy.get(this.itemContainerSelector).each(($div)=>{
                let _item = []
                cy.wrap($div).within(()=>{
                    cy.get('div.inventory_item_name').invoke('text').then($text=>{_item.push($text)})
                    cy.get('div.inventory_item_desc').invoke('text').then($text=>{_item.push($text)})
                    cy.get('div.inventory_item_price').invoke('text').then($text=>{_item.push($text)})
                }).then(()=>{
                    _items.push(_item)                    
                })
            }).then(()=>{
                //debugger
                let cols = []
                if(columns.name===true){                cols.push(1)}       // enable to get column for Name
                if(columns.description===true){         cols.push(2)}       // enable to get column for Description
                if(columns.price===true){               cols.push(3)}       // enable to get column for Price
                if(Object.keys(columns).length === 0){   cols = [1,2,3] }    // if no columns are passed, get all of them
                _items = _items.map(r => cols.map(i => r[i-1]));
                
                if(Object.keys(columns).length === 1){  // extra step to group all the items when inner arrays length is 1 only.
                    _items = _items.map(i => i[0])      // converts [Array(1),Array(1),Array(1)] into ['value1','value2', value3]
                }                                                                   
                resolve(_items)
            })
        }))
    }
}

export {Product}