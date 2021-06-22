const request = require('supertest')
const {Rental} = require('../../models/rental')
const mongoose = require('mongoose')
const {User} = require('../../models/user')
const date = require('joi/lib/types/date')

describe('/api/return',()=>{
    let rental;
    let customer_id;
    let movie_id;
    let server;
    let token;
    const exec = ()=>{
        return  request(server)
        .post('/api/returns')
        .set('x-auth-token',token)
        .send({customer_id:customer_id,movie_id:movie_id})
    }
    beforeEach(async()=>{server=require('../../index');
    customer_id=  mongoose.Types.ObjectId();
    movie_id=  mongoose.Types.ObjectId();
    token= new User().generateAuthToken()

     rental= new Rental({customer:{
         name:'12345',
         phone:'12345',
         _id:customer_id
     },
     movie:{
         _id:movie_id,
         title:'12345',
         dailyRentalRate:2
     }
    });
    await rental.save();
});
    afterEach(async()=>{
    await server.close();
    await Rental.remove({});
    });
    
    it('should work ', async()=>{
        const res = await Rental.findById(rental._id)
        expect(res).not.toBeNull()
    });
    it('return 401 if customer is invalid',  async()=>{
        token=''
        const res = await exec()
        expect(res.status).toBe(401)
    });  
    it('return 400 if customer_is not provided',  async()=>{
        movie_id=''
        const res = await exec()
        expect(res.status).toBe(400)
    }); 
    it('return 400 if movie_id not provided',  async()=>{
        customer_id=''
        const res = await exec()
        expect(res.status).toBe(400)
    }); 
    it('return 404 if movie_id and customer_id are wrong ',  async()=>{
        await Rental.remove({})
        const res = await exec()
        expect(res.status).toBe(400)
    }); 
    it('return 400 if rental in process',  async()=>{
        rental.dateReturned= new Date()
        await rental.save()
        const res = await exec()
        expect(res.status).toBe(401)
    });  
})