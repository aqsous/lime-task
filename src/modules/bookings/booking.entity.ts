import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Property} from "../properties/property.entity";

@Table({
    timestamps: true,
})
export class Booking extends Model {

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fromDate: Date;
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    toDate: Date;

    @ForeignKey(() => Property)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    propertyId: number;

    @BelongsTo(() => Property)
    property: Property;
}
