/**
 * Created by wiss on 03/03/17.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const groupSchema = new Schema({
    name: {type: String, required: true},
    ldevices: [{type: ObjectId, ref: 'Device'}]
});

module.exports = {
    schema: groupSchema,
    model: mongoose.model('Group', groupSchema),
    registry: {
        urlTemplates: {
            self: 'http://127.0.0.1:3000/api/groups/{id}',
            relationship: 'http://127.0.0.1:3000/api/groups/' +
            '{ownerId}/relationships/{path}'
        }
    }
};