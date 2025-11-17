import { useState, useEffect } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/items');
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Template WebApp</h1>
        <p>React + TypeScript + Vite + Node.js + SQLite</p>
      </header>
      
      <main className="App-main">
        <section className="items-section">
          <h2>Sample Items from Database</h2>
          
          {loading && <p>Loading...</p>}
          
          {error && <p className="error">Error: {error}</p>}
          
          {!loading && !error && items.length === 0 && (
            <p>No items found. Start the backend server to see data.</p>
          )}
          
          {!loading && !error && items.length > 0 && (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <footer className="App-footer">
        <p>Built with ❤️ using modern web technologies</p>
      </footer>
    </div>
  );
}

export default App;
