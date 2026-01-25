import WebTorrent from 'webtorrent';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const client = new WebTorrent();
let currentFile = null;

app.post('/add-magnet', (req, res) => {
    const magnetURI = req.body.magnetURI;
    if (!magnetURI) {
        return res.status(400).send('magnetURI is required');
    }

    if (currentFile) {
        currentFile = null;
    }

    client.add(magnetURI, (torrent) => {
        console.log('Torrent info hash:', torrent.infoHash);

        torrent.on('done', () => {
            console.log('Download concluído');

            res.send({ message: 'Torrent adicionado com sucesso', infoHash: torrent.infoHash });
        });

        const file = torrent.files.find((file) => file.name.endsWith('.mp4'));
        if (file) {
            currentFile = file;
            app.get('/video', (req, res) => {
                const range = req.headers.range;
                if (range) {
                    const positions = range.replace(/bytes=/, "").split("-");
                    const start = parseInt(positions[0], 10);
                    const end = positions[1] ? parseInt(positions[1], 10) : file.length - 1;
                    const chunksize = (end - start) + 1;

                    res.writeHead(206, {
                        'Content-Range': 'bytes ' + start + '-' + end + '/' + file.length,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/mp4'
                    });

                    const stream = file.createReadStream({ start, end });

                    stream.on('error', (err) => {
                        console.error('Erro no stream:', err.message);
                        res.status(500).end('Erro no servidor durante o streaming');
                    });

                    req.on('close', () => {
                        console.log('Conexão do cliente encerrada');
                        stream.destroy();
                    });

                    stream.pipe(res);
                } else {
                    res.status(416).send('Range header missing');
                }
            });
        }

        torrent.on('error', (err) => {
            console.error('Erro durante o download:', err.message);
        });
    });

    client.on('error', (err) => {
        console.error('Erro do cliente:', err.message);
        res.status(500).send('Erro ao adicionar o torrent');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});