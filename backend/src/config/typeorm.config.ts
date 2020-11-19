import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const typeormConfig:TypeOrmModuleOptions = {
    type:'mongodb',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    password: process.env.TYPEORM_PASSWORD,
    username: process.env.TYPEORM_USERNAME,
    database: process.env.TYPEORM_DATABASE,
    poolSize: 1,
    loggerLevel: 'info',
    logging:true,
    useUnifiedTopology: true,
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/**/migrations/**/*.{ts,js}'],
    subscribers:['dist/**/*.subscriber.{ts,js}'],
    cli: {
        entitiesDir: 'dist/infra/orms',
        migrationsDir: 'dist/infra/orms/migrations'
    },
    synchronize: true,
    ssl: true,
    authSource: 'admin',
    useNewUrlParser: true,
    readPreferenceTags:['readWriteAnyDatabase@admin']
};