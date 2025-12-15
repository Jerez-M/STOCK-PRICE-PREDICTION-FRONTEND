import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import TopNav from './components/TopNav';
import HomePage from './pages/HomePage';
import PredictionPage from './pages/PredictionPage';
import StockAnalysisPage from './pages/StockAnalysisPage';
import DocumentationPage from './pages/DocumentationPage.jsx';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 6,
          colorBgContainer: '#ffffff',
        },
      }}
    >
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <TopNav />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/predict" element={<PredictionPage />} />
              <Route path="/stock/:symbol" element={<StockAnalysisPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;