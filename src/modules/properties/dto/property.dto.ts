import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class PropertyDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly imageUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly addressNotes: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly pricePerNight: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly latitude: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly longitude: number;
}
