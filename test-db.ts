import { createConnection } from 'typeorm';

    async function testConnection() {
      try {
        const connection = await createConnection({
          type: 'postgres',
          url: 'postgresql://neondb_owner:npg_sH6Szw9lcVha@ep-lucky-smoke-aglllzyg-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
          ssl: { rejectUnauthorized: false },
        });
        console.log('Connected to Neon DB!');
        const vehicles = await connection.query('SELECT * FROM vehicles');
        console.log('Vehicles:', vehicles);
        await connection.close();
      } catch (error) {
        console.error('Error:', error);
      }
    }

    testConnection();