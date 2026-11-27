/*
 * Google Analytics 4 behind Google Consent Mode v2, through the one
 * analytics.js every Kanso Labs site that loads gtag.js itself loads from
 * https://kansolabs.org/analytics.js, kept in kanso-labs/kanso-labs.github.io.
 *
 * Mintlify includes this file on every page with no attributes of its own, so
 * it writes the <script> tag the shared file reads its settings from: the
 * measurement ID, shared with kansolabs.org, and the privacy note the banner
 * links to. The shared file draws the banner. If it fails to load, nothing is
 * counted, no banner is drawn and nothing else on the page breaks.
 *
 * It runs on docs.kansolabs.org alone, so neither `npx mint dev` nor a
 * Mintlify preview shows the banner.
 */
;(function () {
  'use strict'

  if (window.location.hostname !== 'docs.kansolabs.org') return
  if (window.kansoAnalytics || document.getElementById('kanso-analytics')) {
    return
  }

  var script = document.createElement('script')
  script.async = true
  script.id = 'kanso-analytics'
  script.dataset.measurementId = 'G-G5J7LFENG0'
  script.dataset.privacyUrl = '/privacy'
  script.src = 'https://kansolabs.org/analytics.js'
  document.head.appendChild(script)
})()
