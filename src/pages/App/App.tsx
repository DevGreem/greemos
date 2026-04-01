
import { WindowProvider } from '$/context/window/WindowProvider';
import AppContent from './AppContent';

function App() {

  return (
    <WindowProvider>
      <AppContent/>
    </WindowProvider>
  )
}

export default App
