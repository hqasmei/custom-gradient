// Function to convert hex to HSL
function hexToHSL(hex: string): [number, number, number] {
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0; // Initialize h to 0
  let s,
    l = (max + min) / 2;

  if (max != min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  } else {
    s = 0; // achromatic
  }

  return [h * 360, s * 100, l * 100];
}

// Function to convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Function to generate gradient
export function generateGradientWithStops(
  startHex: string,
  endHex: string,
  steps: number
) {
  let startHSL = hexToHSL(startHex);
  let endHSL = hexToHSL(endHex);
  let gradient = [];

  for (let i = 0; i <= steps; i++) {
    let h = startHSL[0] + (endHSL[0] - startHSL[0]) * (i / steps);
    let s = startHSL[1] + (endHSL[1] - startHSL[1]) * (i / steps);
    let l = startHSL[2] + (endHSL[2] - startHSL[2]) * (i / steps);
    gradient.push({ stop: i / steps, color: hslToHex(h, s, l) });
  }

  return gradient;
}
