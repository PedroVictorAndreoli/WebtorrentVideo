import { useState } from 'react';
import './playerVideo.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'; // Importa o indicador de carregamento
import { styled } from '@mui/system';

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'green',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

function App() {
  const [magnetURI, setMagnetURI] = useState('');
  const [loading, setLoading] = useState(false); // Adiciona estado de carregamento

  const handleSubmit = async () => {
    setLoading(true); // Define o estado de carregamento como verdadeiro
    try {
      const api = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${api}/add-magnet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ magnetURI }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Magnet URI submitted successfully', data);
        window.location.reload();
      } else {
        console.error('Failed to submit Magnet URI');
      }
    } catch (error) {
      console.error('Error submitting Magnet URI:', error);
    } finally {
      setLoading(false); // Define o estado de carregamento como falso
    }
  };

  return (
    <div className="container">
      <div className="form-controls">
        <div id="outlined-basic">
          <CustomTextField
            fullWidth
            sx={{ m: 1 }}
            label="MagnetURI"
            variant="outlined"
            color="success"
            size="small"
            value={magnetURI}
            onChange={(e) => setMagnetURI(e.target.value)}
          />
        </div>
        {loading ? (
          <CircularProgress color="success" />
        ) : (
          <Button variant="contained" color="success" size="small" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
      <video
        id="videoPlayer"
        className="video-js"
        controls
        preload="auto"
        data-setup='{"playbackRates": [1, 1.5, 2] }'
      >
        <source src={`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/video`} type="video/mp4" />
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a web browser that
          <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
      </video>
    </div>
  );
}

export default App;
