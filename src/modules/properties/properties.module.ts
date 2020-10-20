import {Module} from '@nestjs/common';
import {PropertiesService} from './properties.service';
import {propertiesProviders} from "./properties.providers";
import {PropertiesController} from './properties.controller';
import {BookingsModule} from "../bookings/bookings.module";
import {bookingsProviders} from "../bookings/bookings.providers";

@Module({
    providers: [PropertiesService, ...propertiesProviders, ...bookingsProviders],
    controllers: [PropertiesController],
})
export class PropertiesModule {
}
