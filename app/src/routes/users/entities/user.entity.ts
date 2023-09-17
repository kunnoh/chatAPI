import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id'
    })
    id: string;

    @Column({
        nullable: false,
        default: ''
    })
    username: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: ''
    })
    email: string;

    @Column({
        nullable: false,
        default: ''
    })
    password: string;

    @Column({
        nullable: true,
        default: 0
    })
    phone: number;
}