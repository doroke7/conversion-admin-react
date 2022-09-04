import React from 'react';

import Index from './Index/Index';

export default { Index: React.lazy(() => import('./Index/Index')) };
