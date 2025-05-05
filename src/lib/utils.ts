export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function numberToColor(value: number) {
  console.log('', value)
  return [0, 0, 255, 255]
}

// int rgb = red;
// rgb = (rgb << 8) + green;
// rgb = (rgb << 8) + blue;

// int red = (rgb >> 16) & 0xFF;
// int green = (rgb >> 8) & 0xFF;
// int blue = rgb & 0xFF;

// rgb(245, 231, 84) 1 16115540
// rgb(86, 191, 167) -1 5685159
// rgb(63, 62, 194) -3.5 4144834
