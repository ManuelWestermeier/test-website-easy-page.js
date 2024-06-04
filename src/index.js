import { RouterMap, setAllNavigationLinks } from "./easy-page"
import "./index.css"
//set the config
const urlProperty = "search"
const caching = false
const mainNode = document.querySelector("main")

//set the routes map
const routes = {
    "": "/test-website-easy-page.js/template/main.html",
    "?": "/test-website-easy-page.js/template/main.html",
    "?about": "/test-website-easy-page.js/template/about.html",
    "*": "/test-website-easy-page.js/template/404.html",
}

//call the routermap
const [setRouteHandeler, setLoadingHandeler] = RouterMap(urlProperty, caching, routes, mainNode)

//on url change
setRouteHandeler((url, navigate) => {

    if (!url)
        navigate("?")

    console.log("new url", url[urlProperty])
    //all links, the highlight url (add active class)
    setAllNavigationLinks(document.querySelectorAll("a"), url || "?")

})

//on isloading change
setLoadingHandeler(isLoading => {

    if (isLoading)
        mainNode.style.animation = `pageTransition 0.5s ease-in-out`
    else mainNode.style.animation = ""

})