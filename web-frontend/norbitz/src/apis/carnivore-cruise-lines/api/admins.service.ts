/**
 * Carnivore Cruise Lines API
 * This is an API to access the information on Carnivore Cruise Lines
 *
 * OpenAPI spec version: 1.2.0
 * Contact: jcw931@msstate.edu
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

import { CruiseItem } from '../model/cruiseItem';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AdminsService {

    protected basePath = 'https://virtserver.swaggerhub.com/Carnivore-Cruises/Carnivore_Cruise_Lines/1.0.0';
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
     * adds an inventory item
     * Adds an item to the system
     * @param itemID 
     * @param linerID 
     * @param roomID 
     * @param availablity 
     * @param cost 
     * @param name 
     * @param description 
     * @param roomCapacity 
     * @param fromLocation 
     * @param departureDate 
     * @param returnDate 
     * @param duration 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addInventory(itemID: string, linerID: string, roomID: number, availablity: boolean, cost: number, name: string, description: string, roomCapacity: number, fromLocation: string, departureDate: string, returnDate: string, duration: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addInventory(itemID: string, linerID: string, roomID: number, availablity: boolean, cost: number, name: string, description: string, roomCapacity: number, fromLocation: string, departureDate: string, returnDate: string, duration: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addInventory(itemID: string, linerID: string, roomID: number, availablity: boolean, cost: number, name: string, description: string, roomCapacity: number, fromLocation: string, departureDate: string, returnDate: string, duration: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addInventory(itemID: string, linerID: string, roomID: number, availablity: boolean, cost: number, name: string, description: string, roomCapacity: number, fromLocation: string, departureDate: string, returnDate: string, duration: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (itemID === null || itemID === undefined) {
            throw new Error('Required parameter itemID was null or undefined when calling addInventory.');
        }
        if (linerID === null || linerID === undefined) {
            throw new Error('Required parameter linerID was null or undefined when calling addInventory.');
        }
        if (roomID === null || roomID === undefined) {
            throw new Error('Required parameter roomID was null or undefined when calling addInventory.');
        }
        if (availablity === null || availablity === undefined) {
            throw new Error('Required parameter availablity was null or undefined when calling addInventory.');
        }
        if (cost === null || cost === undefined) {
            throw new Error('Required parameter cost was null or undefined when calling addInventory.');
        }
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling addInventory.');
        }
        if (description === null || description === undefined) {
            throw new Error('Required parameter description was null or undefined when calling addInventory.');
        }
        if (roomCapacity === null || roomCapacity === undefined) {
            throw new Error('Required parameter roomCapacity was null or undefined when calling addInventory.');
        }
        if (fromLocation === null || fromLocation === undefined) {
            throw new Error('Required parameter fromLocation was null or undefined when calling addInventory.');
        }
        if (departureDate === null || departureDate === undefined) {
            throw new Error('Required parameter departureDate was null or undefined when calling addInventory.');
        }
        if (returnDate === null || returnDate === undefined) {
            throw new Error('Required parameter returnDate was null or undefined when calling addInventory.');
        }
        if (duration === null || duration === undefined) {
            throw new Error('Required parameter duration was null or undefined when calling addInventory.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.post<any>(`${this.basePath}/inventory/new/${encodeURIComponent(String(itemID))}/${encodeURIComponent(String(linerID))}/${encodeURIComponent(String(roomID))}/${encodeURIComponent(String(availablity))}/${encodeURIComponent(String(cost))}/${encodeURIComponent(String(name))}/${encodeURIComponent(String(description))}/${encodeURIComponent(String(roomCapacity))}/${encodeURIComponent(String(fromLocation))}/${encodeURIComponent(String(departureDate))}/${encodeURIComponent(String(returnDate))}/${encodeURIComponent(String(duration))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deletes an item from the inventory
     * Removes an item from the system&#39;s inventory
     * @param itemID item ID to delete
     * @param deleteItem deletes cruise
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteInventoryItem(itemID: string, deleteItem?: CruiseItem, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteInventoryItem(itemID: string, deleteItem?: CruiseItem, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteInventoryItem(itemID: string, deleteItem?: CruiseItem, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteInventoryItem(itemID: string, deleteItem?: CruiseItem, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (itemID === null || itemID === undefined) {
            throw new Error('Required parameter itemID was null or undefined when calling deleteInventoryItem.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
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

        return this.httpClient.delete<any>(`${this.basePath}/inventory/${encodeURIComponent(String(itemID))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
