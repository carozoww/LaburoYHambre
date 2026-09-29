import 'dotenv/config';

import app from './app.js';
import { connectMongoDB } from './database/conection.js';

const PORT = process.env.PORT || 3000;

try {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET es obligatorio');
  await connectMongoDB();

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
}
