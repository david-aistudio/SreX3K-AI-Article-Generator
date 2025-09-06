#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { researchAndGenerateArticle } from './src/agents/tavilyAgent.js';
import { saveResearchResult, getResearchHistory } from './src/utils/researchUtils.js';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';
import { ArticleGenerationError, TavilySearchError, FileSaveError, ConfigurationError } from './src/errors/index.js';

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

// Generate article command
async function generateArticle(topic, format = 'md', promptType = 'default') {
  showWelcome();
  
  if (!topic) {
    console.log(chalk.red('Please provide a topic'));
    console.log(chalk.yellow('Usage: node cli.js generate "your topic here"'));
    return;
  }
  
  console.log(chalk.cyan('📝 Topic:'), chalk.yellow(topic));
  console.log(chalk.cyan('🖊️  Prompt Style:'), chalk.yellow(promptType));
  console.log(chalk.cyan('📄 Format:'), chalk.yellow(format));
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
    const article = await researchAndGenerateArticle(topic, promptType);
    
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
    const filename = await saveResearchResult(topic, article, format);
    console.log(chalk.green(`\n📁 Article saved to: ${filename}`));
    
    console.log(chalk.blue.bold('\n====================================='));
    console.log(chalk.green('🎉 AI Article Generation Completed!'));
    console.log(chalk.blue.bold('====================================='));
    
  } catch (error) {
    console.error(chalk.red('❌ Article generation failed:'), error.message);
    
    // Provide more detailed error information
    if (error.cause) {
      console.error(chalk.gray('Caused by:'), error.cause.message);
    }
    
    // Special handling for specific error types
    if (error instanceof ConfigurationError) {
      console.error(chalk.yellow('\n🔧 Configuration Issue:'));
      console.error(chalk.yellow('Please check your environment variables and configuration files.'));
    } else if (error instanceof TavilySearchError) {
      console.error(chalk.yellow('\n🔍 Search Issue:'));
      console.error(chalk.yellow('Please check your Tavily API key and internet connection.'));
    } else if (error instanceof ArticleGenerationError) {
      console.error(chalk.yellow('\n🧠 Generation Issue:'));
      console.error(chalk.yellow('Please check your Google AI API key and try again.'));
    } else if (error instanceof FileSaveError) {
      console.error(chalk.yellow('\n💾 Save Issue:'));
      console.error(chalk.yellow('Please check your file permissions and disk space.'));
    }
  }
}

// List articles command
async function listArticles() {
  showWelcome();
  console.log(chalk.cyan('📋 Listing all generated articles...\n'));
  
  try {
    const history = await getResearchHistory();
    
    if (history.length === 0) {
      console.log(chalk.yellow('No articles found.'));
      return;
    }
    
    console.log(chalk.blue.bold('Generated Articles:'));
    console.log(chalk.blue.bold('==================='));
    
    history.forEach((item, index) => {
      console.log(chalk.green(`${index + 1}. ${item.query}`));
      console.log(chalk.gray(`   File: ${item.filename}`));
      console.log(chalk.gray(`   Date: ${item.timestamp.toLocaleString()}`));
      console.log('');
    });
  } catch (error) {
    console.error(chalk.red('❌ Failed to list articles:'), error.message);
  }
}

// View article command
async function viewArticle(filename) {
  showWelcome();
  
  if (!filename) {
    console.log(chalk.red('Please provide a filename'));
    console.log(chalk.yellow('Usage: node cli.js view "filename.md"'));
    return;
  }
  
  try {
    const filepath = path.join('articles', filename);
    const content = await fs.readFile(filepath, 'utf8');
    
    console.log(chalk.blue.bold(`📄 Article: ${filename}`));
    console.log(chalk.blue.bold('=====================================\n'));
    console.log(content);
  } catch (error) {
    console.error(chalk.red('❌ Failed to view article:'), error.message);
  }
}

// CLI setup
yargs(hideBin(process.argv))
  .scriptName('article-gen')
  .usage('Usage: $0 <command> [options]')
  .command('generate <topic>', 'Generate an article on the given topic', (yargs) => {
    return yargs
      .positional('topic', {
        describe: 'The topic to generate an article about',
        type: 'string'
      })
      .option('format', {
        alias: 'f',
        describe: 'Output format (md, html, txt)',
        default: 'md',
        type: 'string'
      })
      .option('prompt', {
        alias: 'p',
        describe: 'Prompt style (default, academic, blog, news)',
        default: 'default',
        type: 'string'
      });
  }, (argv) => {
    generateArticle(argv.topic, argv.format, argv.prompt);
  })
  .command('list', 'List all generated articles', () => {}, () => {
    listArticles();
  })
  .command('view <filename>', 'View a generated article', (yargs) => {
    return yargs
      .positional('filename', {
        describe: 'The filename of the article to view',
        type: 'string'
      });
  }, (argv) => {
    viewArticle(argv.filename);
  })
  .command('help', 'Show help', () => {}, () => {
    yargs.showHelp();
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .alias('help', 'h')
  .argv;