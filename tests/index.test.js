import { researchAndGenerateArticle } from '../src/agents/tavilyAgent.js';
import { saveResearchResult } from '../src/utils/researchUtils.js';

// Mock the external dependencies
jest.mock('../src/agents/tavilyAgent.js');
jest.mock('../src/utils/researchUtils.js');

// Mock chalk to avoid issues with ESM in tests
jest.mock('chalk', () => ({
  blue: {
    bold: jest.fn((str) => str)
  },
  yellow: {
    bold: jest.fn((str) => str)
  },
  green: jest.fn((str) => str),
  red: jest.fn((str) => str),
  cyan: jest.fn((str) => str),
  gray: jest.fn((str) => str)
}));

// Import after mocks are set up
const { main } = require('../index.js');

describe('index.js', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock console.log and console.error to prevent output during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock process.exit
    jest.spyOn(process, 'exit').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    console.log.mockRestore();
    console.error.mockRestore();
    process.exit.mockRestore();
  });

  describe('main function', () => {
    it('should show error when no topic is provided', async () => {
      // Arrange
      const originalArgv = process.argv;
      process.argv = ['node', 'index.js'];

      // Act
      await main();

      // Assert
      expect(console.error).toHaveBeenCalledWith('Please provide a topic');
      expect(process.exit).toHaveBeenCalledWith(1);

      // Restore
      process.argv = originalArgv;
    });

    it('should generate article when topic is provided', async () => {
      // Arrange
      const originalArgv = process.argv;
      process.argv = ['node', 'index.js', 'test', 'topic'];
      
      const mockArticle = '# Test Article\n\nThis is a test article.';
      const mockFilename = 'articles/research_test_topic_1234567890.md';
      
      researchAndGenerateArticle.mockResolvedValue(mockArticle);
      saveResearchResult.mockResolvedValue(mockFilename);

      // Act
      await main();

      // Assert
      expect(researchAndGenerateArticle).toHaveBeenCalledWith('test topic');
      expect(saveResearchResult).toHaveBeenCalledWith('test topic', mockArticle);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Article generation completed'));

      // Restore
      process.argv = originalArgv;
    });

    it('should handle errors during article generation', async () => {
      // Arrange
      const originalArgv = process.argv;
      process.argv = ['node', 'index.js', 'test', 'topic'];
      
      researchAndGenerateArticle.mockRejectedValue(new Error('API error'));

      // Act
      await main();

      // Assert
      expect(console.error).toHaveBeenCalledWith('❌ Article generation failed:', 'API error');

      // Restore
      process.argv = originalArgv;
    });
  });
});