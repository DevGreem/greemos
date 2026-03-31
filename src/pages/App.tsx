
import './App.css'
import { MemoryManager } from '$/core/MemoryManager'
import Desktop from '$/components/operative_system/desktop/Desktop';
import { TaskBar } from '$/components/operative_system/taskbar/TaskBar';

function App() {
  MemoryManager.init();
  console.log("Loaded memory");
  

  return (
    <main className="os">

      <Desktop/>

      <TaskBar/>
    </main>
  )
}

export default App
