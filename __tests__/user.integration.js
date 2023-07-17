const server = require('../api/server');
const request = require('supertest'); 
const db = require('../data/db-config');

/*
 request(server).METHOD(URL)  => response olarak header, body, status
                            .send(PAYLOAD) body'de bilgi yollar
                            .set(KEY, VALUE) header'da key&value paris yollar
 Örn:
    request(server).get(URL)
    request(server).post(URL).send(PAYLOAD).set(KEY,VALUE)
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

const newUser = {
    first_name: 'Halil', 
    last_name: 'Kalkan', 
    email: 'halil@wit.com.tr', 
    password: '1234'};

describe('_____ AUTH ______', ()=>{
    describe('registers new user as expected', ()=> {
        test('creates a new user', async ()=> {
            const res = await request(server).post('/api/auth/register').send(newUser);
            expect(res.status).toBe(201);
            expect(res.body.message).toMatch(/halil/i); 
        })
        test('hashes password', async ()=> {
            await request(server).post('/api/auth/register').send(newUser);
            const recordedUser = await db('Users').where('email', newUser.email).first();
            expect(recordedUser.password).not.toBe('1234');
        })
    })
    describe('token required services', ()=> {
        let token;
        beforeEach(async ()=> {
            const res = await request(server).post('/api/auth/login').send({email:"emre@wit.com.tr", password:"1234"});
            token = res.body.token;
        })

        test('user can login', async ()=> {
            expect(token).toBeDefined();
        })

        test('user can logout', async ()=> {
            await request(server).get('/api/auth/logout').set('authorization', token);
            const res = await request(server).get('/api/users').set('Authorization', token);
            expect(res.status).toBe(403);
        })
    
    })

    
})