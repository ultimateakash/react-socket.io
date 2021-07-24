const env = process.env.NODE_ENV || 'development';

const config = { 
    development: {
        host: "localhost",
        database: "socket_crud",
        username: "root",
        password: "",
        dialect: "mysql",
        operatorsAliases: "false",
        logging: false
    },
    production: {
        host: "localhost",
        database: "socket_crud",
        username: "root",
        password: "",
        dialect: "mysql",
        operatorsAliases: "false",
        logging: false
    }
}

module.exports = { 
    ...config[env]
}
