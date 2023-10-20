// import React, { useState } from 'react';
// import axios from 'axios';

// const TextToSpeech = () => {
//   const [text, setText] = useState('');
//   const apikey = '0tuCOwWwNb02Z5jdgadEUtX89y-bYgqn34ikTXdsCNTT';
//   const endpoint = 'https://api.jp-tok.text-to-speech.watson.cloud.ibm.com/instances/630788a2-77e9-46c6-a763-32a7ee187ec9/v1/synthesize?voice=en-US_MichaelV3Voice';

//   const handleTextToSpeech = async () => {
//     try {
//       const response = await axios.post(endpoint, {
//         text: text,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'audio/wav',
//           'Authorization': `Basic ${btoa(`apikey:${apikey}`)}`,
//         },
//         responseType: 'blob',
//       });

//       const audioUrl = window.URL.createObjectURL(new Blob([response.data]));
//       const audio = new Audio(audioUrl);
//       audio.play();
//     } catch (error) {
//       console.error('Error converting text to speech:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter text to convert to speech"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button onClick={handleTextToSpeech}>Convert to Speech</button>
//     </div>
//   );
// };

// export default TextToSpeech;

import React, { useState } from 'react';
import axios from 'axios';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const apikey = 'Xn6e4k6u35WNhyDG8KKd5E-CWjrOq4kVivWIyZ0E5Kbu';
  const endpoint = 'https://api.jp-tok.speech-to-text.watson.cloud.ibm.com/instances/e8c36ea5-056e-445f-8ff0-25197a769be8';

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.push(e.data);
          }
        };
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

          // Transcribe audio
          transcribeAudio(audioBlob);
          setRecording(false);
        };
        mediaRecorder.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error('Error starting audio recording:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const transcribeAudio = (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    axios.post(`${endpoint}/v1/recognize`, formData, {
      headers: {
        'Content-Type': 'audio/wav',
        'Authorization': `Basic ${btoa(`apikey:${apikey}`)}`,
      },
    })
      .then((response) => {
        const transcript = response.data.results[0].alternatives[0].transcript;
        setTranscript(transcript);
      })
      .catch((error) => {
        console.error('Error transcribing audio:', error);
      });
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div>
        <p>Transcript: {transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;

