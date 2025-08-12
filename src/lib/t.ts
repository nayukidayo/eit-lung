import c_irs from './cirs'
import graph from './graph'

const u_ref = [
  669, 702, 664, 694, 702, 703, 648, 699, 698, 685, 693, 690, 684, 695, 690, 674, 692, 712, 664,
  698, 701, 680, 669, 704, 724, 678, 702, 689, 705, 700, 688, 664, 700, 667, 669, 709, 715, 709,
  685, 711, 704, 684, 697, 686, 687, 678, 697, 667, 705, 673, 673, 675, 696, 690, 688, 674, 681,
  684, 699, 677, 670, 702, 673, 692, 712, 703, 695, 686, 714, 682, 709, 691, 675, 727, 694, 696,
  681, 709, 676, 681, 728, 686, 698, 680, 701, 679, 688, 687, 667, 693, 689, 696, 656, 686, 675,
  694, 680, 702, 696, 721, 676, 700, 685, 690, 708, 672, 685, 685, 716, 698, 659, 698, 696, 700,
  692, 705, 692, 694, 699, 699, 690, 684, 701, 678, 669, 700, 660, 682, 682, 692, 704, 707, 676,
  683, 684, 694, 679, 708, 684, 696, 680, 688, 703, 679, 678, 687, 681, 697, 713, 682, 676, 683,
  695, 707, 668, 683, 690, 720, 705, 681, 673, 681, 693, 681, 670, 680, 682, 724, 697, 711, 691,
  714, 698, 689, 700, 697, 706, 667, 704, 679, 704, 691, 672, 664, 706, 699, 699, 676, 701, 700,
  686, 705, 720, 694, 694, 682, 690, 711, 693, 683, 680, 682, 690, 682, 681, 678, 692, 698,
]

const u_ell = [
  700, 721, 678, 685, 709, 659, 693, 695, 672, 686, 694, 709, 682, 691, 696, 704, 699, 690, 718,
  657, 703, 706, 675, 715, 697, 696, 682, 688, 681, 692, 684, 687, 668, 700, 668, 691, 683, 676,
  690, 684, 703, 696, 713, 721, 695, 691, 679, 699, 684, 697, 696, 684, 680, 698, 707, 714, 693,
  679, 703, 691, 684, 696, 697, 661, 669, 683, 686, 707, 670, 692, 689, 715, 710, 701, 686, 667,
  684, 711, 713, 686, 719, 664, 702, 700, 678, 682, 687, 687, 706, 680, 706, 688, 695, 678, 666,
  706, 677, 701, 698, 715, 701, 726, 711, 697, 704, 682, 693, 688, 705, 683, 680, 692, 686, 669,
  701, 680, 701, 682, 657, 698, 686, 700, 705, 684, 683, 685, 690, 683, 652, 694, 687, 695, 648,
  684, 657, 686, 681, 671, 703, 659, 697, 700, 695, 704, 670, 684, 679, 679, 657, 700, 712, 697,
  703, 689, 697, 707, 714, 692, 714, 678, 700, 690, 713, 687, 706, 660, 683, 676, 698, 687, 691,
  694, 700, 710, 680, 688, 730, 715, 704, 704, 688, 684, 694, 681, 712, 687, 705, 683, 679, 673,
  724, 708, 697, 691, 686, 694, 715, 676, 685, 696, 698, 705, 659, 700, 748, 680, 678, 717,
]

type Msg = {
  r1: number
  r2: number
  r3: number
  r4: number
  rg: number
  dt: Uint8ClampedArray
}

type Roi = 'dc' | 'xx'

class T {
  private cirs: number[] = []
  private uref: number[] = []
  private roi: Roi = 'dc'

  setCirs(cirs: number[]) {
    this.cirs = cirs
  }
  
  setUref(uref: number[]) {
    this.uref = uref
  }
  
  setRoi(roi: Roi) {
    this.roi = roi
  }

  init() {
    this.cirs = c_irs
    this.uref = u_ref
    this.roi = 'dc'
  }

  run(uell?: number[]) {
    this.noFilter(uell || u_ell)
  }

  // 4 0.7
  noFilter(uell: number[]) {
    const msg: Msg = {
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0,
      rg: 0,
      dt: new Uint8ClampedArray(64 * 64 * 4).fill(255),
    }
    for (let i = 0; i < 2328; i++) {
      let a = 0
      for (let j = 0; j < 208; j++) {
        a += this.cirs[i * 208 + j] * (uell[j] - this.uref[j])
      }
      this.sum(msg, i, a)
      this.draw(msg, i, a)
    }
    console.log(msg)
  }

  // 13 3
  smoothFilter(uell: number[], size = 2) {
    const msg: Msg = {
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0,
      rg: 0,
      dt: new Uint8ClampedArray(64 * 64 * 4).fill(255),
    }
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
    console.log(msg)
  }

  private draw(msg: Msg, i: number, a: number) {
    msg.dt[graph[i] * 4] = 100
  }

  private sum(msg: Msg, i: number, a: number) {
    if (this.roi === 'dc') {
      switch (true) {
        case i <= 209:
          msg.r4 += a
          break
        case i <= 1188:
          msg.r3 += a
          break
        case i <= 2107:
          msg.r2 += a
          break
        // case i <= 2327:
        //   r1 += arr[i]
        //   break
        default:
          msg.r1 += a
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
          msg.r3 += a
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
          msg.r4 += a
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
          msg.r1 += a
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
        //   r2 += arr[i]
        //   break
        default:
          msg.r2 += a
          break
      }
    }
    msg.rg = msg.r1 + msg.r2 + msg.r3 + msg.r4
  }
}

export default new T()
