import { chromium } from 'playwright-core';

// 1. Ruta base del User Data (sin el subdirectorio del perfil)
const userDataDir = 'C:\\Users\\Usuario\\AppData\\Local\\Google\\Chrome\\User Data';

const launchOptions = {
  headless: true, // Necesario para interactuar y ver las extensiones
  executablePath: 'C:\\Users\\Usuario\\AppData\\Local\\ms-playwright\\chromium-1148\\chrome-win\\chrome.exe',
  args: [
    // 2. Especificamos que use tu "Profile 36"
    '--profile-directory=Profile 36',
    // 3. Playwright por defecto desactiva extensiones, esto las fuerza:
    '--disable-extensions-except=C:\\Users\\Usuario\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 36\\Extensions\\fjoaledfpmneenckfbpdfhkmimnjocfa\\5.3.2_0', 
    '--load-extension=C:\\Users\\Usuario\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 36\\Extensions\\fjoaledfpmneenckfbpdfhkmimnjocfa\\5.3.2_0'
  ],
};

async function abrirNavegador() {
  try {
    // Usamos launchPersistentContext para mantener cookies, historial y extensiones
    const context = await chromium.launchPersistentContext(userDataDir, launchOptions);
    
    const page = await context.newPage();

    await page.waitForTimeout(5000)
    await page.goto('https://whatsmyip.com/api/ip-info',{timeout:40000});
    var content = await page.content();
    console.log(content)
    
    console.log('Navegador abierto con el Perfil 36 y extensiones.');
    
    // Si quieres que no se cierre solo, comenta la línea de abajo
    // await context.close();
  } catch (error) {
    console.error('Error: Asegúrate de que Chrome esté CERRADO antes de ejecutar.', error);
  }
}

abrirNavegador();