module.exports = {
    "manifest_version": 2,
    "name": prodDev("ICONSDK", "ICONSDK Developer"),
    "short_name": "ICX Wallet",
    "description": prodDev("ICONSDK", "ICONSDK Developer"),
    "version": prodDev(process.env.APP_VERSION, "0." + process.env.APP_VERSION),
    "background": {
      "scripts": [
        "static/js/store.bundle.js"
      ],
      "persistent": true
    },
    "content_scripts": [
  		{
  			"matches": [
  				"<all_urls>"
  			],
  			"js": [
  				"static/js/contentScript.bundle.js"
  			]
  		}
  	],
    "icons": {
        "16": prodDev("icon_16.png", "icon_16_dev.png"),
        "32": prodDev("icon_32.png", "icon_32_dev.png"),
        "48": prodDev("icon_48.png", "icon_48_dev.png"),
        "128": prodDev("icon_128.png", "icon_128_dev.png")
    },
    "browser_action": {
      "default_title": prodDev("ICONSDK", "ICONSDK Developer"),
    },
    "permissions": [
        "storage",
        "https://wallet.icon.foundation/*"
    ]
};

function prodDev(prod, dev) {
  return process.env.NODE_ENV === 'production' ? prod : dev;
}
