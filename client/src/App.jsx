import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
}from 'react-router-dom';
import { getTemplates  } from "./api/templateApi";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { addFavorite,getFavorites } from "./api/favorite";
import Favorites from "./pages/Favorites";


function Home() {
  const [templates, setTemplates] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    getTemplates()
      .then((data) => setTemplates(data))
      .catch((err) => {
        console.error('Template fetch error:', err);
        setError(err.message);
      })
      .finally(()=> setLoading(false));
  },[]);

  useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) return;

  getFavorites()
    .then((data) => {
      setFavoriteIds(
        data.map((favorite) => favorite.template?._id)
      );
    })
    .catch((err) => {
      console.error('Favorites fetch error:', err);
    });
}, []);

  const handleFavorite = async (templateId) => {
    const token = localStorage.getItem('token');

    if(!token){
      alert('Please log in to add favorites.');
      return;
    }

    try{
      await addFavorite(templateId);

      setFavoriteIds((current) =>
        current.includes(templateId)
          ? current
          : [...current, templateId]
      );

      alert('Template added to favorites!');
    }catch(error){
      alert(
        error.response?.data?.message||
        'Unable to add favorite.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/favorites">My Favorites</Link>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Mini SaaS Template Store
      </h1>

      <p className="mb-8 text-gray-600">
        Discover templates for your next project.
      </p>

      {loading && <p>Loading templates...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template)=>(

        <div
          key={template._id}
          className="overflow-hidden rounded-xl bg-white shadow-md"
        >
          <img src={template.thumbnail_url} alt={template.name} className="h-48 w-full object-cover" />

          <div className="p-5">
            <span className="text-sm text-green-700">
              {template.category}
            </span>

            <h2 className="mt-2 text-xl font-semibold">
              {template.name}
            </h2>

            <p className="mt-2 text-gray-600">
              {template.description}
            </p>

            <button onClick={() => handleFavorite(template._id)} 
              className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800">
              {favoriteIds.includes(template._id)
                ? 'Added to Favorites'
                : 'Add to Favorites'}   
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>

  );
}

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;