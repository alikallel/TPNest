import { TimestampEntites } from "src/Generics/timestamp.entites";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cv')
export class CvEntity extends TimestampEntites {
    @PrimaryGeneratedColumn()
    id : number;

    @PrimaryColumn()
    @Column({
        name: 'name',
        length: 50,
        update: false
    })
    name: string;

    @PrimaryColumn()
    @Column(
        {
            length: 50
        }
    )
    firstname:string;

    @Column()
    age:number;

    @Column()
    cin:number;

    @Column()
    job: string;

    @Column()
    path: string;

  /*  @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date; */
}
 