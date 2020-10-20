import {BOOKING_REPOSITORY} from '../../core/constants';
import {Booking} from "./booking.entity";

export const bookingsProviders = [{
    provide: BOOKING_REPOSITORY,
    useValue: Booking,
}];
