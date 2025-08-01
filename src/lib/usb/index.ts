import { registerPlugin } from '@capacitor/core'
import type { UsbPlugin } from './definitions'

const usb = registerPlugin<UsbPlugin>('usb', {
  web: () => import('./web').then(m => new m.UsbWeb()),
})

export * from './definitions'
export { usb }
