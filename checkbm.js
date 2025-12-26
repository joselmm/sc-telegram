
// Genera URLs para cada día de 2025 (1 de enero → 31 de diciembre)
function generateDailyUrls() {
  const baseUrl = "https://us-central1-bear-max.cloudfunctions.net/streamingFeed/streaming/disney/login-code";
  const urls = [];

  // Función auxiliar: formatea fecha como YYYY/MM/DD
  const formatDate = (date) => {
       return (date + 60);
  };

  // Fecha inicial: 1 de enero de 2025
  let current = 1762191600
  const end = 1766753049    // 1 de enero de 2026 (exclusivo)

  while (current < end) {
    const after = current;
    const before = formatDate(current);
    

    const emailParam = encodeURIComponent(`@bearmax.xyz after:${after} before:${before}`);
    const url = `${baseUrl}?email=${emailParam}`;

    urls.push(url);
    current=before

  }

  return urls;
}

// Ejecutar y mostrar
const urls2025 = generateDailyUrls();


var emailsUnicos =[];
var urls=JSON.parse(JSON.stringify(urls2025))
for (let i = 0; i < urls.length; i++) {
    await fetch(urls[i])
    .then(r=>r.json())
    .then(r=>{

        if(r.code!=null){
            
            if(!emailsUnicos.includes(r.meta.to)){
                emailsUnicos.push(r.meta.to);
                console.log("PERRO "+r.meta.to)
            }
        }else{
            console.log(i + " codigo no encontrado")
        }
        
    })
    .catch(r=>console.log("error con "+i))
}