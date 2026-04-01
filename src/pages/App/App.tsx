
import { WallpaperProvider } from '$/context/wallpaper/WallpaperProvider';
import { WindowProvider } from '$/context/window/WindowProvider';
import { MemoryManager } from '$/core/MemoryManager';
import AppContent from './AppContent';

function App() {
  MemoryManager.init()

  return (
    <WindowProvider>
      <WallpaperProvider>
        <AppContent/>
      </WallpaperProvider>
    </WindowProvider>
  )
}

export default App
