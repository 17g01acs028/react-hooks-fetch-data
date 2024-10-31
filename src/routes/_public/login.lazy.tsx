import {createLazyFileRoute, useNavigate} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_public/login')({
    component: FileRoute,
})

function FileRoute() {
    const navigate = useNavigate()
    const login = () => {
        navigate({
            to: "/home"
        })
    }

    return (
        <>
            <h1>Login Route</h1>
            <button onClick={login}>Login</button>
        </>

    )
}