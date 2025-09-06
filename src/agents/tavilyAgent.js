const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { TAVILY_CONFIG } = require('../config/tavilyConfig');

// Tavily Search API
async function searchWithTavily(query) {
  try {
    const response = await axios.post(TAVILY_CONFIG.API_URL, {
      api_key: process.env.TAVILY_API_KEY,
      query: query,
      ...TAVILY_CONFIG.DEFAULT_PARAMS
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Tavily search failed: ' + error.message);
  }
}

// Generate comprehensive article using Gemini
async function generateComprehensiveArticle(topic, researchData) {
  try {
    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    // Format research data more efficiently
    let formattedResearch = `# Research on: ${topic}\n\n`;
    
    if (researchData.answer) {
      formattedResearch += `## Key Answer\n${researchData.answer}\n\n`;
    }
    
    formattedResearch += '## Research Sources\n';
    researchData.results.slice(0, 3).forEach((result, index) => {
      formattedResearch += `${index + 1}. ${result.title}\n`;
      formattedResearch += `   Content: ${result.content.substring(0, 300)}...\n`;
      formattedResearch += `   URL: ${result.url}\n\n`;
    });
    
    // Efficient prompt for comprehensive article
    const prompt = `
You are an expert AI article writer. Using the research data below, create a comprehensive article on "${topic}".

RESEARCH DATA:
${formattedResearch}

INSTRUCTIONS:
Write a complete, well-structured article that:
1. Has a compelling title
2. Includes an informative introduction
3. Provides detailed analysis in 3-4 main sections
4. Discusses real-world applications and examples
5. Addresses challenges and opportunities
6. Concludes with actionable insights
7. Is approximately 1000-1500 words
8. Uses professional but accessible language
9. Cites sources as [1], [2], [3]

FORMAT YOUR RESPONSE AS A COMPLETE MARKDOWN ARTICLE WITH PROPER HEADINGS.
`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    throw new Error('Article generation failed: ' + error.message);
  }
}

// Main function - optimized for speed
async function researchAndGenerateArticle(topic) {
  try {
    // Step 1: Search using Tavily
    const researchData = await searchWithTavily(topic);
    
    // Step 2: Generate article using Gemini
    const article = await generateComprehensiveArticle(topic, researchData);
    
    // Step 3: Add sources section
    let finalArticle = article + '\n\n## Sources\n';
    researchData.results.slice(0, 3).forEach((source, index) => {
      finalArticle += `[${index + 1}] [${source.title}](${source.url})\n`;
    });
    
    return finalArticle;
  } catch (error) {
    throw new Error('Research and article generation failed: ' + error.message);
  }
}

module.exports = { researchAndGenerateArticle };