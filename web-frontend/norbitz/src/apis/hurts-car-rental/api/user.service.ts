/**
 * Hurts Car API
 * Hurts Car Rental API
 *
 * OpenAPI spec version: 1.1.1b
 * Contact: support@softwarebois.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { PurchasedVehicle } from '../model/purchasedVehicle';
import { Vehicle } from '../model/vehicle';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserService {

    protected basePath = 'https://virtserver.swaggerhub.com/SWArchFinalProject/HurtsCarRental/1.0.0';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Reserve a vehicle for a set period of time
     * 
     * @param vehicleID ID of vehicle object that is being reserved
     * @param body Vehicle that is being reserved
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public purchaseVehicle(vehicleID: number, body: PurchasedVehicle, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public purchaseVehicle(vehicleID: number, body: PurchasedVehicle, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public purchaseVehicle(vehicleID: number, body: PurchasedVehicle, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public purchaseVehicle(vehicleID: number, body: PurchasedVehicle, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (vehicleID === null || vehicleID === undefined) {
            throw new Error('Required parameter vehicleID was null or undefined when calling purchaseVehicle.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling purchaseVehicle.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/purchase/${encodeURIComponent(String(vehicleID))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Searches vehicle based on query
     * returns an array of available vehicles at given location
     * @param location location of vehicles to return
     * @param startDate start date to rent vehicle, must have end date if start date is present
     * @param endDate end date of rental, must have start date if end date is present
     * @param minPrice Minimum price of car to be searched for
     * @param maxPrice Maximum price of car to be searched for
     * @param minPassengers Minimum number of passengers the car can fit
     * @param make Make of the car
     * @param model Model of the car
     * @param year Year the car was made
     * @param type Type of car (i.e. SUV, Compact, etc...)
     * @param minMPG Minimum MPG of the car
     * @param gps O for no GPS, 1 for a GPS
     * @param skiRack O for no ski rack, 1 for a ski rack
     * @param snowChains O for no snow chains, 1 for having snow chains
     * @param leftControl O for no left hand controls, 1 for having left hand controls
     * @param autoTransmission O for manual transmission, 1 for automatic transmission
     * @param minChildSeats Minimum number of child seats the car can support
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public searchVehicles(location?: string, startDate?: string, endDate?: string, minPrice?: number, maxPrice?: number, minPassengers?: number, make?: string, model?: string, year?: number, type?: string, minMPG?: number, gps?: number, skiRack?: number, snowChains?: number, leftControl?: number, autoTransmission?: number, minChildSeats?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Vehicle>>;
    public searchVehicles(location?: string, startDate?: string, endDate?: string, minPrice?: number, maxPrice?: number, minPassengers?: number, make?: string, model?: string, year?: number, type?: string, minMPG?: number, gps?: number, skiRack?: number, snowChains?: number, leftControl?: number, autoTransmission?: number, minChildSeats?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Vehicle>>>;
    public searchVehicles(location?: string, startDate?: string, endDate?: string, minPrice?: number, maxPrice?: number, minPassengers?: number, make?: string, model?: string, year?: number, type?: string, minMPG?: number, gps?: number, skiRack?: number, snowChains?: number, leftControl?: number, autoTransmission?: number, minChildSeats?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Vehicle>>>;
    public searchVehicles(location?: string, startDate?: string, endDate?: string, minPrice?: number, maxPrice?: number, minPassengers?: number, make?: string, model?: string, year?: number, type?: string, minMPG?: number, gps?: number, skiRack?: number, snowChains?: number, leftControl?: number, autoTransmission?: number, minChildSeats?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (location !== undefined) {
            queryParameters = queryParameters.set('location', <any>location);
        }
        if (startDate !== undefined) {
            queryParameters = queryParameters.set('startDate', <any>startDate);
        }
        if (endDate !== undefined) {
            queryParameters = queryParameters.set('endDate', <any>endDate);
        }
        if (minPrice !== undefined) {
            queryParameters = queryParameters.set('minPrice', <any>minPrice);
        }
        if (maxPrice !== undefined) {
            queryParameters = queryParameters.set('maxPrice', <any>maxPrice);
        }
        if (minPassengers !== undefined) {
            queryParameters = queryParameters.set('minPassengers', <any>minPassengers);
        }
        if (make !== undefined) {
            queryParameters = queryParameters.set('make', <any>make);
        }
        if (model !== undefined) {
            queryParameters = queryParameters.set('model', <any>model);
        }
        if (year !== undefined) {
            queryParameters = queryParameters.set('year', <any>year);
        }
        if (type !== undefined) {
            queryParameters = queryParameters.set('type', <any>type);
        }
        if (minMPG !== undefined) {
            queryParameters = queryParameters.set('minMPG', <any>minMPG);
        }
        if (gps !== undefined) {
            queryParameters = queryParameters.set('gps', <any>gps);
        }
        if (skiRack !== undefined) {
            queryParameters = queryParameters.set('skiRack', <any>skiRack);
        }
        if (snowChains !== undefined) {
            queryParameters = queryParameters.set('snowChains', <any>snowChains);
        }
        if (leftControl !== undefined) {
            queryParameters = queryParameters.set('leftControl', <any>leftControl);
        }
        if (autoTransmission !== undefined) {
            queryParameters = queryParameters.set('autoTransmission', <any>autoTransmission);
        }
        if (minChildSeats !== undefined) {
            queryParameters = queryParameters.set('minChildSeats', <any>minChildSeats);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<Array<Vehicle>>(`${this.basePath}/inventory`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
