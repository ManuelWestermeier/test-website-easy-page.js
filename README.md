# easy-page.js

## basic setup

```js
import { RouterMap, setAllNavigationLinks } from "./easy-page";

//set the routes map
//"/url": "html to fetch path"
//"*": "404 page html to fetch path"
const routes = {
  "/": "/template/main.html",
  "/about": "/template/about.html",
  "*": "/template/404.html",
};

//set the config (url[urlProperty])
const urlProperty = "pathname";
//to load a single time or every time the url is loaded
const caching = false;
//the routing main node
const mainNode = document.querySelector("main");

//call the routermap
const [setRouteHandeler, setLoadingHandeler] = RouterMap(
  urlProperty,
  caching,
  routes,
  mainNode
);

//on url change
setRouteHandeler((url) => {
  console.log("new url", url[urlProperty]);
  //all links, the highlight url (add active class)
  setAllNavigationLinks(document.querySelectorAll("a"), url);
});

//on isloading change
setLoadingHandeler((isLoading) => {
  console.log("is loading", isLoading);
});
```

## uning router cass

```js
import Router from "./easy-page"

//the Router is a one-instance class
//the constructor takes 1 argument :
//is is a callback function with arguments url and navigate
new Router((url, navigate) => {
    //url is a object of type URL
    //navigate is a function to navigate to another url
    //it takes 2 arguments: (string)newURL and (bool)replace
    //everytyme it is called it will run the in the Router specefyed constructor function

    //logs the url pathname
    console.log("url", url.pathname)
    //navigate after 0.5s to the /random/{randomid} route and recalls the constructor function
    setTimeout(() => navigate(`/random/${Math.random()}`, true), 500)
})
```

## other methods

### setNavigationLink
```js
//argument : html anchor element
//returntype void
//on link click it dont refresh the page it only navigate to the href attribute 
//it adds the attribute "replace" to the anchor element
//<a href="/endpoint" replace="true or false or nothing (default: false)">
setNavigationLink(document.querySelector("a"))
```

### setAllNavigationLinks
```js
//argument 1 : list of all anchor elements to set navigate link
//argument 2 : the activete url
setAllNavigationLinks(
    document.querySelectorAll("a"),
    /*if the route /about is visited it
    adds to the anchor the class "active"*/
    "/about"
)
```