const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Run NPM Start</title>
    </head>
    <body>
        <button id="startButton">Start NPM</button>
        <p id="output"></p>

        <script>
            document.getElementById('startButton').addEventListener('click', () => {
                fetch('/start-npm')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('output').innerText = data;
                    })
                    .catch(error => {
                        document.getElementById('output').innerText = \`Error: \${error}\`;
                    });
            });
        </script>
    </body>
    </html>
  `;
  res.send(html);
});

app.get('/start-npm', (req, res) => {
  exec('npm start', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
    res.send(`stdout: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});