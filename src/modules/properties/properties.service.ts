import {Inject, Injectable} from '@nestjs/common';
import {BOOKING_REPOSITORY, PROPERTY_REPOSITORY} from '../../core/constants';
import {Property} from "./property.entity";
import {PropertyDto} from "./dto/property.dto";
import {BookingsService} from "../bookings/bookings.service";
import {Booking} from "../bookings/booking.entity";
import sequelize from "sequelize";

@Injectable()
export class PropertiesService {

    constructor(@Inject(PROPERTY_REPOSITORY) private readonly propertyRepository: typeof Property,
                @Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking
                // , private readonly bookingsService: BookingsService
    ) {
    }

    async findAll(limit, page, at?: string): Promise<{ results: Property[], total: number }> {
        const locationArray = at.split(',');
        const lat = parseFloat(locationArray[0]);
        const lng = parseFloat(locationArray[1]);
        const attributes: any[] = Object.keys(Property.rawAttributes);

        const location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
        const distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('geopoint'), location);
        attributes.push([ distance,'distance']);
        const total = await this.propertyRepository.count<Property>({});
        const properties = await this.propertyRepository.findAll<Property>({
            attributes,
            order: distance,
            limit,
            offset: ((page - 1) * limit)
        });
        return {
            results: properties,
            total,
        };
    }

    async findPropertyBookings(limit, page, propertyId?: number): Promise<{ results: Booking[], total: number }> {
        const total = await this.bookingRepository.count<Booking>({
            where: {
                propertyId,
            }
        });
        const properties = await this.bookingRepository.findAll<Booking>({
            where: {
                propertyId,
            },
            limit,
            offset: ((page - 1) * limit)
        });
        return {
            results: properties,
            total,
        };
    }

    async create(property: PropertyDto): Promise<Property> {
        const point = {type: 'Point', coordinates: [property.longitude, property.latitude]};

        return await this.propertyRepository.create<Property>({
            ...property,
            geopoint: point
        });
    }

    async findOneById(id: number): Promise<Property> {
        return await this.propertyRepository.findOne<Property>({where: {id}});
    }
}
