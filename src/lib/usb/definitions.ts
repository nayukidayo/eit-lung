import type { PluginListenerHandle } from '@capacitor/core'

export type StartOptions = {
  mode1: number
  mode2: number
  freq: number
}

export interface UsbPlugin {
  start(options: StartOptions): Promise<void>
  stop(): Promise<void>
  addListener(
    eventName: 'data',
    listenerFunc: (event: { data: number[] }) => void
  ): Promise<PluginListenerHandle>
}
