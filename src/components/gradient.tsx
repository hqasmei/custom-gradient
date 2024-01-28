"use client";

import { useState, useRef, useEffect } from "react";

const GradientPage: React.FC = () => {
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(630);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gradientDirection, setGradientDirection] = useState("to right bottom");
  const gradientDirections = [
    {
      direction: "to right",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>', // Replace with actual SVG markup or path
    },
    {
      direction: "to left",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    },
    {
      direction: "to bottom",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
    },
    {
      direction: "to top",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>',
    },
    {
      direction: "to right bottom",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-down-right"><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>',
    },
    {
      direction: "to right top",
      svg: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
    },
    {
      direction: "to left bottom",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-down-left"><path d="M17 7 7 17"/><path d="M17 17H7V7"/></svg>',
    },
    {
      direction: "to left top",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-up-left"><path d="M7 17V7h10"/><path d="M17 17 7 7"/></svg>',
    },
  ];

  const [colorStops, setColorStops] = useState([
    { stop: 0, color: "#051937" },
    { stop: 0.25, color: "#223366" },
    { stop: 0.5, color: "#484d98" },
    { stop: 0.75, color: "#7766ca" },
    { stop: 1, color: "#ad7ffb" },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = width;
        canvas.height = height;

        // Determine start and end points based on gradientDirection
        let x0, y0, x1, y1;
        switch (gradientDirection) {
          case "to right":
            [x0, y0, x1, y1] = [0, 0, width, 0];
            break;
          case "to left":
            [x0, y0, x1, y1] = [width, 0, 0, 0];
            break;
          case "to bottom":
            [x0, y0, x1, y1] = [0, 0, 0, height];
            break;
          case "to top":
            [x0, y0, x1, y1] = [0, height, 0, 0];
            break;
          case "to right bottom":
            [x0, y0, x1, y1] = [0, 0, width, height];
            break;
          case "to right top":
            [x0, y0, x1, y1] = [0, height, width, 0];
            break;
          case "to left bottom":
            [x0, y0, x1, y1] = [width, 0, 0, height];
            break;
          case "to left top":
            [x0, y0, x1, y1] = [width, height, 0, 0];
            break;
          default:
            [x0, y0, x1, y1] = [0, 0, width, height]; // Default to 'to right bottom'
        }

        // Create the gradient
        const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
        colorStops.forEach((stop) => {
          gradient.addColorStop(stop.stop, stop.color);
        });

        // Apply the gradient to the canvas
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    }
  }, [width, height, colorStops, gradientDirection]);

  const setDirection = (direction: string) => {
    setGradientDirection(direction);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const setPresetSize = (presetWidth: number, presetHeight: number) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
  };

  const addColorStop = () => {
    setColorStops([...colorStops, { stop: 0.5, color: "#ffffff" }]);
  };

  const removeColorStop = (index: number) => {
    setColorStops(colorStops.filter((_, idx) => idx !== index));
  };

  const updateColorStop = (index: number, stop: number, color: string) => {
    // Ensure the stop value is within the range [0, 1]
    const validStop = Math.min(Math.max(stop, 0), 1);

    const newColorStops = [...colorStops];
    newColorStops[index] = { stop: validStop, color };
    setColorStops(newColorStops);
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL("image/png");

      // Create a link and set the URL and download attributes
      const link = document.createElement("a");
      link.href = image;
      link.download = "gradient-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></canvas>
      <div className="flex flex-col space-y-4  w-full max-w-7xl border p-4 rounded-md">
        <div className="grid grid-cols-3 gap-6">
          {/* Color */}
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-lg">Color</span>
            <div className="flex flex-col space-y-2 items-start">
              {colorStops.map((colorStop, index) => (
                <div
                  key={index}
                  className="flex flex-row space-x-4 items-center"
                >
                  <input
                    type="number"
                    value={colorStop.stop}
                    onChange={(e) =>
                      updateColorStop(
                        index,
                        Number(e.target.value),
                        colorStop.color
                      )
                    }
                    min="0"
                    max="1"
                    step="0.01"
                    className="border rounded p-1"
                  />
                  <input
                    type="color"
                    value={colorStop.color}
                    onChange={(e) =>
                      updateColorStop(index, colorStop.stop, e.target.value)
                    }
                    className=""
                  />
                  <button onClick={() => removeColorStop(index)} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="red"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={addColorStop}
                className="bg-blue-600 text-sm text-white p-2 rounded-md"
              >
                + Add Color Stop
              </button>
            </div>
          </div>

          {/* Size */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-lg">Size</span>
              <div className="flex flex-row space-x-2 items-center">
                <label>Width: </label>
                <input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  className="border rounded p-1"
                />
              </div>
              <div className="flex flex-row space-x-2">
                <label>Height: </label>
                <input
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  className="border rounded p-1"
                />
              </div>
            </div>
            <div className="flex flex-col text-sm space-y-2 mt-6">
              <div>
                <button
                  onClick={() => setPresetSize(1280, 720)}
                  className="bg-black text-white p-2 rounded-md"
                >
                  YouTube Thumbnail (1280x720)
                </button>
              </div>

              <div>
                <button
                  onClick={() => setPresetSize(1200, 600)}
                  className="bg-black text-white p-2 rounded-md"
                >
                  Open Graph Image (1200x600)
                </button>
              </div>
            </div>
          </div>

          {/* Direction */}
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-lg">Direction</span>
            <div className="flex flex-wrap">
              {gradientDirections.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setDirection(item.direction)}
                  className="bg-black text-white p-2 rounded-full m-1"
                >
                  <span dangerouslySetInnerHTML={{ __html: item.svg }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="justify-end flex">
          <button
            onClick={downloadImage}
            className="bg-black text-white p-2 rounded-md flex flex-row items-center space-x-3 hover:bg-neutral-700"
          >
            <span>Download as PNG</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradientPage;
