import { IsNumber, IsObject, isObject, IsString } from "class-validator";

class Type{

    @IsString()
    name: string;

    @IsString()
    url: string;
}


export class TypeDto{

    @IsNumber()
    slot: number;

    @IsObject()
    type:Type

}