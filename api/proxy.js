export default async function handler(req, res) {
    try {
        let url = new URL(req.url, `https://${req.headers.host}`);
        url.hostname = "popdev.me";
        url.protocol = "https";

        let headers = new Headers();
        for (let [key, value] of Object.entries(req.headers)) {
            if (key.toLowerCase() !== 'host') {
                headers.append(key, value);
            }
        }

        let requestOptions = {
            method: req.method,
            headers: headers,
            redirect: 'manual',
            referrer: req.referrer,
            referrerPolicy: req.referrerPolicy,
            mode: 'cors',
            credentials: 'include',
            cache: req.cache,
            integrity: req.integrity,
            keepalive: req.keepalive,
        };

        if (req.method !== "GET" && req.method !== "HEAD") {
            requestOptions.body = req;
        }

        let response = await fetch(url.toString(), requestOptions);

        res.status(response.status);
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
        res.send(await response.text());
    } catch (err) {
        res.status(500).send("Error handling the request: " + err.message);
    }
}
