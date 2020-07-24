import Router from './router'
import auth from './routes/auth'
import user from './routes/home'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify({ some: 'json' })
    return new Response(body, init)
}

async function handleRequest(request) {
    if(request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': '86400',
            },
        })
    }

    const router = new Router()
    router.postJSON = (path, handler) => {
        router.post(
            path,
            async req => new Response(JSON.stringify(await handler(await req.json())), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Vary': 'Origin',
                },
            }))
    }

    auth(router)
    user(router)

    return await router.route(request)
}
