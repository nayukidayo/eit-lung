import { setupIonicReact, IonApp } from '@ionic/react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import Provider from './Provider'
import Layout from './Layout'
import Calib from './Calib'
import Patient from './Patient'
import Setting from './Setting'
import Page from './Page'
import View from './view/View'
import Zhu from './view/Zhu'
import TV from './view/TV'
import Dong from './view/Dong'
import Dian from './view/Dian'
import Hu from './view/Hu'
import Tong from './view/Tong'

setupIonicReact()

export default function App() {
  return (
    <IonApp>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/view" />} />
              <Route path="view" element={<View />}>
                <Route index element={<Zhu />} />
                <Route path="dong" element={<Dong />} />
                <Route path="tv" element={<TV />} />
                <Route path="dian" element={<Dian />} />
                <Route path="hu" element={<Hu />} />
                <Route path="tong" element={<Tong />} />
              </Route>
              <Route path="zb" element={<Page />} />
              <Route path="jz" element={<Calib />} />
              <Route path="hz" element={<Patient />} />
              <Route path="xt" element={<Setting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </IonApp>
  )
}
