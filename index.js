'use strict';

const express = require('express');
const { calcularIVA, validarEmail, calcularDescuento, celsiusAFahrenheit, esPrimo } = require('./src/funciones');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'Tarea 6 - Pipeline API funcionando', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/iva/:precio', (req, res) => {
  const precio = parseFloat(req.params.precio);
  if (isNaN(precio) || precio < 0) {
    return res.status(400).json({ error: 'Precio inválido' });
  }
  const iva = calcularIVA(precio);
  return res.json({ precio, iva, total: parseFloat((precio + iva).toFixed(2)) });
});

app.get('/descuento/:precio/:porcentaje', (req, res) => {
  const precio = parseFloat(req.params.precio);
  const porcentaje = parseFloat(req.params.porcentaje);
  if (isNaN(precio) || isNaN(porcentaje)) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }
  const precioFinal = calcularDescuento(precio, porcentaje);
  return res.json({ precio, porcentaje, precioFinal });
});

app.post('/email/validar', (req, res) => {
  const { email } = req.body;
  const valido = validarEmail(email);
  res.json({ email, valido });
});

app.get('/celsius/:valor', (req, res) => {
  const celsius = parseFloat(req.params.valor);
  if (isNaN(celsius)) {
    return res.status(400).json({ error: 'Valor inválido' });
  }
  const fahrenheit = celsiusAFahrenheit(celsius);
  return res.json({ celsius, fahrenheit });
});

app.get('/primo/:numero', (req, res) => {
  const numero = parseInt(req.params.numero, 10);
  if (isNaN(numero)) {
    return res.status(400).json({ error: 'Número inválido' });
  }
  const primo = esPrimo(numero);
  return res.json({ numero, esPrimo: primo });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

module.exports = app;
