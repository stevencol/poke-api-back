import { IsObject, IsString } from "class-validator";

export class AbilityDto{

  @IsObject()
    ability: Ability;

}

class Ability{
    @IsString()
    name: string;
    @IsString()
    url: string;

}
