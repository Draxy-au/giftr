import axios from 'axios';
import '../constants/api';
import { API_BASE_AUTH } from '../constants/api';

export default axios.create({
  baseURL: API_BASE_AUTH,
});
