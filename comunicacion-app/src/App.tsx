import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AudioPage } from './pages/AudioPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/imagen" element={<div>Vista de Imágenes (En construcción)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;