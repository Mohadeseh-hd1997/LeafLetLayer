var DYNAMIC_CACHE_VERSION = "daynamic_2";
var STATIC_CACHE_VERSION = "static_2";

STATIC_CACHE_VERSION = [
  "/",
  "/index.html",
  "/logo192.png",
  "./logo512.png",
  "/src/Hook/UsePhotos.tsx",
  "/src/Layout/Footer.js",
  "/src/Layout/Header.js",
  "/src/Layout/HeaderRtl.js",
  "/src/Layout/Sidenav.js",
  "/src/Layout/Main.js",
  "/src/assets/images/bg-profile.jpg",
  
  "/src/assets/images/bg-signup.jpg",
  
  "/src/assets/images/calendar.svg",
  
  "/src/assets/images/duplicate.svg",
  
  "/src/assets/images/face-1.jpg",
  
  "/src/assets/images/face-2.jpg",
  
  "/src/assets/images/face-3.jpg",
  
  "/src/assets/images/face-4.jpg",
  
  "/src/assets/images/face-5.jpg",
  
  "/src/assets/images/face-6.jpg",
  
  "/src/assets/images/Google__G__Logo.svg",
  
  "/src/assets/images/home-decor-1.jpeg",
  
  "/src/assets/images/home-decor-2.jpeg",
  
  "/src/assets/images/home-decor-3.jpeg",
  
  "/src/assets/images/icon-1.jpg",
  
  "/src/assets/images/image-statue@2x.png",
  
  "/src/assets/images/image@2x.png",
  
  "/src/assets/images/img-signin.jpg",

];

// install mode
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("static_1")
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_VERSION);
      })
      .catch((error) =>
        console.log("Error in cache open during installation: " + error)
      )
  );
});

//activate mode
// 1- this function  controlled old cache
function CleanCache() {
  caches.keys().then((keys) => {
    return Promise.all(
      keys.map((key) => {
        if (key !== STATIC_CACHE_VERSION && key !== DYNAMIC_CACHE_VERSION) {
          console.log("old cache removed", key);
          return caches.delete(key);
        }
      })
    );
  });
}
// -2 call function in activate
self.addEventListener("activete", (event) => {
  event.waituntill(CleanCache());
});

// fetch mode
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (Included(request.url, STATIC_CACHE_VERSION)) {
    event.respondWith(
      caches.match(request).then((response) => {
        const updateResponse = fetch(request)
          .then((newRes) => {
            const clonedResponse = newRes.clone();
            caches.open(DYNAMIC_CACHE_VERSION).then((cache) => {
              cache.put(request, clonedResponse);
            });
            return newRes;
          })
          .catch(() => caches.match(request));
        return response || updateResponse;
      })
    );
  }
});

// Check Exist Cache in Browser

function Included(string, array) {
  var path;
  // Checking if the string starts with the origin
  if (string.indexOf(self.origin) == 0) {
    // If yes, substring starting from the length of origin
    path = string.substring(self.origin.length);
  } else {
    // Otherwise, the path is the same as the string
    path = string;
  }
  // Checking if the path exists in the array
  return array.indexOf(path) > -1;
}
