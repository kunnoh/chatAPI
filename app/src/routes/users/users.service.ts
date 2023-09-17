import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
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

    findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find((e: User) => e.email === email);
        if (user) {
            return Promise.resolve(user);
        };
        return undefined;
    }

    findById(id: string): Promise<User | undefined> {
        const user = this.users.find((e: User) => e.id === id);
        if (user) return Promise.resolve(user);
        return undefined;
    }

    findOne(id: string): Promise<User | undefined> {
        const user = this.users.find((e: User) => e.id === id);
        if (user) return Promise.resolve(user);
        return undefined;
    }

    findAll({ page, limit }): Promise<User[] | undefined> {
        return Promise.resolve(this.users);
    }
}
