fetch("https://codigos.mimiplays.com/funciones.php", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9,es-US;q=0.8,es;q=0.7",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "upgrade-insecure-requests": "1",
    "cookie": "PHPSESSID=af2628e64766e7de3be6d9d6d9fffc13",
    "Referer": "https://codigos.mimiplays.com/inicio.php"
  },
  "body": "email=disney7%40mimiplays.com&plataforma=Disney%2B",
  "method": "POST"
}).then(e=>e.text())
.then(e=>console.log(e))
.catch(e=>console.log(e))