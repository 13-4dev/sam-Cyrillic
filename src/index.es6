import {PlayBuffer, RenderBuffer} from './util/player.es6'
import {TextToPhonemes} from './reciter/reciter.es6';
import {SamProcess, SamBuffer} from './sam/sam.es6';
import { ToWavBuffer } from './util/player.es6';
import { convertToPhonemes, getLanguageSettings } from './languages/index.es6';

const convert = TextToPhonemes;
const buf8 = SamProcess;
const buf32 = SamBuffer;

/**
 * @param {object}  [options]
 * @param {Boolean} [options.phonetic] Default false.
 * @param {Boolean} [options.singmode] Default false.
 * @param {Boolean} [options.debug]    Default false.
 * @param {Number}  [options.pitch]    Default 64.
 * @param {Number}  [options.speed]    Default 72.
 * @param {Number}  [options.mouth]    Default 128.
 * @param {Number}  [options.throat]   Default 128.
 * @param {String}  [options.language] Default 'en'.
 *
 * @constructor
 */
function SamJs (options) {
  const opts = options || {};
  const language = opts.language || 'en';
  
  // Get language-specific settings
  const langSettings = getLanguageSettings(language);
  
  // Merge language settings with user options
  const settings = {
    ...langSettings,
    ...opts
  };

  const ensurePhonetic = (text, phonetic) => {
    console.log('Input text:', text);
    console.log('Language:', language);
    console.log('Phonetic flag:', phonetic || opts.phonetic);
    
    if (!(phonetic || opts.phonetic)) {
      // Use language-specific conversion if available
      if (language !== 'en') {
        try {
          const result = convertToPhonemes(text, language);
          console.log('Converted phonemes:', result);
          return result;
        } catch (e) {
          console.error('Error converting text to phonemes:', e);
          return convert(text); // Fallback to English conversion
        }
      }
      return convert(text);
    }
    return text.toUpperCase();
  }

  /**
   * Render the passed text as 8bit wave buffer array.
   *
   * @param {string}  text       The text to render or phoneme string.
   * @param {boolean} [phonetic] Flag if the input text is already phonetic data.
   *
   * @return {Uint8Array|Boolean}
   */
  this.buf8 = (text, phonetic) => {
    const phonemes = ensurePhonetic(text, phonetic);
    console.log('Final phonemes for buf8:', phonemes);
    return buf8(phonemes, settings);
  }

  /**
   * Render the passed text as 32bit wave buffer array.
   *
   * @param {string}  text       The text to render or phoneme string.
   * @param {boolean} [phonetic] Flag if the input text is already phonetic data.
   *
   * @return {Float32Array|Boolean}
   */
  this.buf32 = (text, phonetic) => buf32(ensurePhonetic(text, phonetic), settings);

  /**
   * Render the passed text as wave buffer and play it over the speakers.
   *
   * @param {string}  text       The text to render or phoneme string.
   * @param {boolean} [phonetic] Flag if the input text is already phonetic data.
   *
   * @return {Promise}
   */
  this.speak = (text, phonetic) => PlayBuffer(this.buf32(text, phonetic));

  /**
   * Render the passed text as wave buffer and download it via URL API.
   *
   * @param {string}  text       The text to render or phoneme string.
   * @param {boolean} [phonetic] Flag if the input text is already phonetic data.
   *
   * @return void
   */
  this.download = (text, phonetic) => {
    RenderBuffer(this.buf8(text, phonetic));
  }

  /**
   * Render the passed text as wave buffer array.
   * 
   * @param {string}  text       The text to render or phoneme string.
   * @param {boolean} [phonetic] Flag if the input text is already phonetic data.
   * 
   * @return {Uint8Array|false}
   */
  this.wav = (text, phonetic) => ToWavBuffer(this.buf8(text, phonetic));
}

SamJs.buf8 = buf8;
SamJs.buf32 = buf32;
SamJs.convert = convert;

export default SamJs;
