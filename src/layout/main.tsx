export function main(content: string) {
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Leaderboard</title>
        <script src="https://unpkg.com/htmx.org@2.0.3"></script>
      <style>
        body { 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 2rem;
          font-family: system-ui;
        }
        .leaderboard {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
        .player {
          display: grid;
          grid-template-columns: auto 1fr auto;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }
        .rank {
          font-weight: bold;
          margin-right: 1rem;
        }
        .timing {
          text-align: right;
        }
        form {
          margin-bottom: 2rem;
        }
      </style>
    </head>
    <body>
      <h1>Leaderboard</h1>
      <form hx-post="/add-timing" hx-target="#leaderboard">
        <input type="text" name="name" placeholder="Player name" required>
        <input type="number" name="timing" placeholder="timing" required>
        <input type="text" name="track" placeholder="track" required>
        <button type="submit">Ajouter un temps</button>
      </form>
      <div id="leaderboard">
        ${content}
      </div>
    </body>
    </html>
  `;
}

export function leaderboard(laps: any[]) {
    return `
    <div class="leaderboard">
      ${laps.map((laps, index) => `
        <div class="laps">
          <span class="rank">#${index + 1}</span>
          <span class="name">${laps.name}</span>
          <span class="timing">${laps.timing}</span>  
          <span class="track">${laps.track}</span>  
        </div>
      `).join('')}
    </div>
  `;
}