import graph from './graph'
import cirs from './cirs'
import uref from './uref'

export type Msg = {
  br: number
  tv1: number
  tv2: number
  tv3: number
  tv4: number
  roi0: number
  roi1: number
  roi2: number
  roi3: number
  roi4: number
  dt: Uint8ClampedArray<ArrayBuffer>
}

export type Roi = 'dc' | 'xx'

export type Filter = 'no' | 'smooth' | 'lowpass'

export default class EIT {
  private graph: number[]
  private cirs: number[]
  private uref: number[]
  private roi: Roi
  private filter: Filter

  constructor() {
    this.graph = graph
    this.cirs = cirs
    this.uref = uref
    this.roi = 'dc'
    this.filter = 'no'
  }

  setCirs(cirs: number[]) {
    this.cirs = cirs
  }

  setUref(uref: number[]) {
    this.uref = uref
  }

  setRoi(roi: Roi) {
    this.roi = roi
  }

  setFilter(filter: Filter) {
    this.filter = filter
  }

  run(uell: number[]) {
    switch (this.filter) {
      case 'smooth':
        return this.smoothFilter(uell)
      case 'lowpass':
        return this.lowpassFilter(uell)
      default:
        return this.noFilter(uell)
    }
  }

  // 4 0.7
  private noFilter(uell: number[]) {
    const msg = this.msg()
    for (let i = 0; i < 2328; i++) {
      let a = 0
      for (let j = 0; j < 208; j++) {
        a += this.cirs[i * 208 + j] * (uell[j] - this.uref[j])
      }
      this.sum(msg, i, a)
      this.draw(msg, i, a)
    }
    this.ratio(msg)
    this.peakValley(msg)
    return msg
  }

  // 13 3
  private smoothFilter(uell: number[], size = 2) {
    const msg = this.msg()
    for (let i = 0; i < 2328; i++) {
      let a = 0
      for (let j = 0; j < 208; j++) {
        let n = 0
        let m = 0
        for (let k = Math.max(0, j - size); k <= Math.min(207, j + size); k++) {
          n += uell[k]
          m += 1
        }
        a += this.cirs[i * 208 + j] * (n / m - this.uref[j])
      }
      this.sum(msg, i, a)
      this.draw(msg, i, a)
    }
    this.ratio(msg)
    this.peakValley(msg)
    return msg
  }

  private lowpassFilter(uell: number[]) {
    return this.noFilter(uell)
  }

  private msg(): Msg {
    return {
      br: 0,
      tv1: 0,
      tv2: 0,
      tv3: 0,
      tv4: 0,
      roi0: 0,
      roi1: 0,
      roi2: 0,
      roi3: 0,
      roi4: 0,
      dt: new Uint8ClampedArray(64 * 64 * 4).fill(255),
    }
  }

  private ratio(msg: Msg) {
    msg.tv1 = msg.roi1 / msg.roi0
    msg.tv2 = msg.roi2 / msg.roi0
    msg.tv3 = msg.roi3 / msg.roi0
    msg.tv4 = msg.roi4 / msg.roi0
  }

  private draw(msg: Msg, i: number, _a: number) {
    msg.dt[this.graph[i] * 4] = 100
  }

