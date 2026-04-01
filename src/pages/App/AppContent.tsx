
import './App.css'
import Desktop from '$/components/operative_system/desktop/Desktop';
import { TaskBar } from '$/components/operative_system/taskbar/TaskBar';

function AppContent() {

  return (
    <main className="os">

        <Desktop/>
        <TaskBar/>
        
    </main>
  )
}

export default AppContent
