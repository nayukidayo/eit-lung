import { WebPlugin } from '@capacitor/core'
import type { StartOptions, UsbPlugin } from './definitions'

export class UsbWeb extends WebPlugin implements UsbPlugin {
  private static readonly vid = 0x04b4
  private static readonly pid = 0x1004
  private device: USBDevice | null = null
  private isStoped = true

  async start(options: StartOptions): Promise<void> {
    this.isStoped = false
    const devices = await navigator.usb.getDevices()
    this.device = devices.filter(v => v.vendorId === UsbWeb.vid && v.productId === UsbWeb.pid)[0]
    if (!this.device) {
      this.device = await navigator.usb.requestDevice({
        filters: [{ vendorId: UsbWeb.vid, productId: UsbWeb.pid }],
      })
    }
    await this.device.open()
    await this.device.selectConfiguration(1)
    await this.device.claimInterface(0)

    await this.device.transferOut(2, new Uint8Array(options.mode1))
    await this.device.transferIn(6, 512)
    await this.device.transferOut(2, new Uint8Array(options.mode2))
    await this.device.transferIn(6, 512)

    const freq = new Uint8Array(options.freq)
    await this.device.transferOut(2, freq)
    await this.device.transferIn(6, 512)

    while (!this.isStoped && this.device) {
      await this.device.transferOut(2, freq)
      const resultIn = await this.device.transferIn(6, 512)
      if (resultIn.data) {
        const data = new Int16Array(resultIn.data.buffer)
        this.notifyListeners('data', { data: Array.from(data) })
      }
    }
  }

  async stop(): Promise<void> {
    this.isStoped = true
    return new Promise(resolve => {
      window.setTimeout(() => {
        this.device?.close().finally(() => {
          this.device = null
          resolve()
        })
      }, 100)
    })
  }
}
