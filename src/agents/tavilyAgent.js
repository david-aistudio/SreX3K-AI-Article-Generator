import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TAVILY_CONFIG } from '../config/tavilyConfig.js';
import { CUSTOM_PROMPTS } from '../config/prompts.js';
import { TavilySearchError, ArticleGenerationError } from '../errors/index.js';
import { logger } from '../utils/logger.js';

// Tavily Search API
async function searchWithTavily(query) {
  try {
    logger.info(`Searching Tavily for query: ${query}`);
    
    const response = await axios.post(TAVILY_CONFIG.API_URL, {
      api_key: process.env.TAVILY_API_KEY,
      query: query,
      ...TAVILY_CONFIG.DEFAULT_PARAMS
    });
    
    logger.debug(`Tavily search returned ${response.data.results?.length || 0} results`);
    return response.data;
  } catch (error) {
    logger.error(`Tavily search failed: ${error.message}`);
    throw new TavilySearchError('Tavily search failed: ' + error.message, error);
  }
}

// Generate comprehensive article using Gemini
async function generateComprehensiveArticle(topic, researchData, promptType = 'default') {
  try {
    logger.info(`Generating article for topic: ${topic} with prompt type: ${promptType}`);
    
    // Check if API key is provided
    if (!process.env.GOOGLE_AI_API_KEY) {
      logger.error('GOOGLE_AI_API_KEY is not set in environment variables');
      throw new ArticleGenerationError('GOOGLE_AI_API_KEY is not set in environment variables');
    }
    
    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    // Format research data more efficiently
    let formattedResearch = `# Research on: ${topic}

`;
    
    if (researchData.answer) {
      formattedResearch += `## Key Answer
${researchData.answer}

`;
    }
    
    formattedResearch += '## Research Sources\n';
    researchData.results.slice(0, 3).forEach((result, index) => {
      formattedResearch += `${index + 1}. ${result.title}
`;
      formattedResearch += `   Content: ${result.content.substring(0, 300)}...
`;
      formattedResearch += `   URL: ${result.url}

`;
    });
    
    // Get the appropriate prompt
    const promptTemplate = CUSTOM_PROMPTS[promptType] || CUSTOM_PROMPTS.default;
    const prompt = promptTemplate
      .replace('{topic}', topic)
      .replace('{researchData}', formattedResearch);
    
    logger.debug(`Sending prompt to Gemini AI with ${prompt.length} characters`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    logger.info(`Article generation completed, response length: ${response.text().length} characters`);
    return response.text();
  } catch (error) {
    logger.error(`Article generation failed: ${error.message}`);
    throw new ArticleGenerationError('Article generation failed: ' + error.message, error);
  }
}

// Main function - optimized for speed
async function researchAndGenerateArticle(topic, promptType = 'default') {
  try {
    logger.info(`Starting research and article generation for topic: ${topic}`);
    
    // Validate input
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      logger.error('Invalid topic provided');
      throw new ArticleGenerationError('Topic must be a non-empty string');
    }
    
    // Step 1: Search using Tavily
    const researchData = await searchWithTavily(topic);
    
    // Step 2: Generate article using Gemini
    const article = await generateComprehensiveArticle(topic, researchData, promptType);
    
    // Step 3: Add sources section
    let finalArticle = article + '\n\n## Sources\n';
    researchData.results.slice(0, 3).forEach((source, index) => {
      finalArticle += `[${index + 1}] [${source.title}](${source.url})
`;
    });
    
    logger.info(`Research and article generation completed successfully`);
    return finalArticle;
  } catch (error) {
    logger.error(`Research and article generation failed: ${error.message}`);
    throw new ArticleGenerationError('Research and article generation failed: ' + error.message, error);
  }
}

export { researchAndGenerateArticle };