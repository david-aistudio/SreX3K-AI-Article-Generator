// Simple logging utility
class Logger {
  constructor(level = 'info') {
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
    this.currentLevel = this.levels[level] || this.levels.info;
  }
  
  error(message) {
    if (this.currentLevel >= this.levels.error) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
  }
  
  warn(message) {
    if (this.currentLevel >= this.levels.warn) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }
  }
  
  info(message) {
    if (this.currentLevel >= this.levels.info) {
      console.info(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
  }
  
  debug(message) {
    if (this.currentLevel >= this.levels.debug) {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  }
  
  setLevel(level) {
    this.currentLevel = this.levels[level] || this.levels.info;
  }
}

// Create a default logger instance
const logger = new Logger(process.env.LOG_LEVEL || 'info');

export { Logger, logger };