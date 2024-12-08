import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role-enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    age: number

    @Column()
    email: string

    @Column()
    phonenumber: number

    @Column()
    password: string

    @Column({ default: false })
    isVerify: boolean

    @Column()
    code: string

    @Column({ default: Role.CUSTOMER })
    role: Role
}
