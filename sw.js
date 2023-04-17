const nombreCache = "apv-v3"
const archivos = [
    "/",
    "index.html",
    "error.html",
    "css/styles.css",
    "css/bootstrap.css",
    "js/apv.js",
    "js/app.js",
    "manifest.json",
    "img/icons/Icon-72.png",
    "img/icons/Icon-120.png",
    "img/icons/Icon-144.png",
    "img/icons/Icon-152.png",
    "img/icons/Icon-196.png",
    "img/icons/Icon-256.png",
    "img/icons/Icon-512.png",
    "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,400italic&display=swap"
  ];


//Cuando se instala el service worker
self.addEventListener("install", e => {
    console.log("Instalando el Service Worker", e)

    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                console.log("Almacen de Caché Creada")
                cache.addAll(archivos)
                console.log("archivos guardados en caché...")
            })
    )
})

//Activar el Service Worker
self.addEventListener("activate", e => {
    console.log("Service Worker Activado", e)

    //Eliminar las versiones de caches anteriores
    e.waitUntil(
        caches.keys() //.keys serian las versiones de caches que estan en la caches storage
            .then( keys => {
                return Promise.all(
                    keys.filter( key => key !== nombreCache)
                        .map( key => caches.delete(key))
                )
            })
    )
})

self.addEventListener("fetch", e => {
    console.log("Entrando a la caché", e)
    e.respondWith(
        caches
          .match(e.request) // verificar si una solicitud coincidente (es decir, coincide con la URL) se puede encontrar en cualquier caché
          .then(cacheResponse =>(cacheResponse ? cacheResponse : caches.match('error.html')))
        
      )
})