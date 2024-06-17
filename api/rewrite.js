module.exports = async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    url.hostname = "popdev.me";
    url.protocol = "https";

    const response = await fetch(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.body,
        redirect: 'follow'
    });

    const body = await response.buffer();
    res.status(response.status).send(body);
};
