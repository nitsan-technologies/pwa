# ns-pwa

> Simple and easy to integrate most popular PWA feature to your love website. Please perform easy installation guide below to quickly enable PWA feature.

**Features**:

- Plug-n-play PWA feature
- Easy to install PWA
- Pre-configured Package
- Customizable and Extendible
- Access content on any device
- Access web content even when the internet connection is weak or not available
- Load websites quickly
- Benefit from a high-quality user experience

**Advantages**:

- Fast, Reliable, Engaging
- Mobile-First Approach
- Save More Than 75%
- Good for SEO
- Your Website Feels like Native-Mobile


## Table of Contents

- [Demo](https://t3planet.com)
- [Install](#install)
- [Usage](#usage)
- [Browser Support](#browser-support)
- [FAQs](#faqs)
- [Contribute](#contribute)
- [Changelog](#changelog)
- [License](#license)

## Install

```sh
# You can install lozad with npm
$ npm i @nitsantechnologies/ns-pwa

# Alternatively you can use Yarn
$ yarn add @nitsantechnologies/ns-pwa
```

## Usage

Then with a module bundler like rollup or webpack, use as you would anything else:

## Initialization
```javascript
// using ES6 modules
import NsPwa from "@nitsantechnologies/ns-pwa";

const NsPwaVar = new NsPwa({
  //Add Your Site/App Short Name
  pwa_short_name: "<Application Short Name>",

  // Add your Site/App Name
  pwa_name: "<Application Name>",

  // Add your Site/App Start URL (Like: (/), (https://example.com/), (https://example.com/blog))
  pwa_start_url: "Main URL (like: / or https://example.com/)",

  // Add your Site/App Background Color (Like: #000, #fff, RGB(0,0,0))
  pwa_background_color: "Background Color",

  // Add your Site/App Display
  pwa_display: "standalone",

  // Add your Site/App Theme Color (Like: #000, #fff, RGB(0,0,0))
  pwa_theme_color: "Theme Color",

  // Add your Site/App Icons
  pwa_icon_48: "/pwa/icon/pwa-48.png",
  pwa_icon_72: "/pwa/icon/pwa-72.png",
  pwa_icon_96: "/pwa/icon/pwa-96.png",
  pwa_icon_144: "/pwa/icon/pwa-144.png",
  pwa_icon_192: "/pwa/icon/pwa-192.png",
  pwa_icon_512: "/pwa/icon/pwa-512.png",

  // Make Sure your Service-worker JS Added following path at root>pwa>service-worker.js
  pwa_service_worker: "/pwa/service-worker.js",

  //You can see your JSON Code with this option
  pwa_get_json: true,
});
```

## Service-worker.js

```javascript
//Add Code On Service-Worker JS
const dataCacheName = 'App Data';
const cacheName = 'App';
const filesToCache = [
  '/',
  '/pwa/pwa.png',
];

//install the sw
self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
```

## Add your Code At <HEAD> Tag With All proper Data

```html
<!-- You can create JSON file Manually with *pwa_get_json* This option-->
<link rel="manifest" href="/pwa/manifest.json" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- Add Your Site Name on Content-->
<meta name="apple-mobile-web-app-title" content="Your_site" />
<!-- Add your ISO PNG Path -->
<link rel="apple-touch-icon" href="/pwa/pwa.png" />
<meta name="msapplication-TileImage" content="/pwa/pwa.png" />
<meta name="theme-color" content="#000" />
<meta name="msapplication-TileColor" content="#000" />
```

## Browser Support

Available in [latest browsers](http://caniuse.com/#feat=intersectionobserver).

## FAQs

- You can generate your PWA Icons/Images form here > [PWA Icons](https://tools.crawlink.com/tools/pwa-icon-generator/).
- We are Added Service Worker JS Code So you can add Easily
- We use ES6 modules
- Compatible With All Type Front-end Project
- You need To add files Manually (Because Some Limitation)
- PWA Usefull for Better SEO/UI-UX
- PWA Create One type of App For your Website

## Contribute

Interested in contributing features and fixes?

[Excited to receive your PR](https://github.com/nitsan-technologies/ns_pwa).

## License

[MIT](LICENSE) © [NITSAN Technologies](https://nitsantech.com)
