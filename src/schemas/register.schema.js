import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().min(2).max(128).required(),
  lastName: yup.string().min(2).max(128).required(),
  password: yup.string().min(3).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null])
});

export default schema;