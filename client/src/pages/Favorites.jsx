
import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/favorite';
import { Link, useNavigate } from 'react-router-dom';

function Favorites() {
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login');
  }
}, [navigate]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    }catch (err) {
      console.log('Favorites error:', err.message);
      console.log('Response:', err.response?.data);
      setError(
         err.response?.data?.message ||err.message ||
    'Unable to load favorites.'
  );
}finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (templateId) => {
    try {
      await removeFavorite(templateId);
      setFavorites((current) =>
        current.filter(
          (favorite) => favorite.template?._id !== templateId
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to remove favorite.'
      );
    }
  };

  if (loading) {
    return <p className="p-8">Loading favorites...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex gap-4">
        <Link to="/" className="text-green-700 hover:underline">
          Home
        </Link>
        <Link to="/favorites" className="text-green-700 hover:underline">
          My Favorites
        </Link>
      </nav>

      <h1 className="mb-6 text-3xl font-bold">
        My Favorites
      </h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      {!error && favorites.length === 0 && (
        <p className="text-gray-600">
          You haven't added any favorites yet.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => {
          const template = favorite.template;

          if (!template) return null;

          return (
            <div
              key={favorite._id}
              className="overflow-hidden rounded-xl bg-white shadow-md"
            >
              <img
                src={template.thumbnail_url}
                alt={template.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {template.name}
                </h2>

                <p className="mt-2 text-gray-600">
                  {template.description}
                </p>

                <button
                  onClick={() => handleRemove(template._id)}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Remove Favorite
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
