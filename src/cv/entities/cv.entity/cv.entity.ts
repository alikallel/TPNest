import { TimestampEntites } from "src/Generics/timestamp.entites";
import { UserEntity } from "src/user/entities/user.entity/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(
        type => UserEntity, (user)=>user.cv,
        {
            cascade: true,
            nullable:true,
            eager:true
        }
    )
    user: UserEntity
}
 