import {Sequelize} from 'sequelize-typescript';
import {SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION} from '../constants';
import {databaseConfig} from './database.config';
import {Property} from "../../modules/properties/property.entity";
import {Booking} from "../../modules/bookings/booking.entity";

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        const sequelize = new Sequelize(
            {
            ...config,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // <<<<<<< YOU NEED THIS
                },
            },
        });
        sequelize.addModels([Property, Booking]);
        await sequelize.sync();
        return sequelize;
    },
}];
