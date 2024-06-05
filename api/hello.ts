import type { VercelRequest, VercelResponse } from '@vercel/node'

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
	"/",
	createProxyMiddleware({
		target: "https://popdev.me/",
		changeOrigin: true,
	}),
);

app.listen(443);
