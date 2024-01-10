import { useEffect, useRef, useState } from 'react';
import Article from './components/Article';

import './App.css'

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);

    const url = `http://hn.algolia.com/api/v1/search?query=${query}`;

    async function fetchArticles() {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.hits);
      setLoading(false);
    }

    setTimeout(() => {
      fetchArticles();
    }, 2000);
    fetchArticles();

  }, [query]);

  function handleSearch() {
    // The inputRef points to the <input /> DOM element
    setQuery(inputRef.current.value);
  }

  return (
    <>
      <div>
        {loading ? <div>Loading...</div>
        :
        (
          <>
          <input ref={inputRef} type="text" placeholder='search...' />
          <button onClick={handleSearch}>Search</button>
          {articles.map(article => <Article key={article.id} article={article} />)}
          </>
        )}
       
      </div>
    </>
  )
}

export default App;
