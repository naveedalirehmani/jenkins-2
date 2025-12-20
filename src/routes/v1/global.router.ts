import helloRoutes from './helloRoutes';

import { Router } from 'express';
import { API_ROUTES } from '../../types/routes';

const Api1 = Router();

Api1.use(API_ROUTES.HELLO.BASE_PATH, helloRoutes);

export default Api1;
