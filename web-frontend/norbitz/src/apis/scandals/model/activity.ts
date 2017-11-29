/**
 * Scandals API
 * This is a simple API
 *
 * OpenAPI spec version: 1.0.3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Activity {
    /**
     * Name of activity
     */
    name: string;
    /**
     * Description of activity
     */
    description: string;
    /**
     * Dollar cost of activity
     */
    cost: number;
    /**
     * Total number of tickets for sale
     */
    quantity: number;
    location: string;
    time: string;
}
