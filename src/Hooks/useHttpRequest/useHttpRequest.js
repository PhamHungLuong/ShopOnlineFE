import { useState, useCallback } from 'react';
import { getFetchApi } from '../../services/httpRequest/httpRequest';

const useHttpRequest = async (path) => {
    const response = await getFetchApi(path);

    console.log(response);
};

export default useHttpRequest;
