/**
 * Context de Pagamento - Gerencia estado de planos, assinaturas e pagamentos
 * Centraliza dados de pagamento e status da assinatura
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import paymentService from '../services/payment.service';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPlans = useCallback(async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await paymentService.listPlans(params);
      setPlans(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCurrentSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const subscription = await paymentService.getCurrentSubscription();
      setCurrentSubscription(subscription);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPaymentHistory = useCallback(async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const history = await paymentService.getPaymentHistory(params);
      setPaymentHistory(history);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createSubscription = useCallback(async (planId, paymentMethodId) => {
    try {
      setIsLoading(true);
      setError(null);
      const subscription = await paymentService.createSubscription(planId, paymentMethodId);
      setCurrentSubscription(subscription);
      return subscription;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const upgradeSubscription = useCallback(async (planId) => {
    try {
      setIsLoading(true);
      setError(null);
      const subscription = await paymentService.upgradeSubscription(planId);
      setCurrentSubscription(subscription);
      return subscription;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downgradeSubscription = useCallback(async (planId) => {
    try {
      setIsLoading(true);
      setError(null);
      const subscription = await paymentService.downgradeSubscription(planId);
      setCurrentSubscription(subscription);
      return subscription;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelSubscription = useCallback(async (reason = '') => {
    try {
      setIsLoading(true);
      setError(null);
      const subscription = await paymentService.cancelSubscription(reason);
      setCurrentSubscription(subscription);
      return subscription;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    plans,
    currentSubscription,
    paymentHistory,
    isLoading,
    error,
    loadPlans,
    loadCurrentSubscription,
    loadPaymentHistory,
    createSubscription,
    upgradeSubscription,
    downgradeSubscription,
    cancelSubscription,
    clearError,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext deve ser usado dentro de PaymentProvider');
  }
  return context;
}
