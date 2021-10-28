import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(15).required(),
});

export default loginSchema;