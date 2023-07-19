import { DashboardPage }    from "../page-objects/dashboard.page"
import { LoginPage }        from "../page-objects/login.page"
import { TopNavigationBarComponent } from "../page-objects/components/top-navigation-bar.component"
import { YourCartPage }     from "../page-objects/your-cart.page"
import { CheckoutCompletePage, CheckoutOverviewPage, CheckoutPage } from "../page-objects/checkout.page"

const loginPage             = new LoginPage()
const dashboardPage         = new DashboardPage()
const topNavigationBar      = new TopNavigationBarComponent()
const yourCart              = new YourCartPage()
const checkoutPage          = new CheckoutPage()
const checkoutOverviewPage  = new CheckoutOverviewPage()
const checkoutCompletePage  = new CheckoutCompletePage()

describe('on Swag Labs',()=>{

    const productName1 = 'Sauce Labs Bike Light'
    const productName2 = 'Sauce Labs Fleece Jacket'

    beforeEach('', ()=>{
        const username = 'standard_user'
        const password = 'secret_sauce'
        cy.visit('/')
        
        loginPage
            .loginToApp(username, password)
    })

    it('user is able to complete the shopping flow', { tags: '@e2e' },()=>{
        const userDetails = {
            firstName:'qa', 
            lastName:'automation', 
            zipCode:'88888'
        }
        const expectedListedProducts = [
            ['Sauce Labs Bike Light', "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", '$9.99'],
            ["Sauce Labs Fleece Jacket", "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", '$49.99']
        ]
        const expectedSummaryDetails = {
            paymentInformation: 'SauceCard #31337',
            shippingInformation: 'Free Pony Express Delivery!',
            subTotal: 'Item total: $59.980000000000004',
            tax: 'Tax: $4.80',
            total: 'Total: $64.78'
        }
        const expectedCompletedNotificationMessage = {
            title: 'Thank you for your order!',
            subtitle: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        }

        dashboardPage
            .clickAddToCart(productName1)
            .clickAddToCart(productName2)
        topNavigationBar
            .clickCart()
        yourCart
            .verifyListedProducts(expectedListedProducts)
            .clickCheckout()
        checkoutPage
            .fillCheckoutForm(userDetails)
            .clickContinue()
        checkoutOverviewPage
            .verifyListedProducts(expectedListedProducts)
            .verifySummary(expectedSummaryDetails)
            .clickFinish()
        checkoutCompletePage
            .verifyCompleteNotificationMessage(expectedCompletedNotificationMessage)
    })
})