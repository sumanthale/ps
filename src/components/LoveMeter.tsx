import React, { useState, useRef, useEffect } from "react";
import { Heart, Zap } from "lucide-react";

interface LoveMeterProps {
  onNext: () => void;
}

const LoveMeter: React.FC<LoveMeterProps> = ({ onNext }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Start the camera when component mounts
  const [cameraDenied, setCameraDenied] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraReady(true);
        }
      } catch (err) {
        console.warn("Camera access denied or unavailable:", err);
        setCameraDenied(true); // mark that camera is unavailable
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowResult(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setShowResult(true);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Header */}
      <div className="mb-10 z-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-3 text-glow-blue">
          Doraemon's Love Scanner
        </h2>
        <p className="text-gray-600 font-dancing text-lg">
          Advanced cuteness detection system ✨
        </p>
      </div>

      {/* Scanner Device */}
      <div className="relative mb-10 z-10">
        <div className="w-72 h-72 gradient-doraemon rounded-3xl p-6 shadow-dreamy animate-pulse-glow">
          {/* Screen */}
          <div className="w-full h-44 bg-black rounded-2xl p-0 relative overflow-hidden shadow-inner">
            {/* Camera Feed */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />

            {/* Black overlay for better text contrast */}
            {(isScanning || showResult) && (
              <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
            )}

            {/* Scan overlay */}
            {isScanning && (
              <>
                <div
                  className="absolute left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-pink-400 animate-pulse shadow-glow z-10"
                  style={{ top: `${(scanProgress / 100) * 100}%` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-green-400 font-mono text-sm z-10">
                  <div className="mb-3 animate-pulse">SCANNING... 🔍</div>
                  <div className="text-3xl font-bold text-glow-blue">
                    {scanProgress}%
                  </div>
                  <div className="mt-3 text-xs text-center px-2">
                    {scanProgress < 30 && "Detecting smile frequency..."}
                    {scanProgress >= 30 &&
                      scanProgress < 60 &&
                      "Measuring sparkle intensity..."}
                    {scanProgress >= 60 &&
                      scanProgress < 90 &&
                      "Calculating adorableness..."}
                    {scanProgress >= 90 && "Cuteness overload imminent..."}
                  </div>
                </div>
              </>
            )}

            {showResult && (
              <div className="absolute inset-0 flex flex-col items-center justify-center h-full text-pink-400 animate-fade-in-up z-10">
                <Heart className="w-16 h-16 mb-3 animate-heart-beat text-glow-pink" />
                <div className="font-mono text-2xl font-bold">100%</div>
                <div className="text-sm mt-2 font-bold animate-pulse">
                  CUTENESS OVERLOAD 💕
                </div>
                <div className="text-xs mt-3 text-center px-2">
                  ERROR: Too adorable for standard measurement
                </div>
              </div>
            )}

            {/* Ready Text */}
            {!isScanning && !showResult && cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center text-green-400 font-mono text-base animate-pulse z-10">
                READY TO SCAN ⚡
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={startScan}
              disabled={isScanning || !cameraReady}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-8 rounded-full flex items-center space-x-3 transition-all transform hover:scale-105 disabled:scale-100 shadow-romantic focus-romantic"
            >
              <Zap className="w-5 h-5" />
              <span>{isScanning ? "Scanning..." : "Scan"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {showResult && (
        <div className="animate-fade-in-up z-10 px-4">
          {/* Results Card */}
          <div className="card-romantic rounded-2xl p-6 shadow-dreamy mb-6 max-w-xs mx-auto text-center bg-white/80 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-pink-500 mb-3 animate-pulse">
              💖 Scan Results 💖
            </h3>

            <div className="space-y-3 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Smile:</span>
                <span className="text-pink-500 font-bold">Perfect ✨</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Eye Sparkle:</span>
                <span className="text-pink-500 font-bold">Max 💫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">
                  Overall Cuteness:
                </span>
                <span className="text-pink-500 font-bold">Off Charts 💕</span>
              </div>
            </div>

            {/* Sweet Compliment */}
            <div className="mt-4 p-3 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg shadow-inner">
              <p className="text-base font-dancing text-pink-700 font-bold leading-snug">
                You're not just cute... you're the most beautiful soul in the
                entire universe 💙✨ inside and out.
              </p>
            </div>
          </div>

          <button
            onClick={onNext}
            className="
            bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500
            text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50
            animate-fade-in-delayed"
          >
            What's Next? ✨
          </button>
        </div>
      )}

      {cameraDenied && (
        <div className="text-center space-y-4 mt-6">
          <p className="text-gray-600 leading-relaxed text-xs">
            📸 No camera? No problem! But if you can, show your lovely face so
            Doraemon can scan all your cuteness 💕
          </p>

          <button
            onClick={onNext}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
          >
            Skip Scan ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default LoveMeter;
