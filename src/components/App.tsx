import { setupIonicReact, IonApp } from '@ionic/react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout'
import Main from './Main'
import Setting from './Setting'

setupIonicReact()

export default function App() {
  return (
    <IonApp>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="zb" element={<Setting />} />
            <Route path="gn" element={<Setting />} />
            <Route path="jz" element={<Setting />} />
            <Route path="xt" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IonApp>
  )
}
