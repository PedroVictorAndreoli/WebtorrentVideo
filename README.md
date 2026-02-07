# WebTorrent Video Streaming

Stream videos in the browser using magnet links. This project delivers progressive playback of `.mp4` files with a React/Vite frontend and a Node/Express + WebTorrent backend that supports HTTP Range requests for instant playback.

![Frontend running](https://github.com/user-attachments/assets/dbaf1e6a-b3c1-40d5-91ff-cde1e1dc7317)

## Features

- Magnet link input and on-demand video playback
- Progressive streaming with HTTP Range support
- Simple, clean UI for quick testing

## Tech Stack

- Frontend: React, Vite, TypeScript, MUI
- Backend: Node.js, Express, WebTorrent

## Prerequisites

- Node.js (LTS recommended) — download at https://nodejs.org/

## Getting Started

Install dependencies from the project root:

```sh
npm install
```

## Running the Frontend

```sh
npm run dev
```

The frontend runs at http://localhost:5173 by default.

## Running the Backend

```sh
npm run start
```

The backend runs at http://localhost:3001 by default.

## Usage

1. Start the backend.
2. Start the frontend.
3. Paste a magnet link for an `.mp4` file and play the video.

## Configuration

### Change the supported file extension

By default, the backend looks for `.mp4` files in the torrent. To change this, edit the extension in the backend file:

![Change extension](https://github.com/user-attachments/assets/907e6135-ac55-4c68-a9bd-299f0c09ded5)

## Notes

- If you want to load a different torrent, restart the backend server.

## Scripts

- `npm run dev` — start the frontend
- `npm run start` — start the backend
- `npm run build` — build the frontend
- `npm run preview` — preview the production build
