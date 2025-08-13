import { setupIonicReact, IonApp } from '@ionic/react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import Provider from './Provider'
import Layout from './Layout'
import Level from './Level'
import Adjust from './Adjust'
import Patient from './Patient'
import Setting from './Setting'
import MainLayout from './main/Layout'
import Zhu from './main/Zhu'
import TV from './main/TV'
import Dong from './main/Dong'
import Dian from './main/Dian'

setupIonicReact()

export default function App() {
  return (
    <IonApp>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/main" />} />
              <Route path="main" element={<MainLayout />}>
                <Route index element={<Zhu />} />
                <Route path="dong" element={<Dong />} />
                <Route path="tv" element={<TV />} />
                <Route path="dian" element={<Dian />} />
              </Route>
              <Route path="level" element={<Level />} />
              <Route path="adjust" element={<Adjust />} />
              <Route path="patient" element={<Patient />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </IonApp>
  )
}
