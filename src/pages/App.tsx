
import './App.css'
import { MemoryManager } from '$/core/MemoryManager'
import Desktop from '$/components/operative_system/desktop/Desktop';
import { TaskBar } from '$/components/operative_system/taskbar/TaskBar';
import { useState } from 'react';
import type { WindowInfo } from '$/types/WindowInfo';
import { TaskBarIcon } from '$/components/operative_system/icons/TaskBarIcon';

function App() {
  MemoryManager.init();
  console.log("Loaded memory");
  
  const [apps, setApps] = useState<WindowInfo[]>([]);

  function addApp(appInfo: WindowInfo) {
    setApps(previous => [...previous, appInfo])
  }

  function removeApp(appId: number) {
    setApps(previous => previous.filter((window) => window.id !== appId))
  }

  return (
    <main className="os">

      <Desktop onOpenWindow={(window) => addApp(window)}
        onCloseWindow={(id) => removeApp(id)}
      />

      <TaskBar>
        {apps.map(app => {
          return <TaskBarIcon key={app.id} icon={app.icon}/>
        })}
      </TaskBar>
    </main>
  )
}

export default App
