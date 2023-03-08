import { AppRouter } from './main/routes/AppRouter';
import {AuthProvider} from './main/auth/AuthProvider'

function App() {



  return (
    <AuthProvider>
	  <AppRouter/>
    </AuthProvider>
  )


}



export default App;
