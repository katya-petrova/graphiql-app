import * as Yup from 'yup';
import { Dictionary } from '../translation/getDictionary';

export const signupValidationSchema = (
  t: Dictionary['signUp']['validationErrors']
) =>
  Yup.object({
    name: Yup.string().required(t.name.required),
    email: Yup.string().email(t.email.valid).required(t.email.required),
    password: Yup.string()
      .min(8, t.password.min)
      .matches(/[a-zA-Z]/, t.password.matchesLetter)
      .matches(/\d/, t.password.matchesDigit)
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t.password.matchesSymbol)
      .required(t.password.required),
  });
