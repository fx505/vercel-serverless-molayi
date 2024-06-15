// api/proxy.js

export default async function handler(req, res) {
    try {
        let url = new URL(req.url, `https://${req.headers.host}`);
        url.hostname = "popdev.me";
        url.protocol = "https";

        let headers = {};
        for (let [key, value] of Object.entries(req.headers)) {
            if (key.toLowerCase() !== 'host') {
                headers[key] = value;
            }
        }

        let requestOptions = {
            method: req.method,
            headers: headers,
            redirect: 'manual',
        };

        if (req.method !== "GET" && req.method !== "HEAD") {
            const body = await new Promise((resolve, reject) => {
                let data = '';
                req.on('data', chunk => {
                    data += chunk;
                });
                req.on('end', () => {
                    resolve(data);
                });
                req.on('error', err => {
                    reject(err);
                });
            });
            requestOptions.body = body;
        }

        let response = await fetch(url.toString(), requestOptions);

        res.status(response.status);
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
        const responseBody = await response.text();
        res.send(responseBody);
    } catch (err) {
        res.status(500).send("Error handling the request: " + err.message);
    }
}
