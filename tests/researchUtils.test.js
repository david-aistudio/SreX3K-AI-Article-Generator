import { saveResearchResult, getResearchHistory } from '../src/utils/researchUtils.js';
import fs from 'fs';
import path from 'path';

// Mock filesystem operations
jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    readdir: jest.fn()
  }
}));

describe('researchUtils', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('saveResearchResult', () => {
    it('should save research result to file', async () => {
      // Arrange
      const query = 'test topic';
      const content = '# Test Article\n\nThis is a test article.';
      fs.promises.writeFile.mockResolvedValue();

      // Act
      const filepath = await saveResearchResult(query, content);

      // Assert
      expect(filepath).toMatch(/articles\/research_test_topic_\d+\.md/);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringMatching(/articles\/research_test_topic_\d+\.md/),
        content
      );
    });

    it('should handle special characters in query', async () => {
      // Arrange
      const query = 'test@topic#1';
      const content = '# Test Article\n\nThis is a test article.';
      fs.promises.writeFile.mockResolvedValue();

      // Act
      const filepath = await saveResearchResult(query, content);

      // Assert
      expect(filepath).toMatch(/articles\/research_test_topic_1_\d+\.md/);
    });
  });

  describe('getResearchHistory', () => {
    it('should return empty array when articles directory does not exist', async () => {
      // Arrange
      fs.promises.readdir.mockRejectedValue(new Error('ENOENT: no such file or directory'));

      // Act
      const history = await getResearchHistory();

      // Assert
      expect(history).toEqual([]);
    });

    it('should return research files with metadata', async () => {
      // Arrange
      const mockFiles = [
        'research_ai_trends_1234567890.md',
        'research_machine_learning_9876543210.md'
      ];
      fs.promises.readdir.mockResolvedValue(mockFiles);

      // Act
      const history = await getResearchHistory();

      // Assert
      expect(history).toHaveLength(2);
      expect(history[0]).toEqual({
        filename: 'research_ai_trends_1234567890.md',
        query: 'ai trends',
        timestamp: new Date(1234567890)
      });
      expect(history[1]).toEqual({
        filename: 'research_machine_learning_9876543210.md',
        query: 'machine learning',
        timestamp: new Date(9876543210)
      });
    });
  });
});