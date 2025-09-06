import { researchAndGenerateArticle } from '../src/agents/tavilyAgent.js';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock axios and GoogleGenerativeAI
jest.mock('axios');
jest.mock('@google/generative-ai');

describe('tavilyAgent', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('researchAndGenerateArticle', () => {
    it('should generate article from research data', async () => {
      // Arrange
      const topic = 'test topic';
      const mockResearchData = {
        answer: 'This is a key answer',
        results: [
          {
            title: 'Test Source 1',
            content: 'This is content from source 1',
            url: 'https://example.com/1'
          },
          {
            title: 'Test Source 2',
            content: 'This is content from source 2',
            url: 'https://example.com/2'
          }
        ]
      };

      const mockArticleResponse = {
        text: () => 'This is a generated article with sources.'
      };

      const mockResponse = {
        data: mockResearchData
      };

      axios.post.mockResolvedValue(mockResponse);
      
      // Mock GoogleGenerativeAI
      const mockModel = {
        generateContent: jest.fn().mockResolvedValue({
          response: mockArticleResponse
        })
      };
      
      const mockGenAI = {
        getGenerativeModel: jest.fn().mockReturnValue(mockModel)
      };
      
      GoogleGenerativeAI.mockImplementation(() => mockGenAI);

      // Act
      const article = await researchAndGenerateArticle(topic);

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.tavily.com/search',
        expect.objectContaining({
          api_key: undefined, // process.env.TAVILY_API_KEY is not set in test
          query: topic
        })
      );
      
      expect(GoogleGenerativeAI).toHaveBeenCalledWith(undefined); // process.env.GOOGLE_AI_API_KEY is not set
      expect(mockGenAI.getGenerativeModel).toHaveBeenCalledWith({ model: "gemini-1.5-flash" });
      expect(mockModel.generateContent).toHaveBeenCalled();
      expect(article).toContain('This is a generated article with sources.');
      expect(article).toContain('## Sources');
    });

    it('should handle research errors', async () => {
      // Arrange
      const topic = 'test topic';
      axios.post.mockRejectedValue(new Error('Tavily API error'));

      // Act & Assert
      await expect(researchAndGenerateArticle(topic)).rejects.toThrow('Research and article generation failed');
    });
  });
});