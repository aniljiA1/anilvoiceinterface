import React, { useState, useRef } from "react";
import { startSession, sendAudio } from "./api";

const Recorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [session, setSession] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStart = async () => {
    try {
      if (!session) {
        const newSession = await startSession();
        setSession(newSession);
        console.log("Session started:", newSession);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        audioChunksRef.current = []; // reset
        console.log("Sending audio blob to backend...");
        const response = await sendAudio(blob);
        console.log("Backend response:", response);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      console.log("Recording started...");
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const handleStop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Recording stopped.");
    }
  };

  return (
    <div className="p-4">
      {!isRecording ? (
        <button onClick={handleStart} className="bg-green-500 text-white px-4 py-2 rounded">
          🎤 Start Recording
        </button>
      ) : (
        <button onClick={handleStop} className="bg-red-500 text-white px-4 py-2 rounded">
          ⏹ Stop Recording
        </button>
      )}
    </div>
  );
};

export default Recorder;

