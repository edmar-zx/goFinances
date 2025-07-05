/*  --- CONEXÕES COM A API --- */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://00.00.000.000:3000/api/v1'
});

export async function getTransactions(year, month) {
  try {
    const response = await api.get('/transactions', {
      params: { year, month }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar transações:', error.message);
    throw error;
  }
}

export async function postTransaction(data) {
  try {
    const response = await api.post('/transactions', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar transação:', error.message);
    throw error;
  }
}

export async function getMonthlySummary(year, month) {
  try {
    const response = await api.get('/monthlySummary', {
      params: { year, month }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar resumo mensal:', error.message);
    throw error;
  }
}

export async function getResume(year: number, month: number, type: 'positive' | 'negative') {
  try {
    const response = await api.get('/resume', {
      params: { year, month, type: type === 'positive' ? 'entrada' : 'saida' }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar entradas por categoria:', error.message);
    throw error;
  }
}

export default api;