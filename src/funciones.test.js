'use strict';

const {
  calcularIVA,
  validarEmail,
  calcularDescuento,
  celsiusAFahrenheit,
  esPrimo,
} = require('./funciones');

// ─── calcularIVA ────────────────────────────────────────────────────────────

describe('calcularIVA', () => {
  test('calcula IVA del 12% correctamente', () => {
    expect(calcularIVA(100)).toBe(12);
  });

  test('calcula IVA con tasa personalizada', () => {
    expect(calcularIVA(200, 0.15)).toBe(30);
  });

  test('retorna 0 para precio 0', () => {
    expect(calcularIVA(0)).toBe(0);
  });

  test('redondea correctamente a 2 decimales', () => {
    expect(calcularIVA(99.99, 0.12)).toBe(12);
  });

  test('lanza error si precio es negativo', () => {
    expect(() => calcularIVA(-10)).toThrow('El precio debe ser un número no negativo');
  });

  test('lanza error si precio no es número', () => {
    expect(() => calcularIVA('cien')).toThrow('El precio debe ser un número no negativo');
  });

  test('lanza error si tasa es mayor a 1', () => {
    expect(() => calcularIVA(100, 1.5)).toThrow('La tasa debe ser un número entre 0 y 1');
  });

  test('lanza error si tasa es negativa', () => {
    expect(() => calcularIVA(100, -0.1)).toThrow('La tasa debe ser un número entre 0 y 1');
  });
});

// ─── validarEmail ────────────────────────────────────────────────────────────

describe('validarEmail', () => {
  test('acepta email válido simple', () => {
    expect(validarEmail('usuario@dominio.com')).toBe(true);
  });

  test('acepta email con subdominios', () => {
    expect(validarEmail('user@mail.empresa.org')).toBe(true);
  });

  test('acepta email con puntos en usuario', () => {
    expect(validarEmail('nombre.apellido@empresa.net')).toBe(true);
  });

  test('rechaza email sin @', () => {
    expect(validarEmail('usuariodominio.com')).toBe(false);
  });

  test('rechaza email sin dominio', () => {
    expect(validarEmail('usuario@')).toBe(false);
  });

  test('rechaza email sin extensión', () => {
    expect(validarEmail('usuario@dominio')).toBe(false);
  });

  test('rechaza string vacío', () => {
    expect(validarEmail('')).toBe(false);
  });

  test('rechaza valor no string', () => {
    expect(validarEmail(12345)).toBe(false);
  });

  test('rechaza null', () => {
    expect(validarEmail(null)).toBe(false);
  });
});

// ─── calcularDescuento ───────────────────────────────────────────────────────

describe('calcularDescuento', () => {
  test('aplica descuento del 10% correctamente', () => {
    expect(calcularDescuento(100, 10)).toBe(90);
  });

  test('aplica descuento del 50%', () => {
    expect(calcularDescuento(200, 50)).toBe(100);
  });

  test('descuento 0% retorna precio original', () => {
    expect(calcularDescuento(150, 0)).toBe(150);
  });

  test('descuento 100% retorna 0', () => {
    expect(calcularDescuento(100, 100)).toBe(0);
  });

  test('redondea a 2 decimales', () => {
    expect(calcularDescuento(99.99, 10)).toBe(89.99);
  });

  test('lanza error si precio es negativo', () => {
    expect(() => calcularDescuento(-50, 10)).toThrow('El precio debe ser un número no negativo');
  });

  test('lanza error si precio no es número', () => {
    expect(() => calcularDescuento('cien', 10)).toThrow('El precio debe ser un número no negativo');
  });

  test('lanza error si porcentaje es negativo', () => {
    expect(() => calcularDescuento(100, -5)).toThrow('El porcentaje debe estar entre 0 y 100');
  });

  test('lanza error si porcentaje supera 100', () => {
    expect(() => calcularDescuento(100, 110)).toThrow('El porcentaje debe estar entre 0 y 100');
  });
});

// ─── celsiusAFahrenheit ──────────────────────────────────────────────────────

describe('celsiusAFahrenheit', () => {
  test('convierte 0°C a 32°F', () => {
    expect(celsiusAFahrenheit(0)).toBe(32);
  });

  test('convierte 100°C a 212°F', () => {
    expect(celsiusAFahrenheit(100)).toBe(212);
  });

  test('convierte temperaturas negativas', () => {
    expect(celsiusAFahrenheit(-40)).toBe(-40);
  });

  test('convierte 37°C (temperatura corporal)', () => {
    expect(celsiusAFahrenheit(37)).toBe(98.6);
  });

  test('lanza error si no es número', () => {
    expect(() => celsiusAFahrenheit('veinte')).toThrow('La temperatura debe ser un número');
  });
});

// ─── esPrimo ─────────────────────────────────────────────────────────────────

describe('esPrimo', () => {
  test('2 es primo', () => {
    expect(esPrimo(2)).toBe(true);
  });

  test('3 es primo', () => {
    expect(esPrimo(3)).toBe(true);
  });

  test('13 es primo', () => {
    expect(esPrimo(13)).toBe(true);
  });

  test('97 es primo', () => {
    expect(esPrimo(97)).toBe(true);
  });

  test('1 no es primo', () => {
    expect(esPrimo(1)).toBe(false);
  });

  test('0 no es primo', () => {
    expect(esPrimo(0)).toBe(false);
  });

  test('número negativo no es primo', () => {
    expect(esPrimo(-7)).toBe(false);
  });

  test('4 no es primo (divisible por 2)', () => {
    expect(esPrimo(4)).toBe(false);
  });

  test('9 no es primo (divisible por 3)', () => {
    expect(esPrimo(9)).toBe(false);
  });

  test('número decimal no es primo', () => {
    expect(esPrimo(3.5)).toBe(false);
  });
});
