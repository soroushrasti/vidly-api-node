const request = require('supertest')
const {Genre} = require('../../models/genre')

describe('DB',()=>{
    beforeEach(()=>{server=require('../../index')});
    afterEach(async()=>{
    server.close();
    await Genre.remove({});
    });
    describe('check genres db status', ()=>{
        it('test1',  async()=>{
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
        });    
    it('check genres length of db ', async()=>{
        await Genre.collection.insertMany([
            {name:'genre1'},
            {name:'genre2'}
        ])
        const res = await request(server).get('/api/genres')
        expect(res.body.length).toBe(2)
    })})
} )
