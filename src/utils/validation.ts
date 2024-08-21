import * as Yup from 'yup';

export const signupValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
});

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
