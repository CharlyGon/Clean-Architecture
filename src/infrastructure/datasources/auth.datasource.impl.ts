import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type hashFunction = (password: string) => string;
type compareFunction = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {

    constructor(
        private readonly hashPassword: hashFunction = BcryptAdapter.hash,
        private readonly comparePassword: compareFunction = BcryptAdapter.compare
    ) { }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        try {

            //1. Validate if email exists
            const { email, password } = loginUserDto;
            const user = await UserModel.findOne({ email: email });
            if (!user) throw CustomError.notFound('User not found');

            //2. Compare passwords
            const isPasswordValid = this.comparePassword(password, user.password);
            if (!isPasswordValid) throw CustomError.unauthorized('Invalid password');

            //3. map to entity
            return UserMapper.userEntityFromObject(user);

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer;
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {

            //1. Validate if email already exists
            const exists = await UserModel.findOne({ email: email });
            if (exists) throw CustomError.badRequest('User already exists');

            //2. hash password
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });

            await user.save();

            //3. map to entity
            return UserMapper.userEntityFromObject(user);

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer;
        }
    }
}
