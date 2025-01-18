import { useAudioStore } from "../../../stores/audio-store";
import "./audio-recorder.css";

import { useState, useRef } from "react";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false); // Kayıt durumu
  const [audioURL, setAudioURL] = useState(null); // Kaydedilen sesin URL'si
  const mediaRecorderRef = useRef(null); // MediaRecorder referansı
  const audioChunksRef = useRef([]); // Kaydedilen ses parçaları
  const { audio, addAudioToStore } = useAudioStore();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Mikrofon erişimi
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = []; // Yeni kayıt için parçaları sıfırla

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data); // Kaydedilen veriyi depola
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        addAudioToStore(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start(); // Kaydı başlat
      setIsRecording(true);
    } catch (error) {
      console.error("Mikrofon erişim hatası:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop(); // Kaydı durdur
    setIsRecording(false);
  };

  return (
    <div className="audioRecorder">
      {isRecording && (
        <div className="audioBackground">
          <h2>Listening...</h2>
          <span onClick={stopRecording}>Stop Listening</span>
        </div>
      )}
      <button onClick={isRecording ? stopRecording : startRecording}>
        <img src="/mic.png" alt="" />
      </button>

      {audioURL && audio && (
        <div className="audio">
          <div className="text">
            <p>Listen and click send for share!</p>
            <div className="close" onClick={() => setAudioURL(null)}>
              <span>X</span>
            </div>
          </div>
          <audio controls>
            <source src={audioURL} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
