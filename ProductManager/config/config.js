import dotenv from 'dotenv'

// import { password } from 'pg/lib/defaults';

// environment = entorno
// en el entorno = 'DEVELOPMENT' usa la ruta PORT = 6000
// en el entorno = 'PRODUCTION' usa la ruta PORT = 8000
const environment = 'PRODUCTION';

// aca consulto la configuracion de las variables de entorno
dotenv.config({
    path: environment == 'PRODUCTION' ? './.env.production': './.env.development'

})

// y se exporta como un objeto de configuracion

const config = {

    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    user: process.env.USER,
    password: process.env.PASSWORD

}
console.log(config)

export default config