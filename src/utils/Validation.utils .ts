/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation - minimum 6 characters
 */
const PASSWORD_MIN_LENGTH = 6;

/**
 * Validates email format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates password strength
 * Minimum 6 characters
 * 
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  return password.length >= PASSWORD_MIN_LENGTH;
}

/**
 * Validates if string is not empty
 * 
 * @param {string} value - String to validate
 * @returns {boolean} True if not empty, false otherwise
 */
export function isNotEmpty(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  return value.trim().length > 0;
}

/**
 * Validates full name (at least first and last name)
 * 
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidFullName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  const parts = trimmed.split(' ').filter(part => part.length > 0);
  return parts.length >= 2;
}

/**
 * Validates phone number (Brazilian format)
 * Accepts: (11) 98765-4321 or 11987654321
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

/**
 * Validates CPF (Brazilian document)
 * 
 * @param {string} cpf - CPF to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf || typeof cpf !== 'string') return false;
  
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false; // All same digits
  
  // Validate check digits
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false;
  
  return true;
}

/**
 * Validates CNPJ (Brazilian company document)
 * 
 * @param {string} cnpj - CNPJ to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj || typeof cnpj !== 'string') return false;
  
  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleaned)) return false; // All same digits
  
  // Validate check digits
  let length = cleaned.length - 2;
  let numbers = cleaned.substring(0, length);
  const digits = cleaned.substring(length);
  let sum = 0;
  let pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  length = length + 1;
  numbers = cleaned.substring(0, length);
  sum = 0;
  pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;
  
  return true;
}

/**
 * Formats CPF string
 * 
 * @param {string} cpf - CPF to format
 * @returns {string} Formatted CPF (123.456.789-01)
 */
export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formats CNPJ string
 * 
 * @param {string} cnpj - CNPJ to format
 * @returns {string} Formatted CNPJ (12.345.678/0001-90)
 */
export function formatCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

/**
 * Formats phone number
 * 
 * @param {string} phone - Phone to format
 * @returns {string} Formatted phone ((11) 98765-4321)
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}