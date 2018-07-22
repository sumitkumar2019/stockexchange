// Update with your config settings.

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host : 'ec2-54-204-18-53.compute-1.amazonaws.com',
            user : 'caqdvjfhsznbpp',
            password : 'f52e92bbb9ca7d7ca08a3b93254a38fd29f666defb302a12a629acc0540705d1',
            database : 'd1psftfsviir4l'
        },
        migrations:{
            directory:'../migrations'
        },
        seeds:{
            directory: '../seeds'
        }
    }
};
