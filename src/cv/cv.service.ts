import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCvDto } from './dto/Add-cv.dto';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    )
    {

    }
    async findById (id: number)
    {
        const cv= await this.cvRepository.findOneBy({id});
        if (!cv) {
         throw new Error(`CV with id ${id} not found.`);
     }
     return cv;
    }
   async getCvs() : Promise<CvEntity[]>
    {
        return await this.cvRepository.find();
    }

    async addCv(cv:AddCvDto ) : Promise<CvEntity>
    {
        return await this.cvRepository.save(cv);
    }
    async removeCv(id: number)
    {
       const cvToRemove= await this.findById (id);
        return await this.cvRepository.remove(cvToRemove);
    }
    async deleteCv(id: number)
    {
        return await this.cvRepository.delete(id);
    }
    async softDeleteCv (id : number)
    {
        return this.cvRepository.softDelete(id);
    }
    async restoreCv(id: number) 
    {
        return this.cvRepository.restore(id);
    }
    async statCvNumberByAge(maxAge, minAge=0)
    {
        //create queryBuilder
        const qb=this.cvRepository.createQueryBuilder("cv");
        return await qb.select("cv.age,count(cv.id) as CvNumber").where ("cv.age > :minAge and cv.age< :maxAge" , { minAge, maxAge }).groupBy("cv.age").getRawMany();
        
    }
}
