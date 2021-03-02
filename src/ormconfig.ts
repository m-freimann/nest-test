import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'api',
  password: process.env.POSTGRES_PASSWORD || 'pwd',
  database: process.env.POSTGRES_DB || 'db',
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  // logging: true,

  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
