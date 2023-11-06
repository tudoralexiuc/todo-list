import { Route, Routes } from 'react-router-dom';
import ProofConcept from './components/ProofConcept';
import NewPage1 from './components/NewPage1';
import NewPage2 from './components/NewPage2';
import NewPage3 from './components/NewPage3';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProofConcept />} />
      <Route path="/newpage1" element={<NewPage1 />} />
      <Route path="/newpage2" element={<NewPage2 />} />
      <Route path="/newpage3" element={<NewPage3 />} />
    </Routes>
  );
}

export default App;
