import { AuthDataSource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDataSource: AuthDataSource
    ) { }

    login(loginUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.loginUser(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto);
    }
}
