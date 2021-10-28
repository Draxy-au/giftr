import axios from 'axios';
import '../constants/api';
import { API_BASE } from '../constants/api';

export default axios.create({
  baseURL: API_BASE,
});
