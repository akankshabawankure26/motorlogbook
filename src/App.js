
import './App.css';
import Form from './Component/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogBook from './Component/LogBook';
import Header from './Component/Header';
import Home from './Component/Home';

function App() {
  return (

    <>
      <div className='App'>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/addrecord" element={<Form />} />
            <Route path="/logbook" element={<LogBook />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
