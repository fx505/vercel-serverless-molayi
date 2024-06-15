module.exports = (req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    url.hostname = "popdev.me";
    url.protocol = "https";

    fetch(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.method === 'GET' ? null : req.body
    })
    .then(response => response.text())
    .then(body => {
        res.status(response.status);
        res.send(body);
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
};
