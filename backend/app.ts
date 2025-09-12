/// <reference types="node" />

import express from 'express'
import cors from 'cors'
import prisma from './connection.ts';
import { main } from './seed.ts';
import { log } from 'console';

// Middleware to parse JSON bodies
const app = express()
const port = process?.env?.PORT || 4000

app.use(express.json({
    urlencoded: true
}));

app.use(cors(
    {
        origin: process?.env?.URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
))

app.get('/api', async (req, res) => {
    log('API root accessed');
    return res.json({ message: 'Yea i ran!!' })

})

app.get('/api/seed', async (req, res) => {
    await main()
    return res.json({ message: 'Database seeded!' })

})

app.get('/api/all', async (req, res) => {
    const users = await prisma.user.findMany()
    return res.json(users)

})

app.post('/api', async (req, res) => {
    const body = req.body;
    console.log('Received body:', body);
    try {
        await prisma.user.create({
            data: {
                email: body.email,
                name: body.fullName,
                password: 'password123', // Hash this in real apps
            },
        });
        const users = await prisma.user.findMany()

        return res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

// Disconnect only on shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
