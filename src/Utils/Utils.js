import axios from 'axios'

export default async function validaCEP(cep) {
  const baseURL = `http://viacep.com.br/ws/${cep}/json/`
    const api = axios.create({
    baseURL: baseURL
  })    
  return await api.get('');
}