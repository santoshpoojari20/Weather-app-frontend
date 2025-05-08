import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/weather?city=${city}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Could not fetch weather data. Try another city.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20250306/pngtree-a-stormy-sky-looms-over-lush-green-hills-illuminated-by-sunlight-image_17070269.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: '"Poppins", sans-serif',
      color: '#fff',
      textShadow: '1px 1px 2px #000',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />

      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: '600' }}>🌦️ Weather Info App</h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        justifyContent: 'center',
      }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            width: '280px',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
          }}
        />
        <button
          onClick={fetchWeather}
          disabled={loading || !city.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: loading || !city.trim() ? '#7f8c8d' : '#2980b9',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading || !city.trim() ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s ease',
          }}
          onMouseOver={(e) => !loading && city.trim() && (e.target.style.backgroundColor = '#1c5980')}
          onMouseOut={(e) => !loading && city.trim() && (e.target.style.backgroundColor = '#2980b9')}
        >
          {loading ? 'Please wait...' : 'Search'}
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: '#ffffffaa',
          color: '#000',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          fontWeight: '600',
        }}>
          <img
            src="https://i.gifer.com/ZZ5H.gif"
            alt="Loading"
            style={{ width: '24px', height: '24px' }}
          />
          Loading weather data...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#ff4d4daa',
          color: '#fff',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          maxWidth: '90%',
          textAlign: 'center',
          marginTop: '1rem',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Weather Info */}
      {weather && (
        <div style={{
          marginTop: '1rem',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          color: '#000',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          width: '300px',
        }}>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', fontWeight: '600' }}>{weather.city}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="icon"
            style={{ marginBottom: '0.5rem' }}
          />
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{weather.temperature}°C</p>
          <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>{weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
