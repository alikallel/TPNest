import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(value: {data : string[]}, metadata: ArgumentMetadata) {
    if(metadata.type === 'body')
    {
        return value.data.map((element)=>element.toUpperCase()).join('-')
    }
    //console.log(metadata);
    //console.log (value)
    return value.data;
  }
}
