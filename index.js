#!/usr/bin/env node

// Import required modules
const chalk = require('chalk');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables
require('dotenv').config();

// Import Tavily research agent
const { researchAndGenerateArticle } = require('./src/agents/tavilyAgent');

// Import utils
const { saveResearchResult } = require('./src/utils/researchUtils');

// Welcome message
function showWelcome() {
  console.log(chalk.blue.bold('====================================='));
  console.log(chalk.blue.bold('  ██████  ██████       ██   ██ '));
  console.log(chalk.blue.bold('  ██   ██ ██   ██      ██  ██  '));
  console.log(chalk.blue.bold('  ██████  ██████       █████   '));
  console.log(chalk.blue.bold('  ██      ██   ██      ██  ██  '));
  console.log(chalk.blue.bold('  ██      ██   ██      ██   ██ '));
  console.log(chalk.blue.bold('====================================='));
  console.log(chalk.yellow.bold('  SreX3K AI Article Generator'));
  console.log(chalk.blue.bold('====================================='));
  console.log('');
}

// Custom progress indicator
function showProgress(step, total) {
  const percentage = Math.round((step / total) * 100);
  const barLength = 20;
  const filledLength = Math.round((barLength * step) / total);
  const emptyLength = barLength - filledLength;
  
  const bar = chalk.green('█').repeat(filledLength) + chalk.gray('░').repeat(emptyLength);
  process.stdout.write(`\r${chalk.cyan('Progress:')} [${bar}] ${percentage}% (${step}/${total})`);
}

// Main function
async function main() {
  showWelcome();
  
  // Get topic from command line arguments
  const topic = process.argv.slice(2).join(' ');
  
  if (!topic) {
    console.log(chalk.red('Please provide a topic'));
    console.log(chalk.yellow('Usage: node index.js "your topic here"'));
    process.exit(1);
  }
  
  console.log(chalk.cyan('📝 Topic:'), chalk.yellow(topic));
  console.log(chalk.green('\n🚀 Starting AI article generation process...\n'));
  
  try {
    // Show progress steps
    console.log(chalk.yellow('Step 1/3: Researching topic with Tavily...'));
    showProgress(1, 3);
    
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(chalk.yellow('\nStep 2/3: Generating comprehensive article with Gemini...'));
    showProgress(2, 3);
    
    // Generate the article
    const article = await researchAndGenerateArticle(topic);
    
    console.log(chalk.yellow('\nStep 3/3: Finalizing and saving article...'));
    showProgress(3, 3);
    console.log(chalk.green('\n✓ Article generation completed!'));
    
    // Display result
    console.log(chalk.blue.bold('\n====================================='));
    console.log(chalk.yellow.bold('GENERATED ARTICLE'));
    console.log(chalk.blue.bold('=====================================\n'));
    
    // Show first 1000 characters as preview
    const preview = article.substring(0, 1000) + '...\n\n[Article truncated. Full article saved to file]';
    console.log(preview);
    
    // Save to file
    const filename = await saveResearchResult(topic, article);
    console.log(chalk.green(`\n📁 Article saved to: ${filename}`));
    
    console.log(chalk.blue.bold('\n====================================='));
    console.log(chalk.green('🎉 AI Article Generation Completed!'));
    console.log(chalk.blue.bold('====================================='));
    
  } catch (error) {
    console.error(chalk.red('❌ Article generation failed:'), error.message);
  }
}

// Run the application
main();