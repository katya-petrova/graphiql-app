import { signupValidationSchema } from './validationSchema';

describe('signupValidationSchema', () => {
  it('should validate the schema correctly with valid data', async () => {
    const validData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password123!',
    };

    await expect(signupValidationSchema.validate(validData)).resolves.toBe(
      validData
    );
  });

  it('should return an error if name is missing', async () => {
    const invalidData = {
      name: '',
      email: 'johndoe@example.com',
      password: 'Password123!',
    };

    await expect(signupValidationSchema.validate(invalidData)).rejects.toThrow(
      'Name is required'
    );
  });

  it('should return an error if email is invalid', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'not-an-email',
      password: 'Password123!',
    };

    await expect(signupValidationSchema.validate(invalidData)).rejects.toThrow(
      'Invalid email address'
    );
  });

  it('should return an error if password is less than 8 characters', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Pass1!',
    };

    await expect(signupValidationSchema.validate(invalidData)).rejects.toThrow(
      'Password must be at least 8 characters long'
    );
  });

  it('should return an error if password does not contain a letter', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678!',
    };

    await expect(signupValidationSchema.validate(invalidData)).rejects.toThrow(
      'Password must contain at least one letter'
    );
  });

  it('should return an error if password does not contain a digit', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password!',
    };

    await expect(signupValidationSchema.validate(invalidData)).rejects.toThrow(
      'Password must contain at least one digit'
    );
  });

  it('should return an error if password does not contain a special character', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Password123',
    };

    await expect(signupValidationSchema.validate(invalidData)).rejects.toThrow(
      'Password must contain at least one special character'
    );
  });
});
