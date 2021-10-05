import { Document, Schema, model} from 'mongoose'
import { IUser } from '../interfaces/user.interface'

export interface UserModelInterface extends IUser, Document {
    fullName(): string
    emailVerified: boolean
}

export const UserSchema: Schema = new Schema({
    createdAt: Date,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    }
  });

UserSchema.pre("save", function(next) {
    let now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    this.emailVerified = false
    next();
});

UserSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
  
export default model<UserModelInterface>("User", UserSchema);