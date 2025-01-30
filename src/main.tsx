import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import Rox from 'rox-browser'

const flags = {
  enableTutorialRomain: new Rox.Flag(),
  titleColorsRomain: new Rox.RoxString('White', [
    'White',
    'Blue',
    'Green',
    'Yellow',
  ]),
  titleSizeRomain: new Rox.RoxNumber(12, [14, 18, 24]),
}

async function initPlatform() {
  const API_HOST = `API_HOST`
  const options = {
    configuration: {
      API_HOST: API_HOST,
      CD_API_ENDPOINT: `${API_HOST}/device/get_configuration`,
      CD_S3_ENDPOINT: 'https://development-conf.rollout.io/',
      SS_API_ENDPOINT: `${API_HOST}/device/update_state_store/`,
      SS_S3_ENDPOINT: 'https://development-statestore.rollout.io/',
      CLIENT_DATA_CACHE_KEY: 'client_data',
      ANALYTICS_ENDPOINT: 'https://localhost:8787',
      NOTIFICATIONS_ENDPOINT: `${API_HOST}/sse`,
    },
    debugLevel: 'verbose',
    disableSignatureVerification: true,
  }
  // Register the flags
  Rox.register('', flags)

  // Setup connection with the feature management environment key
  await Rox.setup('FM_KEY', options as any)

  // Boolean flag example
  if (flags.enableTutorialRomain.isEnabled()) {
    console.log('enableTutorial flag is true')
    // TODO:  Put your code here that needs to be gated
  }

  // RoxString flag example
  console.log('Title color is ' + flags.titleColorsRomain.getValue())

  // RoxNumber flag example
  console.log('Title size is ' + flags.titleSizeRomain.getValue())
}

initPlatform().then(function () {
  console.log('Done loading CloudBees platform')
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
