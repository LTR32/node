
const dbconn = require('../connect');

function deleteUser(callback) {
    dbconn.query('DELETE FROM user where id=2', [], function (err, results) {
        if (err) {
            throw err;
        }

        console.log(results);

        return callback(results);
    })
}

module.exports = async (request, h) => {
    return deleteUser;
    }