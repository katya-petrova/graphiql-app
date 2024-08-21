import { signupValidationSchema } from './validationSchema';
import * as Yup from 'yup';

export const validateSignupForm = (values: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    signupValidationSchema.validateSync(values, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((error) => {
        validationErrors[error.path || ''] = error.message;
      });
      return { isValid: false, errors: validationErrors };
    }
    return { isValid: false, errors: {} };
  }
};