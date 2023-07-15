import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Children } from 'utils/types';

const queryCache = new QueryClient();
const GlobalProviders: React.FC<Children> = ({ children }) => {
    return (
        <>
            <QueryClientProvider client={queryCache}>
                {children}
            </QueryClientProvider>
        </>
    );
};

export default GlobalProviders;
