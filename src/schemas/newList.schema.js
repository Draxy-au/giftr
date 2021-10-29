import * as yup from 'yup';

const newListSchema = yup.object().shape({

  name: yup.string().max(60).required(),

  description: yup.string().min(2).max(350).required(),

});

export default newListSchema;