import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class BookingDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly toDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly fromDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly propertyId: number;
}
