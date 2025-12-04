/**
 * Serviço de Pagamento - Comunicação com o microsserviço de pagamentos
 * Responsável por gerenciamento de planos, assinaturas e pagamentos
 */

import apiService from './api.service';
import { MICROSERVICES } from '../config/api.config';

const BASE_URL = MICROSERVICES.PAYMENT_SERVICE.BASE_URL;
const ENDPOINTS = MICROSERVICES.PAYMENT_SERVICE.ENDPOINTS;

class PaymentService {
  /**
   * Listar todos os planos disponíveis
   */
  async listPlans(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.PLANS}${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Obter detalhes de um plano
   */
  async getPlanById(planId) {
    const url = `${BASE_URL}${ENDPOINTS.PLANS}/${planId}`;
    return apiService.get(url);
  }

  /**
   * Obter informações da assinatura atual
   */
  async getCurrentSubscription() {
    const url = `${BASE_URL}${ENDPOINTS.SUBSCRIPTIONS}/current`;
    return apiService.get(url);
  }

  /**
   * Criar nova assinatura
   */
  async createSubscription(planId, paymentMethodId) {
    const url = `${BASE_URL}${ENDPOINTS.SUBSCRIPTIONS}`;
    return apiService.post(url, { planId, paymentMethodId });
  }

  /**
   * Upgrade de assinatura
   */
  async upgradeSubscription(planId) {
    const url = `${BASE_URL}${ENDPOINTS.SUBSCRIPTIONS}/upgrade`;
    return apiService.post(url, { planId });
  }

  /**
   * Downgrade de assinatura
   */
  async downgradeSubscription(planId) {
    const url = `${BASE_URL}${ENDPOINTS.SUBSCRIPTIONS}/downgrade`;
    return apiService.post(url, { planId });
  }

  /**
   * Cancelar assinatura
   */
  async cancelSubscription(reason = '') {
    const url = `${BASE_URL}${ENDPOINTS.SUBSCRIPTIONS}/cancel`;
    return apiService.post(url, { reason });
  }

  /**
   * Reativar assinatura cancelada
   */
  async reactivateSubscription() {
    const url = `${BASE_URL}${ENDPOINTS.SUBSCRIPTIONS}/reactivate`;
    return apiService.post(url);
  }

  /**
   * Obter histórico de pagamentos
   */
  async getPaymentHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.PAYMENTS}${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Obter detalhes de um pagamento
   */
  async getPaymentById(paymentId) {
    const url = `${BASE_URL}${ENDPOINTS.PAYMENTS}/${paymentId}`;
    return apiService.get(url);
  }

  /**
   * Processar pagamento
   */
  async processPayment(paymentData) {
    const url = `${BASE_URL}${ENDPOINTS.PAYMENTS}`;
    return apiService.post(url, paymentData);
  }

  /**
   * Atualizar método de pagamento
   */
  async updatePaymentMethod(paymentMethodData) {
    const url = `${BASE_URL}${ENDPOINTS.PAYMENTS}/method`;
    return apiService.put(url, paymentMethodData);
  }

  /**
   * Remover método de pagamento
   */
  async removePaymentMethod(paymentMethodId) {
    const url = `${BASE_URL}${ENDPOINTS.PAYMENTS}/method/${paymentMethodId}`;
    return apiService.delete(url);
  }

  /**
   * Obter faturas
   */
  async getInvoices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.PAYMENTS}/invoices${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Fazer download de fatura
   */
  async downloadInvoice(invoiceId) {
    const url = `${BASE_URL}${ENDPOINTS.PAYMENTS}/invoices/${invoiceId}/download`;
    return apiService.get(url);
  }
}

export default new PaymentService();
