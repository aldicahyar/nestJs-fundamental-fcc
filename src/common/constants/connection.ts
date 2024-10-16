export const connection: Connection = {
    CONNECTION_STRING: 'jdbc:postgresql://localhost:5433/postgres',
    DB: 'postgres',
    DBNAME: 'SPOTIFY-CLONE',
};
export type Connection = {
    CONNECTION_STRING: string;
    DB: string;
    DBNAME: string;
}