  private sum(msg: Msg, i: number, a: number) {
    if (this.roi === 'dc') {
      switch (true) {
        case i <= 209:
          msg.roi4 += a
          break
        case i <= 1188:
          msg.roi3 += a
          break
        case i <= 2107:
          msg.roi2 += a
          break
        // case i <= 2327:
        //   msg.roi1 += a
        //   break
        default:
          msg.roi1 += a
          break
      }
    } else {
      switch (true) {
        case i >= 0 && i <= 8:
        case i >= 17 && i <= 30:
        case i >= 44 && i <= 60:
        case i >= 78 && i <= 97:
        case i >= 118 && i <= 139:
        case i >= 162 && i <= 185:
        case i >= 210 && i <= 235:
        case i >= 262 && i <= 289:
        case i >= 318 && i <= 346:
        case i >= 375 && i <= 404:
        case i >= 434 && i <= 463:
        case i >= 493 && i <= 523:
        case i >= 554 && i <= 584:
        case i >= 616 && i <= 647:
        case i >= 679 && i <= 710:
        case i >= 742 && i <= 773:
        case i >= 805 && i <= 836:
        case i >= 869 && i <= 900:
        case i >= 933 && i <= 964:
        case i >= 997 && i <= 1028:
        case i >= 1061 && i <= 1092:
        case i >= 1125 && i <= 1156:
          msg.roi3 += a
          break
        case i >= 9 && i <= 16:
        case i >= 31 && i <= 43:
        case i >= 61 && i <= 77:
        case i >= 98 && i <= 117:
        case i >= 140 && i <= 161:
        case i >= 186 && i <= 209:
        case i >= 236 && i <= 261:
        case i >= 290 && i <= 317:
        case i >= 347 && i <= 374:
        case i >= 405 && i <= 433:
        case i >= 464 && i <= 492:
        case i >= 524 && i <= 553:
        case i >= 585 && i <= 615:
        case i >= 648 && i <= 678:
        case i >= 711 && i <= 741:
        case i >= 774 && i <= 804:
        case i >= 837 && i <= 868:
        case i >= 901 && i <= 932:
        case i >= 965 && i <= 996:
        case i >= 1029 && i <= 1060:
        case i >= 1093 && i <= 1124:
        case i >= 1157 && i <= 1188:
          msg.roi4 += a
          break
        case i >= 1189 && i <= 1219:
        case i >= 1252 && i <= 1282:
        case i >= 1314 && i <= 1344:
        case i >= 1376 && i <= 1406:
        case i >= 1438 && i <= 1467:
        case i >= 1499 && i <= 1528:
        case i >= 1559 && i <= 1587:
        case i >= 1618 && i <= 1646:
        case i >= 1677 && i <= 1705:
        case i >= 1735 && i <= 1762:
        case i >= 1792 && i <= 1819:
        case i >= 1848 && i <= 1874:
        case i >= 1903 && i <= 1928:
        case i >= 1956 && i <= 1981:
        case i >= 2008 && i <= 2032:
        case i >= 2059 && i <= 2082:
        case i >= 2108 && i <= 2130:
        case i >= 2155 && i <= 2176:
        case i >= 2199 && i <= 2218:
        case i >= 2240 && i <= 2258:
        case i >= 2279 && i <= 2294:
        case i >= 2312 && i <= 2321:
          msg.roi1 += a
          break
        // case i >= 1220 && i <= 1251:
        // case i >= 1283 && i <= 1313:
        // case i >= 1345 && i <= 1375:
        // case i >= 1407 && i <= 1437:
        // case i >= 1468 && i <= 1498:
        // case i >= 1529 && i <= 1558:
        // case i >= 1588 && i <= 1617:
        // case i >= 1647 && i <= 1676:
        // case i >= 1706 && i <= 1734:
        // case i >= 1763 && i <= 1791:
        // case i >= 1820 && i <= 1847:
        // case i >= 1875 && i <= 1902:
        // case i >= 1929 && i <= 1955:
        // case i >= 1982 && i <= 2007:
        // case i >= 2033 && i <= 2058:
        // case i >= 2083 && i <= 2107:
        // case i >= 2131 && i <= 2154:
        // case i >= 2177 && i <= 2198:
        // case i >= 2219 && i <= 2239:
        // case i >= 2259 && i <= 2278:
        // case i >= 2295 && i <= 2311:
        // case i >= 2322 && i <= 2327:
        //   msg.r2 += a
        //   break
        default:
          msg.roi2 += a
          break
      }
    }
    msg.roi0 = msg.roi1 + msg.roi2 + msg.roi3 + msg.roi4
  }

  private sums: number[] = []
  // private peek = {
  //   value: 0,
  //   time: 0,
  // }
  private valley = {
    value: 0,
    time: 0,
  }

  private peakValley(msg: Msg) {
    if (this.sums.length >= 5) {
      this.sums.shift()
    }
    this.sums.push(msg.roi0)
    const [a, b, c, d, e] = this.sums
    // if (a < b && b < c && c > d && d > e) {
    //   // peek
    //   this.peek = {
    //     value: c,
    //     time: Date.now(),
    //   }
    // } else if (a > b && b > c && c < d && d < e) {
    //   // valley
    //   const now = Date.now()
    //   if (this.valley) {
    //     msg.br = 60000 / (now - this.valley.time)
    //   }
    //   this.valley = { value: c, time: now }
    // }
    if (a > b && b > c && c < d && d < e) {
      // valley
      const now = Date.now()
      if (this.valley) {
        msg.br = 60000 / (now - this.valley.time)
      }
      this.valley = { value: c, time: now }
    }
  }
}
