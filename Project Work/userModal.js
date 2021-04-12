const bcrypt = require('bcryptjs');
const pool = require('./db');

const findUser = (body) => {
    return new Promise(function (resolve, reject) {
        const {search} = body;
        pool.query(`SELECT username, usertype FROM users WHERE username LIKE '${search}%' and '${search}'<>'';`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getUsers = (body) => {
    return new Promise(function (resolve, reject) {
        const { user, pwd } = body;
        pool.query(`SELECT * FROM users WHERE username = '${user}';`, async (error, results) => {
            if (error) {
                reject(error);
            }
        
            if (results.rows.length > 0) {
                const user = results.rows[0];
                bcrypt.compare(pwd, user.password, (err, isMatch) => {
                    if (err) {
                        reject(err);
                    }
                    if (isMatch) {
                        resolve(user);
                    } else {
                        resolve(undefined);;
                    }
                });
            } else {
                resolve(undefined);
            }
        });
    });
};

const addUsers = (body) => {
    return new Promise(function (resolve, reject) {
        const { user, pwd } = body;
        pool.query(`SELECT * FROM users WHERE username = '${user}';`, async (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length === 0) {
                const hashpwd = await bcrypt.hash(pwd, 10);
                pool.query(`INSERT INTO users VALUES ('${user}','${hashpwd}', 2) RETURNING username, password;`, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.rows.length > 0) {
                        const user = result.rows[0];
                        resolve(user);
                    } else {
                        resolve(undefined);
                    }
                });
            } else {
                resolve(undefined);
            }
        });
    });
};

const changepwd = (body) => {
    return new Promise(function (resolve, reject) {
        const { user, newpwd } = body;
        pool.query(`SELECT * FROM users WHERE username = '${user}';`, async (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                const hashpwd = await bcrypt.hash(newpwd, 10);
                pool.query(`UPDATE users SET password = '${hashpwd}' WHERE username = '${user}' RETURNING username, password;`, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.rows.length > 0) {
                        const user = result.rows[0];
                        resolve(user);
                    } else {
                        resolve(undefined);
                    }
                });
            } else {
                resolve(undefined);
            }
        });
    });
};

const upgradeUser = (body) => {
    return new Promise(function(resolve, reject){
        const { username, usertype } = body;
        pool.query(`UPDATE users SET usertype = '${usertype - 1}' WHERE username = '${username}' RETURNING username, password;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.rows.length > 0) {
                const user = results.rows[0];
                resolve(user);
            } else {
                resolve(undefined);
            }
        })
    })
}

const downgradeUser = (body) => {
    return new Promise(function (resolve, reject) {
        const { username, usertype } = body;
        pool.query(`SELECT COUNT(*) FROM users WHERE usertype = '${usertype}';`, async (err, res) => {
            if (err) {
                reject(err);
            }
            if (res.rows[0].count > 1) {
                pool.query(`UPDATE users SET usertype = '${usertype + 1}' WHERE username = '${username}' RETURNING username, password;`, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results.rows.length > 0) {
                        const user = results.rows[0];
                        resolve(user);
                    } else {
                        resolve(undefined);
                    }
                })
            } else {
                resolve(undefined);
            }

        })
    })
}

module.exports = {
    getUsers,
    addUsers,
    changepwd,
    findUser,
    upgradeUser,
    downgradeUser
};