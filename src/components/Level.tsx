import { useEffect, useRef } from 'react'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

export default function Level() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {}, [])

  const write = async () => {
    try {
      const status = await Filesystem.checkPermissions()
      if (status.publicStorage !== 'granted') {
        const result = await Filesystem.requestPermissions()
        if (result.publicStorage !== 'granted') {
          ref.current!.innerText = '没有权限'
          return
        }
      }

      await Filesystem.mkdir({
        path: 'EIT_LUNG/张三/20251014131034',
        directory: Directory.Documents,
        recursive: true,
      })

      let result = await Filesystem.writeFile({
        path: 'EIT/张三_20251014131034/test.txt',
        data: 'Hello World!',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      })

      result = await Filesystem.writeFile({
        path: 'EIT/张三_20251014131034/test.png',
        data: 'iVBORw0KGgoAAAANSUhEUgAAAAYAAAADCAIAAAA/Y+msAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKElEQVQImT3BwQGAMACEMLjOoUO7MP2Z+D3v2iFhsFyliIKgbWci8btHMwjpy3ZBbgAAAABJRU5ErkJggg==',
        directory: Directory.Documents,
      })

      // console.log('File written successfully', result)
      ref.current!.innerText = '写入成功' + JSON.stringify(result)
    } catch (err) {
      ref.current!.innerText = '写入失败' + JSON.stringify(err)
    }
  }

  const fref = useRef<HTMLDivElement>(null)

  const fff = async () => {
    try {
      const res = await fetch('/matrix/uref.txt')
      const data = await res.text()
      fref.current!.innerText = data
    } catch (err) {
      fref.current!.innerText = '读取失败' + JSON.stringify(err)
    }
  }

  return (
    <div>
      <button style={{ width: 120, height: 50 }} onClick={fff}>
        fetch
      </button>
      <div ref={fref}>ffff</div>
      <br /><br />
      <button style={{ width: 120, height: 50 }} onClick={write}>
        Write
      </button>
      <div ref={ref}>写入</div>
    </div>
  )
}

// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAADCAIAAAA/Y+msAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKElEQVQImT3BwQGAMACEMLjOoUO7MP2Z+D3v2iFhsFyliIKgbWci8btHMwjpy3ZBbgAAAABJRU5ErkJggg==
