export const startSpeechRecognition = (languageCode = 'en-IN', onResult, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = languageCode;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.start();
  return recognition;
};

// Clean up text for speech (remove markdown, symbols, etc.)
const sanitizeTextForSpeech = (text) => {
  return text
    .replace(/[*_~`>#]/g, '')         // remove markdown-like symbols
    .replace(/[^\p{L}\p{N}\s.,!?]/gu, '') // remove emojis/specials except punctuation
    .replace(/\s+/g, ' ')             // normalize whitespace
    .trim();
};

export const speakText = (text, languageCode = "en-IN") => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(sanitizeTextForSpeech(text));
  utterance.lang = languageCode;

  const voices = synth.getVoices();

  const matchedVoice = voices.find(voice =>
    voice.lang.toLowerCase().startsWith(languageCode.toLowerCase())
  );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  // Fallback voice check
  if (!utterance.voice && voices.length > 0) {
    utterance.voice = voices[0];
  }

  synth.cancel(); // Stop any ongoing speech before starting new
  synth.speak(utterance);
};
