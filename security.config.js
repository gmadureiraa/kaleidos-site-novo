/**
 * Configurações de Segurança - Kaleidos Digital
 * 
 * Este arquivo contém configurações adicionais de segurança
 * que podem ser aplicadas ao projeto.
 */

module.exports = {
  // Configurações de segurança para produção
  production: {
    // Headers de segurança adicionais
    securityHeaders: {
      'X-DNS-Prefetch-Control': 'off',
      'X-Download-Options': 'noopen',
      'X-Permitted-Cross-Domain-Policies': 'none',
    },
    
    // Configurações de CORS
    cors: {
      origin: ['https://kaleidos.com.br', 'https://www.kaleidos.com.br'],
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
    
    // Rate limiting
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // limite por IP
      message: 'Muitas requisições deste IP, tente novamente mais tarde.',
    },
  },
  
  // Configurações de desenvolvimento
  development: {
    securityHeaders: {
      'X-DNS-Prefetch-Control': 'off',
      'X-Download-Options': 'noopen',
    },
    
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
  
  // Configurações gerais de segurança
  general: {
    // Configurações de senha (se aplicável)
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
    
    // Configurações de sessão
    session: {
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    },
    
    // Configurações de JWT (se aplicável)
    jwt: {
      expiresIn: '1h',
      algorithm: 'HS256',
    },
  },
  
  // Lista de domínios permitidos
  allowedDomains: [
    'kaleidos.com.br',
    'www.kaleidos.com.br',
    'localhost',
    '127.0.0.1',
  ],
  
  // Lista de IPs bloqueados (se necessário)
  blockedIPs: [],
  
  // Configurações de monitoramento de segurança
  monitoring: {
    // Logs de segurança
    securityLogs: {
      enabled: true,
      level: 'info',
      file: 'security.log',
    },
    
    // Alertas de segurança
    alerts: {
      enabled: true,
      email: 'security@kaleidos.com.br',
    },
  },
}; 