import express from 'express';
import { PrismaClient } from '@prisma/client';
import {router as authRoutes} from './routes/authRoutes.js';
import {router as productRoutes} from './routes/productRoutes.js';
import {router as orderRoutes} from './routes/orderRoutes.js';
import {router as userRoutes} from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 
