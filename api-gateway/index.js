const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use('/a' ,createProxyMiddleware({target: 'http://localhost:3001', changeOrigin: true}));
app.use('/p' ,createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true}));
app.use('/f' ,createProxyMiddleware({target: 'http://localhost:3003', changeOrigin: true}));


app.listen(PORT, () =>{
    console.log(`The api gateway is running in ${PORT}`);
});