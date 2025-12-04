fetch("https://www.pantallazo.store/api/login", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,es-US;q=0.8,es;q=0.7",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "vua4458iSow649HeyvCvRD9qx_KuPqjf2o5yUcLfZwg",
    "Referer": "https://www.pantallazo.store/login"
  },
  "body": "{\"telegramId\":\"42673657345\",\"csrfToken\":\"vua4458iSow649HeyvCvRD9qx_KuPqjf2o5yUcLfZwg\"}",
  "method": "POST"
})
.then(e=>e.json())
.then(e=>console.log(e))
.catch(e=>console.log(e))