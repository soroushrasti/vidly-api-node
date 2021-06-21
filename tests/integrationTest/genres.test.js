const request = require('supertest')
const {Genre} = require('../../models/genre')

describe('DB',()=>{
    beforeEach(()=>{server=require('../../index')});
    afterEach(async()=>{
    server.close();
    await Genre.remove({});
    });
    describe('GET :/', ()=>{
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
    });
})
describe('GET :/id', ()=>{
    it('get genres if valid id is passed ', async()=>{
        const genre = new Genre({name:'genre1'});
        await genre.save()
        const res = await request(server).get('/api/genres/'+ genre._id)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id passed ', async()=>{

        const res = await request(server).get('/api/genres/'+ '1')
        expect(res.status).toBe(404);
    }); 
});
});
