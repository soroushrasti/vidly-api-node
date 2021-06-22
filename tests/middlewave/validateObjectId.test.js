const request = require('supertest')
const {Genre} = require('../../models/genre')
const {User} = require('../../models/user')

describe('DB',()=>{
    let server;
    beforeEach(()=>{server=require('../../index')});
    afterEach(async()=>{
    await server.close();
    await Genre.remove({});
    });
    describe('POST :/', ()=>{
        it('return 404 if customer is invalid',  async()=>{
            const res = await request(server)
            .post('/api/genres')
            .send({name:'genre1'})
            expect(res.status).toBe(200)
        });    
        it('return 400 if genre is invalid short',  async()=>{
            const token= new User().generateAuthToken()

            const res = await request(server)
            .post('/api/genres')
            .set('x-auth-token',token)
            .send({name:'123'})
            expect(res.status).toBe(400)
        }); 
        it('return 400 if genre is invalid vry long',  async()=>{
            const token= new User().generateAuthToken()
            const name= new Array(52).join('a')
            const res = await request(server)
            .post('/api/genres')
            .set('x-auth-token',token)
            .send({name:name})
            expect(res.status).toBe(400)
        }); 
})
})