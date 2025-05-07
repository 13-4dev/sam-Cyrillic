// Russian phonetic alphabet mapping using SAM's phoneme set
const russianPhonemes = {
  // Vowels (lowercase and uppercase)
  'а': 'AA', 'А': 'AA',   // as in "father"
  'я': 'Y*AA', 'Я': 'Y*AA', // as in "yard" - using Y* + AA
  'о': 'OW', 'О': 'OW',   // as in "go"
  'ё': 'Y*OW', 'Ё': 'Y*OW', // as in "you" - using Y* + OW
  'у': 'UW', 'У': 'UW',   // as in "boot"
  'ю': 'Y*UW', 'Ю': 'Y*UW', // as in "you" - using Y* + UW
  'э': 'EH', 'Э': 'EH',   // as in "bed"
  'е': 'Y*EH', 'Е': 'Y*EH', // as in "yes" - using Y* + EH
  'и': 'IY', 'И': 'IY',   // as in "see"
  'ы': 'IH', 'Ы': 'IH',   // as in "bit"
  
  // Consonants (lowercase and uppercase)
  'б': 'B*', 'Б': 'B*',   // as in "bad"
  'в': 'V*', 'В': 'V*',   // as in "van"
  'г': 'G*', 'Г': 'G*',   // as in "go"
  'д': 'D*', 'Д': 'D*',   // as in "day"
  'ж': 'ZH', 'Ж': 'ZH',   // as in "measure"
  'з': 'Z*', 'З': 'Z*',   // as in "zoo"
  'й': 'Y*', 'Й': 'Y*',   // as in "yes"
  'к': 'K*', 'К': 'K*',   // as in "key"
  'л': 'L*', 'Л': 'L*',   // as in "let"
  'м': 'M*', 'М': 'M*',   // as in "me"
  'н': 'N*', 'Н': 'N*',   // as in "no"
  'п': 'P*', 'П': 'P*',   // as in "pay"
  'р': 'R*', 'Р': 'R*',   // as in "red"
  'с': 'S*', 'С': 'S*',   // as in "see"
  'т': 'T*', 'Т': 'T*',   // as in "tea"
  'ф': 'F*', 'Ф': 'F*',   // as in "fee"
  'х': 'HH', 'Х': 'HH',   // as in "he"
  'ц': 'T*S*', 'Ц': 'T*S*', // as in "cats" - using T* + S*
  'ч': 'CH', 'Ч': 'CH',   // as in "chew"
  'ш': 'SH', 'Ш': 'SH',   // as in "she"
  'щ': 'SH', 'Щ': 'SH',   // as in "she" (simplified)
  
  // Special cases
  'ь': '', 'Ь': '',       // Soft sign (silent)
  'ъ': '', 'Ъ': '',       // Hard sign (silent)
};

// Russian stress rules using SAM's phoneme set
const russianStressRules = [
  // Basic stress patterns - using SAM's format
  ' (А)=AA4', ' (Я)=Y*AA4', ' (О)=OW4', ' (Ё)=Y*OW4', ' (У)=UW4', ' (Ю)=Y*UW4', ' (Э)=EH4', ' (Е)=Y*EH4', ' (И)=IY4', ' (Ы)=IH4',
  
  // Consonant clusters
  ' (ЖЧ)=SH', ' (Щ)=SH',
  
  // Soft consonants
  ' (Ь)=', ' (Ъ)=',
];

// Russian language-specific settings
const russianSettings = {
  pitch: 64,    // Slightly lower pitch for Russian
  speed: 72,    // Standard speed
  mouth: 128,   // Standard mouth
  throat: 128,  // Standard throat
};

export {
  russianPhonemes,
  russianStressRules,
  russianSettings
}; 