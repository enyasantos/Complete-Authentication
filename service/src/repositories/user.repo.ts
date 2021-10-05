import UserSchema from '../models/user.model'
import { IUser } from '../interfaces/user.interface'

class UserRepo {
    public async findAll() {
        return await UserSchema.find()
    }
    
    public async findById(id: string){
        return UserSchema.findOne({_id: id})
    }

    public async findByProperty(property: string | number){
        return UserSchema.findOne({ property })
    }

    public async findByEmail(email: string ){
        return UserSchema.findOne({ email })
    }

    public async create(data: IUser) {
        return UserSchema.create(data)
    }

    public async updatePropertyById(id: string, property: object) {
        return await UserSchema.findOneAndUpdate(
            { _id: id },
            property,
            { new: true }
        )
    }
}

export default new UserRepo()
