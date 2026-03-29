'use strict';

/**
 * Calcula el IVA de un precio dado.
 * @param {number} precio - Precio base (debe ser >= 0)
 * @param {number} tasa - Tasa de IVA en decimal (default 0.12 = 12%)
 * @returns {number} Monto del IVA redondeado a 2 decimales
 */
function calcularIVA(precio, tasa = 0.12) {
  if (typeof precio !== 'number' || precio < 0) {
    throw new Error('El precio debe ser un número no negativo');
  }
  if (typeof tasa !== 'number' || tasa < 0 || tasa > 1) {
    throw new Error('La tasa debe ser un número entre 0 y 1');
  }
  return parseFloat((precio * tasa).toFixed(2));
}

/**
 * Valida si un string tiene formato de email válido.
 * @param {string} email - Email a validar
 * @returns {boolean} true si el email es válido
 */
function validarEmail(email) {
  if (typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Calcula el precio final después de aplicar un porcentaje de descuento.
 * @param {number} precio - Precio original (debe ser >= 0)
 * @param {number} porcentaje - Porcentaje de descuento (0-100)
 * @returns {number} Precio con descuento redondeado a 2 decimales
 */
function calcularDescuento(precio, porcentaje) {
  if (typeof precio !== 'number' || precio < 0) {
    throw new Error('El precio debe ser un número no negativo');
  }
  if (typeof porcentaje !== 'number' || porcentaje < 0 || porcentaje > 100) {
    throw new Error('El porcentaje debe estar entre 0 y 100');
  }
  return parseFloat((precio * (1 - porcentaje / 100)).toFixed(2));
}

/**
 * Convierte temperatura de grados Celsius a Fahrenheit.
 * @param {number} celsius - Temperatura en Celsius
 * @returns {number} Temperatura en Fahrenheit redondeada a 2 decimales
 */
function celsiusAFahrenheit(celsius) {
  if (typeof celsius !== 'number') {
    throw new Error('La temperatura debe ser un número');
  }
  return parseFloat(((celsius * 9) / 5 + 32).toFixed(2));
}

/**
 * Verifica si un número entero positivo es primo.
 * @param {number} numero - Número a verificar
 * @returns {boolean} true si el número es primo
 */
function esPrimo(numero) {
  if (!Number.isInteger(numero) || numero < 2) return false;
  if (numero === 2) return true;
  if (numero % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(numero); i += 2) {
    if (numero % i === 0) return false;
  }
  return true;
}

module.exports = {
  calcularIVA,
  validarEmail,
  calcularDescuento,
  celsiusAFahrenheit,
  esPrimo,
};
