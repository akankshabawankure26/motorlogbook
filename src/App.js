
import './App.css';
import Form from './Component/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogBook from './Component/LogBook';
import Home from './Component/Home';
import UnApprovedLog from './Component/UnApprovedLog';
import Login from './Component/Login';
import Statement from './Component/Statement';

function App() {
  return (

    <>
      <div className='App'>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
            <Route path="/addrecord" element={<Form />} />
            <Route path="/logbook" element={<LogBook />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/unapprovedlog" element={<UnApprovedLog />} />

          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
