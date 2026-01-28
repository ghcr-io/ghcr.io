// App.tsx
import { StrictMode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

// Context API for state management
import { AppProvider, AppContext } from './AppContext';

// Components
function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h2 className="text-3xl text-blue-500">Home Page</h2>
    </div>
  );
}

function About() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <h2 className="text-3xl text-green-500">About Page</h2>
    </div>
  );
}

function Counter() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Counter must be used within an AppProvider');
  }

  const { count, increment } = context;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <p className="text-xl mb-4">Count: {count}</p>
        <button
          onClick={increment}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Increment
        </button>
      </div>
    </div>
  );
}

function DataFetching() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Fetched Data:</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <nav className="bg-blue-600 text-white p-4">
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/about" className="mr-4">About</Link>
            <Link to="/counter" className="mr-4">Counter</Link>
            <Link to="/data" className="mr-4">Data Fetching</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/data" element={<DataFetching />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
