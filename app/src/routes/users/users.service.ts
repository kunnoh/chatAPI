import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
    constructor(
        private userRepo: UserRepo
    ) { }
    private users: User[] = [
        {
            id: 'tyf54',
            username: 'jyj',
            email: 'trhd@gmail.com',
            password: 'rt',
            phone: 50754
        },
        {
            id: 'erwe3',
            username: 'zs',
            email: 'dgr@gmail.com',
            password: 'sdfg',
            phone: 243
        },
        {
            id: 'r45',
            username: 'mg',
            email: 'hffc@gmail.com',
            password: 'fx',
            phone: 4540
        },
        {
            id: 't3',
            username: 'sdrg',
            email: 'zgs@gmail.com',
            password: 'rsxsh',
            phone: 450
        },
        {
            id: '2qQ2',
            username: 'afes',
            email: 'as@gmail.com',
            password: 'hgh',
            phone: 5436
        },
        {
            id: '5hre',
            username: 'vdfg',
            email: 'srgzdf@gmail.com',
            password: 'erz',
            phone: 3340
        },
        {
            id: '4twe',
            username: 'ydn',
            email: 'rsegsre@gmail.com',
            password: 'regerg',
            phone: 4324
        }
    ];


    async createUser(regUser: RegisterDto): Promise<{ accessToken: string, refreshToken: string } | undefined> {
        // try {

        // } catch (err) {
        //     console.log(err);
        // }
        const { email, password } = regUser;
        const salt = await bcrypt.genSalt();
        const hashPasswd = await bcrypt.hash(regUser.password, salt);

        const user = new User();
        user.email = email;
        user.password = hashPasswd;

        return this.userRepo.save(user);
        // return this.newRefreshAccess(user, values);
    }

    GetUser(email: string): Promise<User | undefined> {
        const user = this.users.find((e: User) => e.email === email);
        if (user) {
            return Promise.resolve(user);
        };
        return undefined;
    }

    GetUsers({ page, limit }): Promise<User[] | undefined> {
        return Promise.resolve(this.users);
    }

    UpdateUser(): Promise<User | undefined> {
        return undefined;
    }

    DeleteUser(email: string): Promise<User[] | undefined> {
        return Promise.resolve(this.users);
    }
}
