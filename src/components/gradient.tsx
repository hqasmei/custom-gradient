'use client';

import { useEffect, useRef, useState } from 'react';

import {
  gradientDirections,
  predefinedColorCombinations,
  steps,
} from '@/consts';
import { useDownloadTrigger } from '@/hooks/use-download-image';
import { generateGradientWithStops } from '@/utils';
import { Plus, Trash2, Wand2 } from 'lucide-react';

import { Button } from './ui/button';

const GradientPage: React.FC = () => {
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(500);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blurEffect, setBlurEffect] = useState(false);
  const [gradientDirection, setGradientDirection] = useState('to right bottom');

  const [colorStops, setColorStops] = useState(
    generateGradientWithStops('#0093e9', '#80d0c7', 4),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = width;
        canvas.height = height;

        // Determine start and end points based on gradientDirection
        let x0, y0, x1, y1;
        switch (gradientDirection) {
          case 'to right':
            [x0, y0, x1, y1] = [0, 0, width, 0];
            break;
          case 'to left':
            [x0, y0, x1, y1] = [width, 0, 0, 0];
            break;
          case 'to bottom':
            [x0, y0, x1, y1] = [0, 0, 0, height];
            break;
          case 'to top':
            [x0, y0, x1, y1] = [0, height, 0, 0];
            break;
          case 'to right bottom':
            [x0, y0, x1, y1] = [0, 0, width, height];
            break;
          case 'to right top':
            [x0, y0, x1, y1] = [0, height, width, 0];
            break;
          case 'to left bottom':
            [x0, y0, x1, y1] = [width, 0, 0, height];
            break;
          case 'to left top':
            [x0, y0, x1, y1] = [width, height, 0, 0];
            break;
          default:
            [x0, y0, x1, y1] = [0, 0, width, height]; // Default to 'to right bottom'
        }

        ctx.filter = blurEffect ? 'blur(10px)' : 'none';

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
  }, [width, height, colorStops, gradientDirection, blurEffect]);

  const randomizeColorCombination = () => {
    const randomIndex = Math.floor(
      Math.random() * predefinedColorCombinations.length,
    );

    const colors = predefinedColorCombinations[randomIndex];
    const output = generateGradientWithStops(
      colors.color1,
      colors.color2,
      steps,
    );
    setColorStops(output);
  };

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
    setColorStops([...colorStops, { stop: 0.5, color: '#ffffff' }]);
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
      const image = canvas.toDataURL('image/png');

      // Create a link and set the URL and download attributes
      const link = document.createElement('a');
      link.href = image;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRatioWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    const aspectRatio = width / height;
    const newHeight = newWidth / aspectRatio;
    if (newWidth <= 900 && newHeight <= 500) {
      setWidth(newWidth);
      setHeight(newHeight);
    }
  };

  const handleRatioHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    const aspectRatio = width / height;
    const newWidth = newHeight * aspectRatio;
    if (newWidth <= 900 && newHeight <= 500) {
      setHeight(newHeight);
      setWidth(newWidth);
    }
  };
  return (
    <div className="flex flex-col-reverse md:flex-row md:space-x-6 md:items-start md:justify-between pt-6 w-full flex-1">
      <aside className="w-full lg:w-1/4 lg:mr-4 h-full overflow-y-auto z-10 border bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-4 w-full max-w-7xl p-6 max-h-full">
          {/* Color */}
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-base">Color</span>
            <div className="flex flex-row space-x-2 items-center">
              <button
                title="Plus"
                onClick={addColorStop}
                className="bg-blue-600 hover:bg-blue-500 duration-200 text-sm text-white p-2 rounded-md"
              >
                <Plus size={16} />
              </button>
              <button
                title="Wand2"
                onClick={randomizeColorCombination}
                className="bg-black hover:bg-neutral-600 duration-200 rounded-md p-2"
              >
                <Wand2 size={16} color="white" />
              </button>
            </div>
            <div className="flex flex-col space-y-2 items-start">
              {colorStops.map((colorStop, index) => (
                <div
                  key={index}
                  className="flex flex-row space-x-4 items-center"
                >
                  <input
                    placeholder="color"
                    type="number"
                    value={colorStop.stop}
                    onChange={(e) =>
                      updateColorStop(
                        index,
                        Number(e.target.value),
                        colorStop.color,
                      )
                    }
                    min="0"
                    max="1"
                    step="0.01"
                    className="border rounded p-1"
                  />
                  <input
                    placeholder="color"
                    type="color"
                    value={colorStop.color}
                    onChange={(e) =>
                      updateColorStop(index, colorStop.stop, e.target.value)
                    }
                    className=""
                  />
                  <button
                    title="Trash2"
                    onClick={() => removeColorStop(index)}
                    className=""
                  >
                    <Trash2 color="red" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-base pt-4">Direction</span>
            <div className="flex flex-wrap">
              {gradientDirections.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setDirection(item.direction)}
                  className="bg-black text-white p-1 rounded-full m-1 hover:bg-neutral-600 duration-200 "
                >
                  {item.svg}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-base">Size</span>
              <div className="flex flex-row space-x-2 items-center">
                <label>Width: </label>
                <input
                  placeholder="Width"
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  className="border rounded p-1 w-2/3"
                />
              </div>
              <div className="flex flex-row space-x-2">
                <label>Height: </label>
                <input
                  placeholder="Height"
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  className="border rounded p-1 w-2/3"
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

          {/* Effects */}
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-base">Effects</span>
            <div className="flex flex-col space-y-2 text-sm">
              <div>
                <button
                  onClick={() => setBlurEffect(!blurEffect)}
                  className="bg-black text-white p-2 rounded-md "
                >
                  {blurEffect ? 'Remove Blur' : 'Apply Gaussian Blur'}
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-row space-x-4 justify-between">
            <div className="flex flex-row items-center justify-between space-x-2">
              <Button
                variant="outline"
                onClick={downloadImage}
                className="flex flex-row space-x-2 items-center justify-center"
              >
                <span className="text-sm">Download</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
              </Button>
            </div>
            <div className="flex flex-row items-center bg-white">
              <button
                onClick={() => {
                  setWidth(width * 0.9);
                  setHeight(height * 0.9);
                }}
                className="py-2 px-4 text-lg border-y border-l rounded-l-md"
              >
                -
              </button>
              <button
                onClick={() => {
                  setWidth(width * 1.1);
                  setHeight(height * 1.1);
                }}
                className="py-2 text-lg px-4 border rounded-r-md"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="mb-4 md:mb-0 w-full lg:w-3/4 flex items-center justify-center">
        <div>
          <canvas
            ref={canvasRef}
            style={{ width: `${width}px`, height: `${height}px` }}
            className="rounded-lg max-w-full max-h-full"
          ></canvas>
        </div>
      </main>
    </div>
  );
};

export default GradientPage;
