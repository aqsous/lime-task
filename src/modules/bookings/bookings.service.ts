import {Inject, Injectable} from '@nestjs/common';
import {Booking} from "./booking.entity";
import {BOOKING_REPOSITORY} from "../../core/constants";
import {BookingDto} from './dto/booking.dto';

@Injectable()
export class BookingsService {

    constructor(@Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking) {
    }

    async create(booking: BookingDto): Promise<Booking> {
        return await this.bookingRepository.create<Booking>(booking);
    }
}
