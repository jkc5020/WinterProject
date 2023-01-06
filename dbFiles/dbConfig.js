const config = {
    host: "localhost",
    user: 'jcummings',
    password: 'foo',
    server: 'JARONSLAPTOP',
    database: 'WinterProject',
    options:{
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS',
    },
    port: 1433 
}

module.exports = config;