
import { WallpaperProvider } from '$/context/wallpaper/WallpaperProvider';
import { WindowsProvider } from '$/context/window/WindowsProvider';
import { MemoryManager } from '$/core/MemoryManager';
import AppContent from './AppContent';

function App() {
  MemoryManager.init()

  return (
    <WindowsProvider>
      <WallpaperProvider>
        <AppContent/>
      </WallpaperProvider>
    </WindowsProvider>
  )
}

export default App
