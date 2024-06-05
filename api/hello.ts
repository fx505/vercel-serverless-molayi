import type { VercelRequest, VercelResponse } from '@vercel/node'

addEventListener(
    "fetch", event => {
        let url = new URL(event.request.url);
        url.port = "2053";
        url.hostname = "popdev.me";                        
        url.protocol = "https";
        let request = new Request(url, event.request);
        event.respondWith(
            fetch(request)
        )
    }
)
