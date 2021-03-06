/**
 * AirDND API
 * AirDND's API
 *
 * OpenAPI spec version: 1.0.5
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Availabilities } from './availabilities';
import { ListingDetails } from './listingDetails';
import { Pricing } from './pricing';


export interface Listing {
    details: ListingDetails;
    pricing: Pricing;
    availabilities: Availabilities;
}
