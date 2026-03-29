'use strict';

const request = require('supertest');
const app = require('./index');

describe('API - Endpoints', () => {
  test('GET / retorna mensaje de bienvenida', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.mensaje).toMatch(/Pipeline/);
  });

  test('GET /health retorna status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /ruta-inexistente retorna 404', async () => {
    const res = await request(app).get('/ruta-inexistente');
    expect(res.statusCode).toBe(404);
  });

  test('GET /iva/100 calcula IVA correctamente', async () => {
    const res = await request(app).get('/iva/100');
    expect(res.statusCode).toBe(200);
    expect(res.body.iva).toBe(12);
    expect(res.body.total).toBe(112);
  });

  test('GET /iva/precio-invalido retorna 400', async () => {
    const res = await request(app).get('/iva/abc');
    expect(res.statusCode).toBe(400);
  });

  test('GET /descuento/200/25 calcula descuento correctamente', async () => {
    const res = await request(app).get('/descuento/200/25');
    expect(res.statusCode).toBe(200);
    expect(res.body.precioFinal).toBe(150);
  });

  test('POST /email/validar con email válido', async () => {
    const res = await request(app)
      .post('/email/validar')
      .send({ email: 'prueba@test.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body.valido).toBe(true);
  });

  test('POST /email/validar con email inválido', async () => {
    const res = await request(app)
      .post('/email/validar')
      .send({ email: 'no-es-email' });
    expect(res.statusCode).toBe(200);
    expect(res.body.valido).toBe(false);
  });

  test('GET /celsius/0 convierte 0°C a 32°F', async () => {
    const res = await request(app).get('/celsius/0');
    expect(res.statusCode).toBe(200);
    expect(res.body.fahrenheit).toBe(32);
  });

  test('GET /celsius/invalido retorna 400', async () => {
    const res = await request(app).get('/celsius/abc');
    expect(res.statusCode).toBe(400);
  });

  test('GET /primo/7 retorna true', async () => {
    const res = await request(app).get('/primo/7');
    expect(res.statusCode).toBe(200);
    expect(res.body.esPrimo).toBe(true);
  });

  test('GET /primo/8 retorna false', async () => {
    const res = await request(app).get('/primo/8');
    expect(res.statusCode).toBe(200);
    expect(res.body.esPrimo).toBe(false);
  });

  test('GET /primo/invalido retorna 400', async () => {
    const res = await request(app).get('/primo/abc');
    expect(res.statusCode).toBe(400);
  });
});
