import { DashboardPage }    from "../page-objects/dashboard.page"
import { LoginPage }        from "../page-objects/login.page"
import { TopNavigationBarComponent } from "../page-objects/components/top-navigation-bar.component"
import { YourCartPage }     from "../page-objects/your-cart.page"
import { LeftSideMenuSliderComponent } from "../page-objects/components/left-side-menu.component"

const loginPage          = new LoginPage()
const dashboardPage      = new DashboardPage()
const topNavigationBar   = new TopNavigationBarComponent()
const yourCart           = new YourCartPage()
const leftSideMenuSlider = new LeftSideMenuSliderComponent

describe('on Dashboard page', ()=>{

    const productName1 = 'Sauce Labs Bike Light'
    const productName2 = 'Sauce Labs Fleece Jacket'

    beforeEach('', ()=>{
        const username = 'standard_user'
        const password = 'secret_sauce'
        cy.visit('/')
        
        loginPage
            .loginToApp(username, password)
    })

    it('user sees a set of listed products', ()=>{
        const expectedTitle = 'Swag Labs'
        const expectedListedProducts = [
            ["Sauce Labs Backpack", "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.", '$29.99'],
            ['Sauce Labs Bike Light', "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", '$9.99'],
            ['Sauce Labs Bolt T-Shirt', 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', '$15.99'],
            ["Sauce Labs Fleece Jacket", "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", '$49.99'],
            ['Sauce Labs Onesie', "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", '$7.99'],
            ['Test.allTheThings() T-Shirt (Red)', 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.', '$15.99']
        ]

        // make the spec stuff
        dashboardPage.topNavigationBar
            .verifyTitle(expectedTitle)
        dashboardPage
            .verifyListedProducts(expectedListedProducts)
    })

    it('user is able to add a product to the cart', ()=>{
        dashboardPage
            .clickAddToCart(productName1)
            .clickAddToCart(productName2)
        topNavigationBar
            .verifyCartIconCount('2')
    })

    it('user is able to remove a product from the cart (directly from the dashboard)', ()=>{
        dashboardPage
            .clickAddToCart(productName1)
            .clickAddToCart(productName2)
        topNavigationBar
            .verifyCartIconCount('2')
        
        // make the spec stuff
        dashboardPage
            .clickRemove(productName2)
        topNavigationBar
            .verifyCartIconCount('1')
    })

    describe('when sorting products', ()=>{

        it('user is able to sort in Ascending order (Z to A)', ()=>{
            const expectedListedProducts = [
                'Test.allTheThings() T-Shirt (Red)',
                'Sauce Labs Onesie',
                'Sauce Labs Fleece Jacket',
                'Sauce Labs Bolt T-Shirt',
                'Sauce Labs Bike Light',
                'Sauce Labs Backpack'
            ]

            dashboardPage
                .sortProductsZA()
                .verifyListedProducts(expectedListedProducts, {name:true})
        })

        it('user is able to sort in Descending order (A to Z)',()=>{
            const expectedListedProducts = [
                'Sauce Labs Backpack',
                'Sauce Labs Bike Light',
                'Sauce Labs Bolt T-Shirt',
                'Sauce Labs Fleece Jacket',
                'Sauce Labs Onesie',
                'Test.allTheThings() T-Shirt (Red)',
            ]

            dashboardPage
                .sortProductsZA()
                .sortProductsAZ()
                .verifyListedProducts(expectedListedProducts, {name:true})
        })

        it('user is able to sort by Low to High price', ()=>{
            const expectedListedProducts = [
                ['Sauce Labs Onesie', '$7.99'],
                ['Sauce Labs Bike Light', '$9.99'],
                ['Sauce Labs Bolt T-Shirt', '$15.99'],
                ['Test.allTheThings() T-Shirt (Red)', '$15.99'],
                ['Sauce Labs Backpack', '$29.99'],
                ['Sauce Labs Fleece Jacket', '$49.99'],
            ]

            dashboardPage
                .sortProductsLowToHigh()
                .verifyListedProducts(expectedListedProducts, {name:true, price:true})
        })

        it('user is able to sort by High to Low price', ()=>{
            const expectedListedProducts = [
                ['Sauce Labs Fleece Jacket', '$49.99'],
                ['Sauce Labs Backpack', '$29.99'],
                ['Sauce Labs Bolt T-Shirt', '$15.99'],
                ['Test.allTheThings() T-Shirt (Red)', '$15.99'],
                ['Sauce Labs Bike Light', '$9.99'],
                ['Sauce Labs Onesie', '$7.99'],
            ]

            dashboardPage
                .sortProductsHighToLow()
                .verifyListedProducts(expectedListedProducts, {name:true, price:true})
        })
    })

    describe('when working with the cart component', ()=>{
        it('user is able to see listed its recently added products', ()=>{
            const expectedListedProducts = [
                ['Sauce Labs Bike Light', "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", '$9.99'],
                ["Sauce Labs Fleece Jacket", "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", '$49.99']
            ]

            dashboardPage
                .clickAddToCart(productName1)
                .clickAddToCart(productName2)
            topNavigationBar
                .clickCart()
            
            // making the spec stuff
            yourCart
                .verifyListedProducts(expectedListedProducts)
        })

        it('user is able to remove a product from the cart', ()=>{
            const expectedListedProducts = [["Sauce Labs Fleece Jacket", "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", '$49.99']]
            
            dashboardPage
                .clickAddToCart(productName1)
                .clickAddToCart(productName2)
            topNavigationBar
                .clickCart()
            
            // make the spec stuff
            yourCart
                .clickRemove(productName1)
                .verifyListedProducts(expectedListedProducts)
        })
    })

    describe('when working with the left side menu component', ()=>{

        it('user is able to close the menu by clicking X close button',()=>{
            topNavigationBar
                .clickBurger()
            
            // make the spec stuff
            leftSideMenuSlider
                .clickXClose()
            leftSideMenuSlider
                .verifyLeftSideMenuIsNotVisible()
        })

        // skipped: originally, emergent menus or modals must get closed after clicking out from them
        //          in this case this component is not honoring that behavior
        it.skip('[BUG: ISSUE-0001] user is able to close the menu by clicking out from the menu', ()=>{
            topNavigationBar
                .clickBurger()
            
            // make the spec stuff
            leftSideMenuSlider
                .clickOutside()
            leftSideMenuSlider
                .verifyLeftSideMenuIsNotVisible()
        })

        it('user can get back to the landing dashboard page ("Products" page)', ()=>{
            const expectedYourCartPageTitle = 'Your Cart'
            const expectedProductsPageTitle = 'Products'
            
            topNavigationBar
                .clickCart()
            
            // make the spec stuff
            topNavigationBar
                .verifySubTitle(expectedYourCartPageTitle)
                .clickBurger()
            leftSideMenuSlider
                .clickAllElements()
            topNavigationBar
                .verifySubTitle(expectedProductsPageTitle)
        })

        // skipped: skipped due a lot of nested domain redirects. usually by using cy.origin command is enough
        //          but in this case the redirect has a lot of them so it makes it unstable
        it.skip('[BUG: ISSUE-0002]user is able to see about page', ()=>{
            topNavigationBar
                .clickBurger()
            leftSideMenuSlider
                .clickAbout()
            
            // make the spec stuff
            leftSideMenuSlider
                .verifyAboutPageTitle()
        })

        it('user is able to logout', ()=>{
            topNavigationBar
                .clickBurger()
            
            // make the spec stuff
            leftSideMenuSlider
                .clickLogout()
            topNavigationBar
                .elements.topTitleLabel().should('not.exist')
            loginPage
                .elements.loginButton().should('exist')
        })

        it('user is able to reset the app state', ()=>{
            dashboardPage
                .clickAddToCart(productName1)
                .clickAddToCart(productName2)
            topNavigationBar
                .verifyCartIconCount('2')
            
            // make the spec stuff
            topNavigationBar
                .clickBurger()
            leftSideMenuSlider
                .clickResetAppState()
            topNavigationBar
                .verifyCartIconCountIsEmpty()
        })

    })

    
})
