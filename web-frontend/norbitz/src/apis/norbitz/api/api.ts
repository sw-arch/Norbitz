export * from './private.service';
import { PrivateService } from './private.service';
export * from './public.service';
import { PublicService } from './public.service';
export const APIS = [PrivateService, PublicService];
