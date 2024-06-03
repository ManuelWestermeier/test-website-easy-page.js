const defaultRouteChangeHandeler = (
    url = new URL(document.location),
    navigate = (newUrl = "", replace = false) => undefined
) => undefined

var instanceOfRouter;

export default class Router {


    constructor(_routeChangeHandeler = defaultRouteChangeHandeler) {

        this.routeChangeHandeler = _routeChangeHandeler

        this.navigate = this.navigate.bind(this);

        this.routeChangeHandeler(
            new URL(document.location),
            this.navigate
        );

        window.onpopstate = event => {
            this.routeChangeHandeler(
                new URL(document.location),
                this.navigate
            );
        };

        if (!instanceOfRouter) {
            instanceOfRouter = this
        }
        else {
            throw new Error("Only one instance of Router is allowed")
        }

        return instanceOfRouter

    }

    navigate(newUrl = "", replace = false) {

        //change url and history
        if (replace)
            history.replaceState("", "", newUrl)
        else history.pushState("", "", newUrl)

        this.routeChangeHandeler(new URL(document.location), this.navigate)

    }

}

export function setNavigationLink(anchorElem = document.createElement("a")) {
    if (!anchorElem) return

    //set the onclick handeler to a navigate
    anchorElem.onclick = e => {
        e.preventDefault()
        instanceOfRouter?.navigate?.
            (anchorElem.href, anchorElem.getAttribute("replace") == "true");
    }
}

export function setAllNavigationLinks(links = [], href_highlighed = "") {
    //mak all links in the page active if they are visit
    links.forEach(link => {

        setNavigationLink(link)

        if (link.href == href_highlighed) {
            link.classList.add("active")
        }

        else link.classList.remove("active")

    })
}

async function fetchFile(url) {

    try {

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return res.text();

    } catch (error) {
        return error
    }

}

export function RouterMap(urlProperty = "pathname", caching = false, client_routes = {}, mainNode = document.body) {

    const resources = {};

    var routeHandeler = (url, navigate) => undefined
    var isLoadingChangeHandler = (isLoading = false) => undefined

    new Router(async (url, navigate) => {
        const path = url[urlProperty]

        //if the route isnt set go to 404 page
        if (!client_routes[path]) {
            isLoadingChangeHandler(true)
            mainNode.innerHTML = await fetchFile(client_routes["*"])
            resources["*"] = mainNode.innerHTML
        }
        //if the client is offline or in caching mode and the rsource is set load it from the cache
        else if ((caching || !navigator.onLine) && resources[path]) {
            isLoadingChangeHandler(true)
            mainNode.innerHTML = resources[path]
        }
        //load the resource from the server
        else {
            isLoadingChangeHandler(true)
            mainNode.innerHTML = await fetchFile(client_routes[path])
            resources[path] = mainNode.innerHTML
        }

        isLoadingChangeHandler(false)

        routeHandeler(url, navigate)
    })

    return [
        (newRouteChangeHandeler = routeHandeler) => {
            routeHandeler = newRouteChangeHandeler
        },
        (newIsLoadingChangeHandler = (isLoading = false) => undefined) => {
            isLoadingChangeHandler = newIsLoadingChangeHandler
        }
    ]

}