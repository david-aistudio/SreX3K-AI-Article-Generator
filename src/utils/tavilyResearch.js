const axios = require('axios');

// Tavily Search API
async function searchWithTavily(query) {
  try {
    const response = await axios.post('https://api.tavily.com/search', {
      api_key: process.env.TAVILY_API_KEY || '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',
      query: query,
      search_depth: "advanced",
      include_answer: true,
      include_images: false,
      include_raw_content: false,
      max_results: 5,
      include_domains: [],
      exclude_domains: []
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Tavily search failed: ' + error.message);
  }
}

// Research agent with Tavily
async function researchWithTavily(query) {
  try {
    // Search using Tavily
    const searchData = await searchWithTavily(query);
    
    // Format results
    const results = searchData.results.map((result, index) => ({
      id: index + 1,
      title: result.title,
      url: result.url,
      content: result.content,
      score: result.score
    }));
    
    // Include answer if available
    const answer = searchData.answer || '';
    
    return {
      query: query,
      answer: answer,
      results: results,
      response_time: searchData.response_time
    };
  } catch (error) {
    throw new Error('Research failed: ' + error.message);
  }
}

module.exports = { researchWithTavily, searchWithTavily };