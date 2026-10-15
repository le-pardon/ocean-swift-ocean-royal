export const LANGUAGES = [
  { code: "en", name: "English", native: "English", dir: "ltr" as const },
  { code: "as", name: "Assamese", native: "অসমীয়া", dir: "ltr" as const },
  { code: "bn", name: "Bengali", native: "বাংলা", dir: "ltr" as const },
  { code: "brx", name: "Bodo", native: "बर'", dir: "ltr" as const },
  { code: "doi", name: "Dogri", native: "डोगरी", dir: "ltr" as const },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", dir: "ltr" as const },
  { code: "hi", name: "Hindi", native: "हिन्दी", dir: "ltr" as const },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", dir: "ltr" as const },
  { code: "ks", name: "Kashmiri", native: "کٲشُر", dir: "rtl" as const },
  { code: "kok", name: "Konkani", native: "कोंकणी", dir: "ltr" as const },
  { code: "mai", name: "Maithili", native: "मैथिली", dir: "ltr" as const },
  { code: "ml", name: "Malayalam", native: "മലയാളം", dir: "ltr" as const },
  { code: "mni", name: "Manipuri", native: "ꯃꯤꯇꯩꯂꯣꯟ", dir: "ltr" as const },
  { code: "mr", name: "Marathi", native: "मराठी", dir: "ltr" as const },
  { code: "ne", name: "Nepali", native: "नेपाली", dir: "ltr" as const },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ", dir: "ltr" as const },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", dir: "ltr" as const },
  { code: "sa", name: "Sanskrit", native: "संस्कृतम्", dir: "ltr" as const },
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ", dir: "ltr" as const },
  { code: "sd", name: "Sindhi", native: "سنڌي", dir: "rtl" as const },
  { code: "ta", name: "Tamil", native: "தமிழ்", dir: "ltr" as const },
  { code: "te", name: "Telugu", native: "తెలుగు", dir: "ltr" as const },
  { code: "ur", name: "Urdu", native: "اردو", dir: "rtl" as const },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export function langMeta(code: string) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;600;700&family=Outfit:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600&family=Noto+Sans+Bengali:wght@400;500;600&family=Noto+Sans+Tamil:wght@400;500;600&family=Noto+Sans+Telugu:wght@400;500;600&family=Noto+Sans+Kannada:wght@400;500;600&family=Noto+Sans+Malayalam:wght@400;500;600&family=Noto+Sans+Gujarati:wght@400;500;600&family=Noto+Sans+Gurmukhi:wght@400;500;600&family=Noto+Sans+Oriya:wght@400;500;600&family=Noto+Naskh+Arabic:wght@400;500;700&family=Noto+Sans+Meetei+Mayek:wght@400;500;700&family=Noto+Sans+Ol+Chiki:wght@400;500;700&display=swap";
