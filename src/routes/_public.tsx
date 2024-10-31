import {createFileRoute, Link, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
    component: LayoutRoute
})

function LayoutRoute() {
    return (
        <main className={'flex-column'} style={{height: '100vh'}}>
            <nav className={'flex-row'} style={{gap: '1rem', height: '30px', padding: '.25rem .5rem'}}>
                <Link to="/login">
                    Log In
                </Link>
                <Link to="/register">
                    Register
                </Link>
            </nav>
            <div style={{flex: 1, background: '#9fd89f', height: '90vh', width: '100%', padding: '.5rem'}}>
                <Outlet/>
            </div>
        </main>
    )
}