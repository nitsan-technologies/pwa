class NsPwa {
  constructor(config) {
    this.options = {
      pwa_short_name: 'App Short Name',
      pwa_name: 'App Name',
      pwa_start_url: 'Main URL (like: / , https://example.com/)',
      pwa_background_color: 'Background Color',
      pwa_display: 'standalone',
      pwa_theme_color: 'Theme Color',
      pwa_icon_48: '/pwa/icon/pwa-48.png',
      pwa_icon_72: '/pwa/icon/pwa-72.png',
      pwa_icon_96: '/pwa/icon/pwa-96.png',
      pwa_icon_144: '/pwa/icon/pwa-144.png',
      pwa_icon_192: '/pwa/icon/pwa-192.png',
      pwa_icon_512: '/pwa/icon/pwa-512.png',
      pwa_service_worker: '/pwa/service-worker.js',
      // If you need json file Code Please Enabled this option
      pwa_get_json: false,
    };

    if (typeof config === 'object') {
      this.options = { ...this.options, ...config };
    }

    // call our init function
    this.init();
  }

  init() {
    const obj = {
      short_name: this.options.pwa_short_name,
      name: this.options.pwa_name,
      icons: [
        {
          src: this.options.pwa_icon_48,
          sizes: '72x72',
          type: 'image/png',
          density: 1.5,
        },
        {
          src: this.options.pwa_icon_72,
          sizes: '72x72',
          type: 'image/png',
          density: 1.5,
        },
        {
          src: this.options.pwa_icon_96,
          sizes: '96x96',
          type: 'image/png',
          density: 2,
        },
        {
          src: this.options.pwa_icon_144,
          sizes: '144x144',
          type: 'image/png',
          density: 3,
          purpose: 'maskable',
        },
        {
          src: this.options.pwa_icon_192,
          sizes: '192x192',
          type: 'image/png',
          density: 4,
        },
        {
          src: this.options.pwa_icon_512,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      start_url: this.options.pwa_start_url,
      background_color: this.options.pwa_background_color,
      display: this.options.pwa_display,
      theme_color: this.options.pwa_theme_color,
    };

    if (this.options.pwa_get_json) {
      function output(inp) {
        document.body.innerHTML = '';
        document.body.appendChild(document.createElement('pre')).innerHTML = inp;
      }

      function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/('(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\'])*'(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
          const cls = 'number';
          if (/^'/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return `<span class="${cls}">${match}</span>`;
        });
      }

      const str = JSON.stringify(obj, undefined, 4);

      output(str);
      output(syntaxHighlight(str));
    }

    window.addEventListener('load', async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(this.options.pwa_service_worker);
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          const notificationPermission = await Notification.requestPermission();
          if (notificationPermission !== 'granted') {
            console.log('Notification permission not granted');
          } else {
            console.log('Notification Code Here');
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  }
}

export default NsPwa;
