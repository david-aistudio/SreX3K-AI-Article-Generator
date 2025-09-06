// Tavily Search API Configuration
const TAVILY_CONFIG = {
  API_URL: 'https://api.tavily.com/search',
  DEFAULT_PARAMS: {
    search_depth: "advanced",
    include_answer: true,
    include_images: false,
    include_raw_content: false,
    max_results: 5
  }
};

module.exports = { TAVILY_CONFIG };