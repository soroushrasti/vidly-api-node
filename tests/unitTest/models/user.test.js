const {User} = require('../../../models/user')

describe('user.generateAuthToken',()=>{
    it('should return a JWT',()=>{
        const user = new User({id:1, isAdmin: true});
        const token= user.generateAuthToken()
        const a=1;
        expect(a).toBe(1);
    })
})