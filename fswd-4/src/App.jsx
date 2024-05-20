import './App.css'

import TextEditor from './pages/textEditor/textEditor.jsx'
import Game from './pages/game/game.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/editor" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App
