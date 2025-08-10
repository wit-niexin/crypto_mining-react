import {createBrowserRouter} from "react-router-dom"
import React from 'react';

const Login = React.lazy(() => import('../pages/Login.jsx'))
const UserBenefits = React.lazy(() => import('../pages/user_benefits/index.jsx'))
const User = React.lazy(() => import('../pages/user/index.jsx'))
const Withdrawal = React.lazy(() => import('../pages/withdrawal/index.jsx'))
const MiningRig = React.lazy(() => import('../pages/mining_rig/index.jsx'))
const MyMiner = React.lazy(() => import('../pages/myminer/index.jsx'))
const WalletCenter = React.lazy(() => import('../pages/walletcenter/index.jsx'))
const AccountSettings = React.lazy(() => import('../pages/accountsettings/index.jsx'))
const Home = React.lazy(() => import('../pages/home/index.jsx'))
const Welcome = React.lazy(() => import('../pages/Welcome.jsx'))
const NotFound = React.lazy(() => import('../pages/NotFound.jsx'))

const router = createBrowserRouter([
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/',
        Component: Home,
        children: [{
            index: true,
            Component: Welcome,
        },
            {
                path: '/user_benefits',
                Component: UserBenefits,
            },
            {
                path: '/user',
                Component: User,
            },
            {
                path: '/mining_rig',
                Component: MiningRig,
            },
            {
                path: '/walletcenter',
                Component: WalletCenter,
            },
            {
                path: '/accountsettings',
                Component: AccountSettings,
            },
            {
                path: '/myminer',
                Component: MyMiner,
            },
            {
                path: '/withdrawal',
                Component: Withdrawal,
            },
            {
                path: '*',
                Component: NotFound,
            }]
    },
])
export default router