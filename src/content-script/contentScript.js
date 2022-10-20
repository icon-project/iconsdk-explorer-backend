

console.log("Hello ICONSDK!")

let contentPort

startIconsdkRelay()

window.addEventListener('ICONSDK_RELAY_REQUEST', event => {
  const { detail: data } = event
  try {
    sendPostMessage(contentPort, data)
  }
  catch (e) {
    console.log(e)
    startIconsdkRelay()
    sendPostMessage(contentPort, data)
  }
})

function startIconsdkRelay() {
  contentPort = window.chrome.runtime.connect({
    name: 'iconsdk-background-content'
  });
}

function sendPostMessage(port, data) {
  if (!!port && typeof port.postMessage === 'function') {
    const { type } = data
    switch (type) {
      case 'REQUEST_HAS_ACCOUNT':
      case 'REQUEST_HAS_ADDRESS':
      case 'REQUEST_ADDRESS':
      case 'REQUEST_JSON-RPC':
      case 'REQUEST_SIGNING':
        port.postMessage({
          ...data,
          host: window.location.hostname
        })
        break;
      default:
    }
  }
}

window.chrome.runtime.onMessage.addListener(detail => {
  const customEvent = new CustomEvent('ICONSDK_RELAY_RESPONSE', { detail })
  window.dispatchEvent(customEvent)
})
