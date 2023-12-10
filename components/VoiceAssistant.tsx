declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

import React, { useEffect, useState } from 'react';

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log('Voice is being recognized...');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      console.log(transcript);
    };

    recognition.start();
  }, []);

  return (
    <div>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceAssistant;