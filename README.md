
This is a fork of the vanilla Javascript port of the Text-To-Speech (TTS) software SAM (Software Automatic Mouth) for the Commodore C64, originally published in 1982 by Don't Ask Software (now SoftVoice, Inc.). The original Javascript project is located at https://github.com/discordier/sam.
This fork adapts SAM to support Cyrillic text input, enabling text-to-speech functionality for Russian while preserving the core functionality of the original project.
It is based on the adaption to C by Stefan Macke and the refactorings by Vidar Hokstad and 8BitPimp.
It includes a Text-To-Phoneme converter called reciter and a Phoneme-To-Speech routine for the final output, with modifications to handle Cyrillic characters.
It aims for low memory impact and file size, avoiding the Emscripten conversion by Stefan (which weighs about 414kb).
For further details, refer to retrobits.net.
Some analytics of S.A.M. in general can be found in Artyom Skrobov's (@tyomitch) blog, who also provided insightful PRs. Visit his blog https://habr.com/ru/post/500764/ (Russian) or the Google-translated version here.
Usage
Require the module via yarn: yarn add sam-js
Use it in your program:
import SamJs from 'sam-js';

let sam = new SamJs();

// Play "Привет, мир!" (Hello, world! in Russian) over the speaker.
// This returns a Promise resolving after playback has finished.
sam.speak('Привет, мир!');

// Generate a wave file containing "Привет, мир!" and download it.
sam.download('Привет, мир!');

// Render the passed text as 8bit wave buffer array (Uint8Array).
const buf8 = sam.buf8('Привет, мир!');

// Render the passed text as 32bit wave buffer array (Float32Array).
const buf32 = sam.buf32('Привет, мир!');

Typical voice values
DESCRIPTION          SPEED     PITCH     THROAT    MOUTH
Elf                   72        64        110       160
Little Robot          92        60        190       190
Stuffy Guy            82        72        110       105
Little Old Lady       82        32        145       145
Extra-Terrestrial    100        64        150       200
SAM                   72        64        128       128

Original docs
A copy of the original manual is bundled in this repository, see the manual file in the docs directory.
License
The software is a reverse-engineered version of a commercial software published more than 30 years ago. The current copyright holder is SoftVoice, Inc. (www.text2speech.com).
Attempts to contact the company have failed. The website was last updated in 2009. The status of the original software can therefore best be described as Abandonware (http://en.wikipedia.org/wiki/Abandonware).
As long as this is the case, I cannot put my code under any specific open source software license. Use it at your own risk.
