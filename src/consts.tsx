import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowUpLeft,
} from "lucide-react";

export const gradientDirections = [
  {
    direction: "to right",
    svg: <ArrowRight size={16} />,
  },
  {
    direction: "to left",
    svg: <ArrowLeft size={16} />,
  },
  {
    direction: "to bottom",
    svg: <ArrowDown size={16} />,
  },
  {
    direction: "to top",
    svg: <ArrowUp size={16} />,
  },
  {
    direction: "to right bottom",
    svg: <ArrowDownRight size={16} />,
  },
  {
    direction: "to right top",
    svg: <ArrowUpRight size={16} />,
  },
  {
    direction: "to left bottom",
    svg: <ArrowDownLeft size={16} />,
  },
  {
    direction: "to left top",
    svg: <ArrowUpLeft size={16} />,
  },
];

export const steps = 4;
export const predefinedColorCombinations = [
  { color1: "#051937", color2: "#ad7ffb" },
  { color1: "#0093e9", color2: "#80d0c7" },
  { color1: "#0729a6", color2: "#3a5d68" },
  { color1: "#6dc52e", color2: "#4763a5" },
  { color1: "#1a3463", color2: "#3b4ba7" },
  { color1: "#5558DA", color2: "#5FD1F9" },
  { color1: "#48c6ef", color2: "#6f86d6" },
  { color1: "#00c6fb", color2: "#005bea" },
  { color1: "#13547a", color2: "#80d0c7" },
  { color1: "#434343", color2: "#000000" },
  { color1: "#ff00cc", color2: "#333399" },
  { color1: "#000428", color2: "#004e92" },
  { color1: "#42275a", color2: "#734b6d" },
  { color1: "#141e30", color2: "#243b55" },
  { color1: "#2c3e50", color2: "#4ca1af" },
];
