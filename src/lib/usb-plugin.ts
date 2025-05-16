import { PluginListenerHandle, registerPlugin } from '@capacitor/core'

export type StartOptions = {
  mode0: number
  mode1: number
  freq: number
}

export type DataListener = (ret: { data: number[] }) => void

export interface USBPlugin {
  start(options: StartOptions): Promise<void>

  stop(): Promise<void>

  addListener(event: 'data', listener: DataListener): Promise<PluginListenerHandle>
}

const USB = registerPlugin<USBPlugin>('USB')

export default USB
