import { validateSignupForm } from './validateSignupForm';
import { signUp } from '@/utils/translation/dictionaries/en.json';

describe('validateSignupForm', () => {
  const { validationErrors } = signUp;

  it('should return valid if all fields are correct', () => {
    const values = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password123!',
    };

    const result = validateSignupForm(values, validationErrors);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return an error if name is missing', () => {
    const values = {
      name: '',
      email: 'johndoe@example.com',
      password: 'Password123!',
    };

    const result = validateSignupForm(values, validationErrors);

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('name', 'Name is required');
  });

  it('should return an error if email is invalid', () => {
    const values = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Password123!',
    };

    const result = validateSignupForm(values, validationErrors);

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('email', 'Invalid email address');
  });

  it('should return an error if password is less than 8 characters', () => {
    const values = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Pass1!',
    };

    const result = validateSignupForm(values, validationErrors);

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty(
      'password',
      'Password must be at least 8 characters long'
    );
  });

  it('should return an error if password does not contain a letter', () => {
    const values = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678!',
    };

    const result = validateSignupForm(values, validationErrors);

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty(
      'password',
      'Password must contain at least one letter'
    );
  });

  it('should return an error if password does not contain a digit', () => {
    const values = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password!',
    };

    const result = validateSignupForm(values, validationErrors);

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty(
      'password',
      'Password must contain at least one digit'
    );
  });

  it('should return an error if password does not contain a special character', () => {
    const values = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password123',
    };

    const result = validateSignupForm(values, validationErrors);

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty(
      'password',
      'Password must contain at least one special character'
    );
  });
});
