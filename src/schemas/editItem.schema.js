import * as yup from 'yup';

const editItemSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  url: yup.string(),
  image_path: yup.string()
});

export default editItemSchema;