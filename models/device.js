/**
 * Created by wiss on 03/03/17.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const deviceSchema = new Schema({
    name: {type: String, required: true},
    state: {type: Boolean, required: true},
    group: {type: ObjectId, ref: 'Group', required: true}
});

module.exports = {
    schema: deviceSchema,
    model: mongoose.model('Device', deviceSchema),
    registry: {
        urlTemplates: {
            self: 'http://127.0.0.1:3000/api/devices/{id}',
            relationship: 'http://127.0.0.1:3000/api/devices/' +
            '{ownerId}/relationships/{path}'
        }
    }
};