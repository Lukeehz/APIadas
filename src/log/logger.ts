// src/log/logger.ts
import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Define o diretório onde o arquivo de log será criado (mesmo diretório de logger.ts)
const logDir = __dirname; // Usando __dirname para pegar o diretório atual (onde o logger.ts está)

// Verifica se o diretório de logs existe e cria se não existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

// Criação do logger com o caminho correto para o arquivo de log
const logger = winston.createLogger({
  level: 'info', // Nível mínimo de log
  format: logFormat, // Formato de log
  transports: [
    new winston.transports.Console(), // Exibe no console
    new winston.transports.File({
      filename: path.join(logDir, 'apiadas.txt'), // O log será salvo diretamente no diretório onde o logger.ts está
      flags: 'a', // Adiciona logs ao arquivo (não sobrescreve)
    })
  ]
});

export default logger;
