import { russianPhonemes, russianStressRules, russianSettings } from '../reciter/russian.es6';

// Language definitions
const languages = {
  en: {
    name: 'English',
    phonemes: {}, // Default English phonemes
    rules: [],    // Default English rules
    settings: {
      pitch: 64,
      speed: 72,
      mouth: 128,
      throat: 128
    }
  },
  ru: {
    name: 'Russian',
    phonemes: russianPhonemes,
    rules: russianStressRules,
    settings: russianSettings
  }
};

// Convert text to phonemes based on language
const convertToPhonemes = (text, language = 'en') => {
  console.log('Starting phoneme conversion for language:', language);
  console.log('Input text:', text);
  
  const lang = languages[language];
  if (!lang) {
    console.error('Language not found:', language);
    throw new Error(`Language ${language} not supported`);
  }

  // First convert characters to their phoneme equivalents
  let result = text;
  if (lang.phonemes) {
    console.log('Applying phoneme mapping:', lang.phonemes);
    // Sort entries by key length (longest first) to handle multi-character phonemes correctly
    const entries = Object.entries(lang.phonemes).sort((a, b) => b[0].length - a[0].length);
    for (const [char, phoneme] of entries) {
      const before = result;
      // Escape special regex characters in the character
      const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(escapedChar, 'g'), phoneme);
      if (before !== result) {
        console.log(`Mapped ${char} to ${phoneme}`);
        console.log('Result after mapping:', result);
      }
    }
  }

  // Then apply stress rules
  if (lang.rules && lang.rules.length > 0) {
    console.log('Applying stress rules:', lang.rules);
    for (let rule of lang.rules) {
      const [pattern, replacement] = rule.split('=');
      const before = result;
      // Escape special regex characters in the pattern
      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(escapedPattern, 'g'), replacement);
      if (before !== result) {
        console.log(`Rule applied: ${pattern}=${replacement}`);
        console.log('Result after rule:', result);
      }
    }
  }

  // Remove any remaining non-phoneme characters
  let before = result;
  result = result.replace(/[^A-Z0-9*]/g, '');
  if (before !== result) {
    console.log('Cleaned non-phoneme characters');
    console.log('Final result:', result);
  }
  return result;
};

// Get language settings
const getLanguageSettings = (language = 'en') => {
  const lang = languages[language];
  if (!lang) {
    throw new Error(`Language ${language} not supported`);
  }
  return lang.settings;
};

export {
  languages,
  convertToPhonemes,
  getLanguageSettings
}; 