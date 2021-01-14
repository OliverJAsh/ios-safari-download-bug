const path = require("path");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(
    `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
      window.now = () => {
        fetch("/ping");

        const img = document.createElement('img');
        img.src = "/bug.png";
        document.body.appendChild(img)
      }
    </script>
    <a href="/file" download onclick="window.now()">download</a>
  `
  );
});

app.get("/file", (req, res) => {
  res.set("Content-Disposition", 'attachment; filename="test.json"');
  res.send();
});

app.get("/ping", (req, res) => {
  setTimeout(() => {
    res.send("pong");
  }, 1000);
});

app.get("/bug.png", (req, res) => {
  res.sendFile(path.join(__dirname, "./bug.png"));
});

app.listen(process.env.PORT, () => console.log("running"));
