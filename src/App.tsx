import { useRef, useState } from "react";
import "./App.css";
import Logo from "./favicon.png";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  return (
    <div className="container">
      <img src={Logo} alt="logo" width={"100px"} />
      <button
        onClick={async function () {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          console.log(typeof videoRef);
          if (videoRef.current) videoRef.current.srcObject = stream;
          setShowButton(true);
        }}
      >
        Start Camera
      </button>
      <video ref={videoRef} width="320" height="240" autoPlay></video>
      {showButton && (
        <button
          onClick={function () {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const video = videoRef.current as HTMLVideoElement;
            if (canvas)
              canvas
                ?.getContext("2d")
                ?.drawImage(video, 0, 0, video.width, video.height);
            const image_data_url = canvas.toDataURL("image/jpeg");

            // data url of the image
            console.log(image_data_url);
          }}
        >
          Click!
        </button>
      )}
      <canvas ref={canvasRef} width="320" height="240"></canvas>
    </div>
  );
}

export default App;
