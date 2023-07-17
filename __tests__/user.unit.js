const User = require('../api/Users/users-model');
const db = require('../data/db-config');

/*
describe bloğu: testleri gruplamak için kullanılır
desribe nested olarak kullanarak.
beforeAll, beforeEach, AfterAll, AfterEach

test('AÇIKLAMA', ()=>{... expect(...).MATCHER(...)})
birden fazla assertion kullanılabilir. hepsi doğru ise testi geçer.

test.todo('AÇIKLAMA').
test.skip('AÇIKLAMA', ()=>{...}) bu testi pas geçiyordu
test.only('AÇIKLAMA', ()=>{...}) sadece bu testi çalıştırır. (birden fazla kullanabiliriz)
*/

beforeAll(async ()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})

test('Sanity check', ()=> {
    expect(process.env.NODE_ENV).toBe('testing')
})

test('Boş testler PASS olarak geçer', ()=> {
    
})

describe('______ READ _____', ()=> {
    test('gets all users', async ()=>{
        const users = await User.getAll();
        expect(users).toHaveLength(3);
        expect(users[0]).toHaveProperty('first_name', 'Emre');
    })
    
    test('gets user by id', async ()=>{
        const user = await User.getById(1);
        expect(user).toHaveProperty('first_name', 'Emre');
        expect(user).not.toHaveProperty('password');
    })
    
    test('gets users by email', async ()=>{
        const user = await User.getByEmail("emre@wit.com.tr");
        expect(user).toHaveProperty('first_name', 'Emre');
        expect(user).toHaveProperty('password');
    })
    
    test('gets user by a spesific filter', async ()=>{
        const filter = {role_id: 2};
        const users = await User.getByFilter(filter);
        expect(users).toHaveLength(2);
    })
})


describe('______ CREATE ______', ()=> {  //! describe'da async yok!
    test('returns id', async ()=>{
        const user = {  first_name: 'Halil', 
                        last_name: 'Tekin', 
                        email: 'halil@wit.com.tr', 
                        password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.', 
                        role_id: 1}
    
        const recordedUser = await User.create(user);
        expect(recordedUser.id).toBe(4);
    })
    test('sets role_id to 2 if not given', async ()=>{
        const user = {  first_name: 'Halil', 
                        last_name: 'Tekin', 
                        email: 'halil@wit.com.tr', 
                        password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.'}
    
        const recordedUser = await User.create(user);
        expect(recordedUser.role_name).toBe('User');
    })
})

describe('______ UPDATE ______', ()=> {  //! describe'da async yok!
    test('updates first user', async ()=>{
        const user = {  first_name: 'Halil', 
                            last_name: 'Tekin', 
                            email: 'halil@wit.com.tr', 
                            password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.'}
        const updatedRowCount = await User.update(1,user);
        expect(updatedRowCount).toBe(1)
    })
    
    test('updates first user as expected', async ()=>{
        const user = {  first_name: 'Halil', 
                            last_name: 'Tekin', 
                            email: 'halil@wit.com.tr', 
                            password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.'}
        await User.update(1,user);
        const updatedUser = await User.getById(1);
        expect(updatedUser.email).toMatch(/halil/i);
    })
})

describe('______ DELETE ______', ()=> {  //! describe'da async yok!
    test('deletes inserted new user', async ()=>{
        const user = {  first_name: 'Halil', 
                            last_name: 'Tekin', 
                            email: 'halil@wit.com.tr', 
                            password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.'}
        const newUser = await User.create(user);
        const updatedRowCount = await User.remove(newUser.id);
        expect(updatedRowCount).toBe(1)
    })
    test('can not delete user id 1', async ()=>{
        try {
            await User.remove(1);
        }
        catch(err){
            expect(err.message).toMatch(/foreign/i);
        }
    })
})




