class A {
  constructor() {}

  smooth(uell: number[], size = 2) {
    const a = Array.from<number>({ length: uell.length })
    for (let i = 0; i < uell.length; i++) {
      let b = 0
      let c = 0
      for (let j = Math.max(0, i - size); j <= Math.min(uell.length - 1, i + size); j++) {
        b += uell[j]
        c += 1
      }
      a[i] = b / c
    }
    return a
  }

  lowpass(uell: number[]) {
    return uell
  }

  sub(v1: number[], v2: number[]) {
    const a = Array.from<number>({ length: v1.length })
    for (let i = 0; i < a.length; i++) {
      a[i] = v1[i] - v2[i]
    }
    return a
  }

  greit(uell: number[], uref: number[], cirs: number[]) {
    const a = this.sub(uell, uref)
    const b = Array.from<number>({ length: 2328 })
    for (let i = 0; i < 2328; i++) {
      let c = 0
      for (let j = 0; j < 208; j++) {
        c += cirs[i * 208 + j] * a[j]
      }
      b[i] = c
    }
    return b
  }
}

export default A