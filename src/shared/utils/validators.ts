/**
 * Validation utilities
 * Функции для валидации данных
 */

import { VALIDATION } from '../../core/constants/config';

/**
 * Валидация email
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION.email.test(email);
};

/**
 * Валидация телефона
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION.phone.test(phone);
};

/**
 * Валидация имени
 */
export const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= VALIDATION.minNameLength &&
         trimmed.length <= VALIDATION.maxNameLength;
};

/**
 * Валидация адреса
 */
export const isValidAddress = (address: string): boolean => {
  const trimmed = address.trim();
  return trimmed.length >= VALIDATION.minAddressLength &&
         trimmed.length <= VALIDATION.maxAddressLength;
};

/**
 * Проверка на пустую строку
 */
export const isNotEmpty = (str: string): boolean => {
  return str.trim().length > 0;
};

/**
 * Валидация количества товара
 */
export const isValidQuantity = (quantity: number, max: number = 99): boolean => {
  return Number.isInteger(quantity) && quantity >= 1 && quantity <= max;
};

/**
 * Валидация цены
 */
export const isValidPrice = (price: number): boolean => {
  return typeof price === 'number' && price > 0 && Number.isFinite(price);
};

/**
 * Общая валидация формы заказа
 */
export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const validateOrderForm = (data: OrderFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!isValidName(data.name)) {
    errors.name = `Имя должно быть от ${VALIDATION.minNameLength} до ${VALIDATION.maxNameLength} символов`;
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Некорректный email адрес';
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = 'Некорректный номер телефона';
  }

  if (!isValidAddress(data.address)) {
    errors.address = `Адрес должен быть от ${VALIDATION.minAddressLength} до ${VALIDATION.maxAddressLength} символов`;
  }

  return errors;
};

/**
 * Проверка, есть ли ошибки валидации
 */
export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
