import { useState } from 'react';
import axios from 'axios';
export default function AudioUploader() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:8080/v1/api/transcribe',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setTranscription(response.data);
    } catch (error) {
      console.log('error transcribing', error);
    }
  };
  return (
    <div className="container">
      <h1>Audio to Text Transcriber</h1>
      <div className="file-input">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <button onClick={handleUpload} className="upload-button">
        Upload and Transcribe
      </button>
      <div className="transcription-result">
        <h2>Transcription Result</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
}