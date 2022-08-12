
import React from 'react';
import { Admin, Resource } from 'admin-on-rest';

import myApiRestClient from './restClient';
import { RequestList, RequestShow } from './request';
import { ErrorList } from './error';

const App = () => (
    <Admin restClient={myApiRestClient}>
        <Resource name="Request" list={RequestList} show={RequestShow} />
        <Resource name="Error" list={ErrorList} />
    </Admin>
);

export default App;
