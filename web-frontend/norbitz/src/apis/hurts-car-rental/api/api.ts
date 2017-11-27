export * from './admin.service';
import { AdminService } from './admin.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [AdminService, UserService];
