import {Body, Controller, Get, HttpStatus, Param, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {PropertiesService} from './properties.service';
import {PropertyDto} from "./dto/property.dto";
import {ApiOperation, ApiProperty, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import {ApiImplicitParam} from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";

@Controller('properties')
export class PropertiesController {
    constructor(private readonly propertyService: PropertiesService) {
    }

    @Get()
    @ApiOperation({
        description: 'List properties',
        tags: ['Properties'],
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'properties listed',
    })
    @ApiImplicitQuery({name: 'at', description: 'lat,long'})
    @ApiImplicitQuery({name: 'limit', description: 'number of element in results'})
    @ApiImplicitQuery({name: 'page', description: 'start from 1 to X'})
    async findAll(
        @Query('limit') limit = 10,
        @Query('page') page = 1,
        @Query('at') at?: string) {
        return await this.propertyService.findAll(limit, page, at);
    }

    @Post()
    @ApiOperation({
        description: 'Create a new property',
        tags: ['Properties'],
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        isArray: false,
        description: 'property created',
    })
    async create(@Body() property: PropertyDto) {
        return await this.propertyService.create(property);
    }

    @Get(':propertyId/bookings')
    @ApiOperation({
        description: 'List property bookings',
        tags: ['Properties', 'Bookings'],
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'properties listed',
    })
    @ApiImplicitQuery({name: 'limit', description: 'number of element in results'})
    @ApiImplicitQuery({name: 'page', description: 'start from 1 to X'})
    async findPropertyBookings(
        @Query('limit') limit = 10,
        @Query('page') page = 1,
        @Param('propertyId') propertyId: number) {
        return await this.propertyService.findPropertyBookings(limit, page, propertyId);
    }
}
