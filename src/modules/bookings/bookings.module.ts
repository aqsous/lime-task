import {Module} from '@nestjs/common';
import {BookingsService} from './bookings.service';
import {BookingsController} from './bookings.controller';
import {bookingsProviders} from "./bookings.providers";

@Module({
    providers: [BookingsService, ...bookingsProviders],
    controllers: [BookingsController],
    exports: [BookingsService]
})
export class BookingsModule {
}
