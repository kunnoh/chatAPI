import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import * from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id'
    })
    id: string;

    @Column({
        nullable: true,
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

    async validatePasswd(password: string): Promise<boolean> {
        return false

        // return bcrypt.compare(password, this.password);
    }
}