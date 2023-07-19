class LoginPage{
    elements = {
        pageTitle:   ()=>{return cy.get('div.login_logo')},
        usernameBox: ()=>{return cy.get('input[data-test="username"]')},
        passwordBox: ()=>{return cy.get('input[data-test="password"]')},
        loginButton: ()=>{return cy.get('input[data-test="login-button"]')},
        errorMessageLabel: ()=>{return cy.get('h3[data-test="error"]')}
    }

    /**
     * returns the text at the top of the page
     * @returns string
     */
    get title(){
        return this.elements.pageTitle().invoke('text')
    }

    /**
     * enters a string in the Username box
     * @param {string} value 
     * @returns <chainable object of this class>
     */
    fillUsername(value){
        this.elements.usernameBox().clear()
        if(value!==null){
            this.elements.usernameBox().clear().type(value,{log: true})
        }
        return this
    }

    /**
     * enters a string in the Password box
     * @param {string} value 
     * @returns <chainable object of this class>
     */
    fillPassword(value){
        this.elements.passwordBox().clear()
        if(value!==null){
            this.elements.passwordBox().clear().type(value,{log: true})
        }
        return this
    }

    /**
     * clicks login button
     * @returns <chainable object of this class>
     */
    clickLogin(){
        this.elements.loginButton().click()
        return this
    }

    /**
     * makes the login into the application
     * @param {string} username
     * @param {string} password 
     * @returns <chainable object of this class>
     */
    loginToApp(username, password){
        this
            .fillUsername(username)
            .fillPassword(password)
            .clickLogin()
        return this
    }

    /**
     * asserts page title matches with the given one
     * @param {string} expectedPageTitle 
     * @returns <chainable object of this class>
     */
    verifyPageTitle(expectedPageTitle){
        this.title.should('eq', expectedPageTitle)
        expect(this.title, 'expected title').to.be.eq(expectedPageTitle)
        return this
    }

    /**
     * asserts the error message matches with the given one
     * @param {string} expectedErrorMessage 
     * @returns <chainable object of this class>
     */
    verifyErrorMessage(expectedErrorMessage){
        this.elements.errorMessageLabel().invoke('text').should('eq', expectedErrorMessage)
        return this
    }
}

export {LoginPage}