class LeftSideMenuSliderComponent{

    elements = {
        container:              ()=>{ return cy.get('div.bm-menu-wrap')},
        allElementsButton:      ()=>{ return cy.get('a#inventory_sidebar_link') },
        aboutButton:            ()=>{ return cy.get('a[id="about_sidebar_link"]') },
        logoutButton:           ()=>{ return cy.get('a#logout_sidebar_link') },
        resetAppStateButton:    ()=>{ return cy.get('a#reset_sidebar_link') },
        xCloseButton:           ()=>{ return cy.get('button#react-burger-cross-btn') }
        
    }

    clickOutside(){
        // this method is no using a "return this" because
        // it is making a change of "page" after its execution
        return cy.get('body').click(0,0)
    }

    clickAllElements(){
        // this method is no using a "return this" because
        // it is making a change of "page" after its execution
        return this.elements.allElementsButton().click()
    }

    clickAbout(){
        // this method is no using a "return this" because
        // it is making a change of "page" after its execution
        return this.elements.aboutButton().click()
    }

    clickLogout(){
        // this method is no using a "return this" because
        // it is making a change of "page" after its execution
        return this.elements.logoutButton().click()
    }

    clickResetAppState(){
        // this method is no using a "return this" because
        // it is making a change of "page" after its execution
        this.elements.resetAppStateButton().click()
    }

    clickXClose(){
        // this method is no using a "return this" because
        // it is making a change of "page" after its execution
        return this.elements.xCloseButton().click()
    }

    verifyLeftSideMenuIsNotVisible(){
        this.elements.container().should('not.be.visible')
        return this
    }

    verifyAboutPageTitle(){
        const externalDomain            = 'saucelabs.com'
        const expectedExternalPageTitle = 'Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing'

        cy.origin(externalDomain, ()=>{
            cy.get('head title').invoke('text').should('eq', expectedExternalPageTitle)
        })
    }
}

export {LeftSideMenuSliderComponent}