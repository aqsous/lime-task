import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {BookingDto} from "./dto/booking.dto";
import {PropertiesService} from "../properties/properties.service";
import {BookingsService} from "./bookings.service";

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {
    }
    @Post()
    @ApiOperation({
        description: 'Create a new booking',
        tags: ['Bookings'],
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        isArray: false,
        description: 'booking created',
    })
    async create(@Body() booking: BookingDto) {
        // get all posts in the db
        return await this.bookingsService.create(booking);
    }
}
