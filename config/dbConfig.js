// Update with your config settings.

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host : 'localhost',
            user : 'postgres',
            password : 'postgres',
            database : 'postgres'
        },
        migrations:{
            directory:'../migrations'
        },
        seeds:{
            directory: '../seeds'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host : 'ec2-174-129-192-200.compute-1.amazonaws.com',
            user : 'sivpdezuayldke',
            password : '527c3588e5caba0b88487a39678cf9ca9dc777cab1d77f901ce3ad3ca65019ad',
            database : 'dj714rs23jept'
        },
        migrations:{
            directory:'../migrations'
        },
        seeds:{
            directory: '../seeds'
        }
    }

};
