import { CustomError } from "../..";
import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly singToken: SignToken = JwtAdapter.generateToken,
    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

        //login user
        const user = await this.authRepository.login(loginUserDto);

        //Generate token
        const token = await this.singToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    }
}
