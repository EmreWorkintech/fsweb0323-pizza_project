const db = require('../../data/db-config');

const getAll = ()=> {
    return db('Users as u')
                .join('Roles as r', 'u.role_id', 'r.id')
                .select(
                        'u.id',
                        'first_name',
                        'last_name',
                        'email',
                        'r.name as role_name')  // [ ... ]
}

const getById = (id) => {
    return db('Users as u')
                .join('Roles as r', 'u.role_id', 'r.id')
                .where('u.id', id)
                .select(
                        'u.id',
                        'first_name',
                        'last_name',
                        'email',
                        'r.name as role_name')
                .first() // { ... }
}

const getByEmail = (email) => {
    return db('Users as u')
                .join('Roles as r', 'u.role_id', 'r.id')
                .where('email', email)
                .select(
                        'u.id',
                        'first_name',
                        'last_name',
                        'email',
                        'password',
                        'r.name as role_name')
                .first() // { ... }
}

const getByFilter = (filter) => {
    return db('Users as u')
                .join('Roles as r', 'u.role_id', 'r.id')
                .where(filter)
                .select(
                        'u.id',
                        'first_name',
                        'last_name',
                        'email',
                        'r.name as role_name')  // [ ... ]
}

const remove = (id) => {
    return db('Users')
                .where('id', id)
                .delete()  //count of affected row/s  => 1
}

const create = async (payload) => {
    const [ id ] = await db('Users').insert(payload);
    return getById(id);  //id
}

const update = (id, payload) => {
    return db('Users')
                .where('id', id)
                .update(payload)
}

module.exports = {
    getAll,
    getById,
    getByFilter,
    remove,
    create,
    update,
    getByEmail
}