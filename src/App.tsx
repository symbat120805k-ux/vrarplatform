import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { TablePage } from './pages/TablePage'
import { AllElementsPage } from './pages/AllElementsPage'
import { ElementPage } from './pages/ElementPage'
import { ScanPage } from './pages/ScanPage'
import { LessonsIndexPage } from './pages/LessonsIndexPage'
import { LessonPage } from './pages/LessonPage'
import { TestsIndexPage } from './pages/TestsIndexPage'
import { QuizPage } from './pages/QuizPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tests" element={<TestsIndexPage />} />
        <Route path="/tests/:quizId" element={<QuizPage />} />
        <Route path="/lessons" element={<LessonsIndexPage />} />
        <Route path="/lessons/:slug" element={<LessonPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/all-elements" element={<AllElementsPage />} />
        <Route path="/element/:number" element={<ElementPage />} />
        <Route path="/scan/:number" element={<ScanPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
