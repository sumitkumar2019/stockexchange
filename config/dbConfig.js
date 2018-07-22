// Update with your config settings.

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host : 'localhost',
            user : 'postgres',
            password : 'xxxxxx',
            database : 'xxxxxx'
        },
        migrations:{
            directory:'../migrations'
        },
        seeds:{
            directory: '../seeds'
        }
    }
};
