import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export class Property extends Model {

    @Column({
        type: DataType.GEOMETRY('POINT'),
        allowNull: false,
    })
    geopoint: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    imageUrl: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    addressNotes: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    pricePerNight: number;

}
