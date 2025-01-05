import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { AddCvDto } from './dto/Add-cv.dto';

@Controller('cv')
export class CvController {
    constructor(
        private cvService: CvService
    )
    {

    }
    @Get()
    async getAllCvs(): Promise<CvEntity[]>
    {
        return await this.cvService.getCvs();
    }

    @Post()
        async addCv(@Body() addCvDto: AddCvDto): Promise<CvEntity>
        {
            return await this.cvService.addCv(addCvDto);
        }
    /*@Delete(':id')
    async removeCv(
        @Param('id', ParseIntPipe) id :number
    )
    {
        return await this.cvService.removeCv(id);
    }*/
   /* @Delete(':id')
    async deleteCv(
        @Param('id', ParseIntPipe) id :number
    )
    {
        return await this.cvService.deleteCv(id);
    }*/

    @Delete(':id')
    async softDeleteCv(
        @Param('id', ParseIntPipe) id :number
    )
    {
        return await this.cvService.softDeleteCv(id);
    }
@Get('recover/:id')
  async restoreCv (@Param('id',ParseIntPipe) id :number)
  {
    return await this.cvService.restoreCv(id);
  }

  @Get('stats')
  async statsCvNumberByAge()
  {
    return await this.cvService.statCvNumberByAge(50,18)
  }

  @Get(':id')
  async getCv(
      @Param ('id',ParseIntPipe) id :number
  ): Promise<CvEntity>
  {
      return await this.cvService.findById(id);
  }
}
