export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)
    
    this.handle()
  }

  SetBackground(page) {
    const body = document.body
    body.removeAttribute('class')

    const thePageWasFound = page !== '404'
    if (thePageWasFound) {
      body.classList.add(page)
      return
    }

    body.classList.add('home')
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    const currentPage = route.replace('/pages/', '').replace('.html', '')
    this.SetBackground(currentPage)
  }
}