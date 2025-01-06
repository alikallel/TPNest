import { CvEntity } from "src/cv/entities/cv.entity/cv.entity";
import { UserRoleEnum } from "src/enums/userrole.enum";
import { TimestampEntites } from "src/Generics/timestamp.entites";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends TimestampEntites{
    [x: string]: any;

    @PrimaryGeneratedColumn()
    id :number;
    @Column(
        {
            length:50,
            unique:true
        }
    )
    username: string;
    @Column({
        unique: true
    })
    email: string;

    @OneToMany(
        type =>CvEntity,
        cv => cv.user
    )
    cvs:CvEntity[]

    @Column()
    password:string;

    @Column()
    salt:string;

    @Column(
        {
            type:'enum',
          enum: UserRoleEnum  ,
          default: UserRoleEnum.USER
        }
    )
    role:string;
}
