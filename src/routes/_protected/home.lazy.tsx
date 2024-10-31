import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/home')({
    component: FileRoute
})

function FileRoute () {
    return (
        <h3>Home Page</h3>
    )
}