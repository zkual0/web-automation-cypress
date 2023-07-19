import { DashboardPage }  from "../page-objects/dashboard.page"
import { LoginPage }      from "../page-objects/login.page"

const loginPage     = new LoginPage()
const dashboardPage = new DashboardPage()

describe('on Login page', () => {
  
  beforeEach(()=>{
    cy.visit('/')
  })

  context('when using valid credentials', ()=>{
    it('user makes login successfully when using a fresh account', { tags: '@sanity' }, ()=>{
      const username = 'standard_user'
      const password = 'secret_sauce'
      const expectedDashboardTitle = 'Products'

      loginPage
        .fillUsername(username)
        .fillPassword(password)
        .clickLogin()
        .elements.loginButton().should('not.exist')
  
      dashboardPage
        .verifyTitle(expectedDashboardTitle)
    })
  })

  context('when using wrong credentials', { tags: ['@smoke','@errorsHandling'] }, ()=>{
    it('the app shows a specific error message when password is empty', ()=>{
      const username = 'standard_user'
      const password = null
      const errorMsg = 'Epic sadface: Password is required'

      loginPage
        .loginToApp(username, password)
        .verifyErrorMessage(errorMsg)
    })

    it('the app shows a specific error message when no username is empty', ()=>{
      const username = null
      const password = 'secret_sauce'
      const errorMsg = 'Epic sadface: Username is required'

      loginPage
        .loginToApp(username, password)
        .verifyErrorMessage(errorMsg)
    })

    it('the app shows a specific error message when credentials are wrong', ()=>{
      const username = 'asdasdasd'
      const password = 'ASDASDASD'
      const errorMsg = 'Epic sadface: Username and password do not match any user in this service'

      loginPage
        .loginToApp(username, password)
        .verifyErrorMessage(errorMsg)
    })
  })

  context('when using damaged credentials', ()=>{
    it('the login shows a error message when the account is locked out')
    it('the dashboard shows repeated product images')
    it('the login shows a delay when has a performance_glitch_user ')
  })
})
