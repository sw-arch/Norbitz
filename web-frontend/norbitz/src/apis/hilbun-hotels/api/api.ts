export * from './debug.service';
import { DebugService } from './debug.service';
export * from './reservation.service';
import { ReservationService } from './reservation.service';
export * from './room.service';
import { RoomService } from './room.service';
export const APIS = [DebugService, ReservationService, RoomService];
