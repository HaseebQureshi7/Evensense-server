import { User } from '../../../domain/entities/User.entity';
import { UserRepository } from './../../../domain/repositories/UserRepository.repo';
export class UpdateUserUsecase {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    execute(uid:number, updatedUser:Partial<User>){
        const missingFields = ["uid", "updatedUser"].filter((field) => {
            !eval(field)
        })

        if (missingFields.length) {
            throw new Error(`Missing fields required: ${missingFields.join(",")}`)
        }

        return this.userRepository.updateUser(uid, updatedUser)
    }
}