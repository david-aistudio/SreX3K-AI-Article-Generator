// Custom error classes for better error handling
class ArticleGenerationError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'ArticleGenerationError';
    this.cause = cause;
  }
}

class TavilySearchError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'TavilySearchError';
    this.cause = cause;
  }
}

class FileSaveError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'FileSaveError';
    this.cause = cause;
  }
}

class ConfigurationError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'ConfigurationError';
    this.cause = cause;
  }
}

export { 
  ArticleGenerationError, 
  TavilySearchError, 
  FileSaveError, 
  ConfigurationError 
};