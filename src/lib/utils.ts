export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function numberToColor(_: number) {
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

export function greit(uell: number[], uref: number[], cirs: number[]) {
  const a = Array.from<number>({ length: 208 })
  for (let i = 0; i < a.length; i++) {
    a[i] = uell[i] - uref[i]
  }
  const b = Array.from<number>({ length: 2328 })
  for (let i = 0; i < 2328; i++) {
    let sum = 0
    for (let j = 0; j < 208; j++) {
      sum += cirs[i * 208 + j] * a[j]
    }
    b[i] = sum
  }
  return b
}
