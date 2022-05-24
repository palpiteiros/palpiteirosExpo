import React from 'react';
import RootNavigator from './RootNavigator';
import { UserProvider } from './UserProvider';

/**
 * Wrap all providers here
 */

export default function Rotas() {
    return (
        <UserProvider>
            <RootNavigator />
        </UserProvider>
    );
}