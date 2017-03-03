const app = require('express')();
const API = require('json-api');
const mongoose = require('mongoose');

const APIError = API.types.Error;
mongoose.connect('mongodb://localhost/devices_api');

const models = {
    Device: require('./models/device').model,
    Group: require('./models/group').model
};

const registryTemplates = {
    devices: require('./models/device').registry,
    groups: require('./models/group').registry
};

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry(registryTemplates,
    {dbAdapter: adapter});

const docs = new API.controllers.Documentation(registry,
    {name: 'Devices Control API'});
const controller = new API.controllers.API(registry);
const front = new API.httpStrategies.Express(controller, docs);

const apiReqHandler = front.apiRequest.bind(front);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
    res.header('Access-Control-Allow-Methods',
        'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

const db = [
    'devices',
    'groups'
];

app.options('*', (req, res) => {
    res.send();
});

app.get('/api', front.docsRequest.bind(front));

app.route(`/api/:type(${db.join('|')})`).get(apiReqHandler).post(apiReqHandler)
    .patch(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id`).get(apiReqHandler)
    .patch(apiReqHandler)
    .delete(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id/relationships/:relationship`)
    .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler)
    .delete(apiReqHandler);

app.use((req, res) => {
    front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

app.listen(3000, function()
{
    console.log('listening on 3000')
})


