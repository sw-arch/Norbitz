/**
 * AirDND API
 * AirDND's API
 *
 * OpenAPI spec version: 1.0.4
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface ListingDetails {
    bathrooms: number;
    bedrooms: number;
    beds: number;
    location: string;
    id: string;
    instantBookable: boolean;
    isNewListing: boolean;
    lat: number;
    lng: number;
    name: string;
    neighborhood: string;
    propertyType: string;
    reviewsCount: number;
    roomType: string;
    starRating: number;
}
