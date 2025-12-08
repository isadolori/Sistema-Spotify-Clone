// Por enquanto apenas avança. Futuramente validará o JWT do User Service.
const authMiddleware = (req, res, next) => {
  // TODO: Implementar validação de JWT aqui quando o User Service estiver pronto
  // Exemplo futuro: const token = req.headers.authorization...
  
  // Simula um usuário logado para testes
  req.user = { id: 'temp-user-id', role: 'user' };
  
  next();
};

module.exports = authMiddleware;