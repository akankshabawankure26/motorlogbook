
import './App.css';
import Form from './Component/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogBook from './Component/LogBook';

function App() {
  return (

    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/logbook" element={<LogBook />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
