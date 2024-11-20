import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { createClient } from '@libsql/client';
import { swagger } from '@elysiajs/swagger'
import { main, leaderboard } from './layout/main';


const db = createClient({
    url: "file:local.db",
    syncUrl: "leaderboard-benjaminp7--sn9knd.aws-eu-west-3.turso.io",
    // I know, but still, it's a dummy token, don't worry :)
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzIxMzQ0MDAsImlhdCI6MTczMjEzMDgwMCwiaWQiOiI1YmUxYzIxMy01MTY4LTQ4ZTYtYjU0YS1mMTA1MjBjMmVlM2QifQ.Ri5C-yI9Nd6JnQPsK3zUjD2OOharKmTsfI7fzFFNVoCuxN6H2CfmyvcyO4ugxYUt6E0AsQL90QIr97YnsHAWBQ",
});


const app = new Elysia()
    .use(html())
    .use(swagger())
    .onError(({ error, code }) => {
        if (code === 'NOT_FOUND') return

        console.error(error)
    })
    .get('/', async () => {
        const laps = await db.execute('SELECT * FROM laps ORDER BY timing DESC LIMIT 10');
        return main(leaderboard(laps.rows));
    })
    .post('/add-timing', async ({ body }) => {
        const { name, timing, track } = body as any;
        await db.execute({
            sql: 'INSERT INTO laps (name, timing, track) VALUES (?, ?, ?)',
            args: [name, timing, track]
        });
        const laps = await db.execute('SELECT * FROM laps ORDER BY timing DESC LIMIT 10');
        return leaderboard(laps.rows);
    })
    .listen(3000);

console.log('Server running at http://localhost:3000');
