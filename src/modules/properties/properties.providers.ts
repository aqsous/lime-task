import {PROPERTY_REPOSITORY} from '../../core/constants';
import {Property} from "./property.entity";

export const propertiesProviders = [{
    provide: PROPERTY_REPOSITORY,
    useValue: Property,
}];
