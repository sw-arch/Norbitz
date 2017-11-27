export * from './admins.service';
import { AdminsService } from './admins.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [AdminsService, UsersService];
