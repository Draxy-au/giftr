import * as yup from 'yup';

const newItemSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  description: yup.string(),
  url: yup.string(),
  image_path: yup.string()
});

export default newItemSchema;