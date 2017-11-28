export * from './flights.service';
import { FlightsService } from './flights.service';
export * from './purchase.service';
import { PurchaseService } from './purchase.service';
export * from './purchaseHistory.service';
import { PurchaseHistoryService } from './purchaseHistory.service';
export * from './tickets.service';
import { TicketsService } from './tickets.service';
export const APIS = [FlightsService, PurchaseService, PurchaseHistoryService, TicketsService];
