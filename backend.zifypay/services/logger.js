// Utility function for consistent logging
export const logger = {
  info: (operation, message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO] [${operation}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  error: (operation, message, error = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR] [${operation}] ${message}`);
    if (error) {
      console.error(`[${timestamp}] [ERROR] [${operation}] Error Details:`, {
        message: error.message,
        stack: error.stack,
        response: error?.response?.data,
        status: error?.response?.status,
        code: error.code
      });
    }
  },
  debug: (operation, step, data) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [DEBUG] [${operation}] ${step}:`, JSON.stringify(data, null, 2));
  },
  warn: (operation, message, data = null) => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] [WARN] [${operation}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }
};