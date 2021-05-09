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

const getManager = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT username from users WHERE usertype = 1;`, (error, results) => {
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
                    if (results !== undefined) {
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
                    if (results !== undefined) {
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
            if (results !== undefined) {
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
                    if (results !== undefined) {
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

const findProjects = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM projects;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                resolve(results.rows);
            } else {
                resolve(undefined);
            }
        });
    });
};

const findProject = (body) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM projects WHERE id='${body.tempId}';`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                resolve(results.rows[0]);
            } else {
                resolve(undefined);
            }
        });
    });
};

const addProject = (body) => {
    const { id, projectname, deadline, manager, team, description, image } = body;
    return new Promise(function (resolve, reject) {
        pool.query(`INSERT INTO projects( img, project_title, team_assigned, project_manager, project_description, projectdeadline) VALUES ('${image}','${projectname}',${team},'${manager}','${description}','${deadline}') RETURNING id, img, project_title, team_assigned, project_manager, project_description, projectdeadline;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                resolve(results.rows[0]);
            } else {
                resolve(undefined);
            }
        });
    });
};

const updateProject = (body) => {
    const { id, projectname, deadline, manager, team, description, image } = body;

    return new Promise(function (resolve, reject) {
        pool.query(`UPDATE projects SET img = '${image}', project_title = '${projectname}', team_assigned = ${team}, project_manager = '${manager}', project_description = '${description}', projectdeadline = '${deadline}' WHERE id='${id}' RETURNING id, img, project_title, team_assigned, project_manager, project_description, projectdeadline;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                resolve(results.rows[0]);
            } else {
                resolve(undefined);
            }
        });
    });
};

const deleteProject = (body) => {
    return new Promise(function (resolve, reject) {
        pool.query(`DELETE FROM projects WHERE id='${body.id}' RETURNING id;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                resolve(results.rows[0]);
            } else {
                resolve(undefined);
            }
        });
    });
};

const getNote = (body) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM notes;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                resolve(results.rows);
            } else {
                resolve(undefined);
            }
        });
    });
};

const addNote = (body) => {
    const { title, text, lastModified, username } = body; 
    return new Promise(function (resolve, reject) {
        pool.query(`INSERT INTO notes(notetitle, notetext, lastmodified, username) VALUES ('${title}','${text}','${lastModified}','${username}') RETURNING noteid, notetitle, notetext, lastmodified, username;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                for (let i in results.rows) {
                    console.log(i);
                }
                resolve(results.rows);
            } else {
                resolve(undefined);
            }
        });
    });
};

const deleteNote = (body) => {
    const { idToDelete } = body;
    return new Promise(function (resolve, reject) {
        pool.query(`DELETE FROM notes WHERE noteid = '${idToDelete}' RETURNING noteid;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                resolve(results.rows);
            } else {
                resolve(undefined);
            }
        });
    });
};

const updateNote = (body) => {
    return new Promise(function (resolve, reject) {
        pool.query(`UPDATE notes SET notetitle = '${body.notetitle}', notetext = '${body.notetext}', lastmodified = '${body.lastmodified}', username = '${body.username}' WHERE noteid = '${body.noteid}' RETURNING noteid, notetitle, notetext, lastmodified, username;`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results !== undefined) {
                results.rows.forEach(row => {
                    console.log(row);
                });
                resolve(results.rows[0]);
            } else {
                resolve(undefined);
            }
        });
    });
};


module.exports = {
    getUsers,
    getManager,
    addUsers,
    changepwd,
    findUser,
    upgradeUser,
    downgradeUser,
    findProjects,
    findProject,
    addProject,
    updateProject,
    deleteProject,
    getNote,
    addNote,
    deleteNote,
    updateNote
};