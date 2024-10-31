import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_public/register')({
  component: FileRoute,
})

function FileRoute(){
    return (
        <h1>Register Route</h1>
    )
}