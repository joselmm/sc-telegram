import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'   // necesitas instalar node-fetch si usas ESM

const app = express()
const PORT = process.env.PORT || 3000

// CORS público para que cualquier frontend pueda usarlo
app.use(cors({ origin: '*' }))

// Ruta del proxy: /leer?msgno=XXXXX
app.get('/leer', async (req, res) => {
  const msgno = req.query.msgno

  // Validación básica
  if (!msgno || isNaN(msgno)) {
    return res.status(400).send('Falta o es inválido el parámetro msgno')
  }

  try {
    const response = await fetch(
      `https://peditucuenta.com/email/leer.php?msgno=${msgno}`
    )

    if (!response.ok) {
      return res.status(response.status).send(`Error del servidor remoto: ${response.status}`)
    }

    const html = await response.text()
    res.set('Content-Type', 'text/html')
    res.send(html)

  } catch (err) {
    console.error(err)
    res.status(500).send('Error al obtener el contenido')
  }
})

// Ruta raíz opcional (para probar que el servidor anda)
app.get('/', (req, res) => {
  res.send(`
    <h1>Proxy activo</h1>
    <p>Usa: <code>http://localhost:${PORT}/leer?msgno=12345</code></p>
  `)
})

app.listen(PORT, () => {
  console.log(`Proxy corriendo en http://localhost:${PORT}`)
  console.log(`Ejemplo: http://localhost:${PORT}/leer?msgno=19090`)
})