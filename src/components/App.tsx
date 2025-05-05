import { setupIonicReact, IonApp } from '@ionic/react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Provider from './Provider'
import Layout from './Layout'
import Main from './Main'
import Setting from './Setting'
import Page from './Page'

setupIonicReact()

export default function App() {
  return (
    <IonApp>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="jz" element={<Page />} />
              <Route path="xt" element={<Setting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </IonApp>
  )
}
