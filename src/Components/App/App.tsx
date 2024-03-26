import { RouterProvider } from 'react-router-dom';
import Routing from './Routing/Routing';

function App() {
  return <RouterProvider router={Routing()} />;
}

export default App;
