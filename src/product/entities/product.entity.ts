import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ProductStatus } from "./status-enum";

@Entity()
export class Product {
    @Index()
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column()
    name: string;

    @Index()
    @Column("simple-array")
    images: string[];
    
    @Index()
    @Column()
    price: number;

    @Index()
    @Column()
    count: number;

    @Index()
    @Column()
    description: string;

    @Column({ default: ProductStatus.PENDING })
    status: ProductStatus

    // @Column("json", { nullable: true })
    // other: Record<string, any>;


}
