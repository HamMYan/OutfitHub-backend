import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role-enum";

@Entity()
export class User {
    @Index()
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column()
    name: string

    @Index()
    @Column()
    surname: string

    @Column()
    age: number

    @Index()
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
