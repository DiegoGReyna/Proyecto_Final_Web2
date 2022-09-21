const express = require('express');
const routerApi = require('./routes/');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json({
  extended: false //permite codificar matrices y objetos enriquecidos en formato codificado en url
}));
app.get('/', (req, res) => res.send('Ruta principal'));
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(port, () => console.log('Mi puerto', port));
