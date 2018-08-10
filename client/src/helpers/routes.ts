export interface Route {
    path: string,
    name: string
}

export interface RouteObject {
    dashboard: Route,
    search: Route,
    settings: Route,
    connectionsView: Route
    styleGuide: Route,
    login: Route,
    // nestedExample: Route & {
    //     sub: {
    //         example: Route
    //     }
    // },
}

export const Routes: RouteObject = {
    dashboard: {
        path: '/dashboard',
        name: 'Overview'
    },
    search: {
        path: '/search',
        name: 'Search'
    },
    settings: {
        path: '/settings',
        name: 'Settings'
    },
    connectionsView: {
        path: '/search/connections',
        name: 'Connections'
    },
    styleGuide: {
        path: '/style-guide',
        name: 'Style Guide'
    },
    login: {
        path: '/login',
        name: 'Login'
    },
    // nestedExample: {
    //     path: '/search/earth-stations/:pk',
    //     name: 'Earth Station',
    //     sub: {
    //         example: {
    //             path: '/summary',
    //             name: 'Summary'
    //         }
    //     }
    // },
}

export const ApiRoutes = {
    dashboard: 'api/dashboard',
    auth: 'auth',
    verifyAuth: 'api/verify-auth',
    logout: 'logout',
}
