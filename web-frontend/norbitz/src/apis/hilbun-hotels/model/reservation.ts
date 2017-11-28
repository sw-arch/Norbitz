/**
 * Hilbun Hotels
 * RESTful API for a fictitious hotel chain. Created for a MSU Software Architecture course.
 *
 * OpenAPI spec version: 1.0.7
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Reservation {
    resId?: number;
    duration?: number;
    resDate?: Date;
    roomIds?: string;
    /**
     * reservation Status
     */
    status?: Reservation.StatusEnum;
}
export namespace Reservation {
    export type StatusEnum = 'placed' | 'paid' | 'complete';
    export const StatusEnum = {
        Placed: 'placed' as StatusEnum,
        Paid: 'paid' as StatusEnum,
        Complete: 'complete' as StatusEnum
    }
}