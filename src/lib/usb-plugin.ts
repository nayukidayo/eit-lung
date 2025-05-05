import { PluginListenerHandle, registerPlugin } from '@capacitor/core'

export type StartOptions = {
  mode0: number
  mode1: number
  freq: number
}

export type OnData = {
  data: number[]
}

export type DataListener = (data: OnData) => void

export interface USBPlugin {
  open(options: { vendorId: number; productId: number }): Promise<{ value: string }>
  addListener(
    event: 'open',
    listener: (data: { value: string }) => void
  ): Promise<PluginListenerHandle>

  // close(): Promise<void>
  // read(): Promise<{ value: string }>
  // write(options: { value: string }): Promise<void>
  // addEventListener(event: 'connected', listener: () => void): Promise<PluginListenerHandle>
  // addEventListener(event: 'disconnected', listener: () => void): Promise<PluginListenerHandle>
  // removeEventListener(event: 'data', listener: PluginListenerHandle): Promise<void>

  start(options: StartOptions): Promise<void>
  stop(): Promise<void>
  addListener(event: 'data', listener: DataListener): Promise<PluginListenerHandle>
}

const USB = registerPlugin<USBPlugin>('USB')

export default USB
