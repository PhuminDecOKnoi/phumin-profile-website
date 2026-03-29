# Personal Profile Website

A lightweight personal profile website built with Node.js, Express, and static HTML/CSS/JS.

## Project Structure

```text
.
├── package.json
├── README.md
├── server.js
└── public
    ├── css
    │   └── styles.css
    ├── index.html
    └── js
        ├── data.js
        └── main.js
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Open your browser:

   ```text
   http://localhost:3000
   ```

## Customization

- Update placeholder content in `public/js/data.js`.
- Adjust colors, spacing, and layout in `public/css/styles.css`.
- Modify page structure in `public/index.html`.
- Change the port in `server.js` if needed.

## Notes

- The app uses a thin Express server to serve static assets.
- Content is kept in one frontend data file to make personal updates quick and low-risk.
- The design is responsive, keyboard accessible, and lightweight.
