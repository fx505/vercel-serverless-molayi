const fetch = require('node-fetch');

module.exports = async (req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    url.hostname = "popdev.me";
    url.protocol = "https";

    try {
        const response = await fetch(url.toString(), {
            method: req.method,
            headers: req.headers,
            body: req.method === 'GET' ? null : req.body
        });
        const body = await response.text();
        res.status(response.status);
        res.send(body);
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
