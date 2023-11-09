import React, { useRef, useEffect } from "react";
import camera from "../assets/camera.png";

const ImageDisplay = ({ selectedImage, drawLine, bboxData }) => {
  const canvasRef = useRef(null);
  const isDrawing = drawLine;

  useEffect(() => {
    if (selectedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Load the image onto the canvas
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw bounding boxes if bboxData is available
        if (bboxData && bboxData.predictions) {
          ctx.strokeStyle = "red";
          ctx.lineWidth = 3;

          bboxData.predictions.forEach((prediction) => {
            const x = prediction.x;
            const y = prediction.y;
            const width = prediction.width;
            const height = prediction.height;

            const x1 = x - width / 2;
            const y1 = y - height / 2;
            const x2 = x + width / 2;
            const y2 = y + height / 2;

            ctx.beginPath();
            ctx.rect(x1, y1, width, height);
            ctx.stroke();
          });
        }
      };
    }
  }, [selectedImage, isDrawing, bboxData]);

  return (
    <div className="w-[55%] flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mt-16 mr-28">
        <h1 className="text-custom-text-orange text-7xl font-bold">
          RAIL DETECT
        </h1>
        <img src={camera} alt="camera" className="w-10 h-9 mb-16 ml-7" />
      </div>
      {/* BOX 1 BEHIND */}
      <div className="w-[558px] h-[544px] rounded-3xl border-8 border-solid border-custom-border shadow-custom-box-shadow mt-10 mr-12 z-1"></div>
      {/* Canvas for drawing */}
      <canvas
        ref={canvasRef}
        width={558}
        height={544}
        className="bg-custom-box-1 rounded-3xl border-8 border-solid border-custom-border-box-2 shadow-custom-box-shadow-2 mr-1 z-50 absolute top-72 overflow-hidden"
      />
    </div>
  );
};

export default ImageDisplay;
