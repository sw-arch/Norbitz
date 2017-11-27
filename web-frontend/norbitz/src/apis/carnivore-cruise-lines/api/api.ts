export * from './admins.service';
import { AdminsService } from './admins.service';
export * from './developers.service';
import { DevelopersService } from './developers.service';
export const APIS = [AdminsService, DevelopersService];
