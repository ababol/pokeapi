var restful = require('node-restful'),
    mongoose = restful.mongoose;

// MONGO SCHEMA
var pokemon = restful.model('pokemon', mongoose.Schema({
  attack: { type: 'Number', required: true },
  defense: { type: 'Number', required: true },
  height: { type: 'Number', required: true },
  weight: { type: 'Number', required: true },
  hp: { type: 'Number', required: true },
  evolutions: {
    type:[{
      level: { type: 'Number', required: true },
      pkdx_id: { type: 'Number', required: true },
      method: { type: 'string', required: true },
      resource_uri: { type: 'string', required: true },
      to: { type: 'string', required: true},
      attack: { type: 'Number', required: true },
      defense: { type: 'Number', required: true },
      height: { type: 'Number', required: true },
      weight: { type: 'Number', required: true },
      hp: { type: 'Number', required: true },
      types: {
        type:[{
          name: { type: 'string', required: true },
          resource_uri: { type: 'string', required: true}
        }],
        required: true
      }
    }],
    required: true
  },
  name: { type: 'string', required: true },
  description: { type: 'string', required: true },
  pkdx_id: { type: 'Number', required: true },
  sp_atk: { type: 'Number', required: true },
  sp_def: { type: 'Number', required: true },
  speed: { type: 'Number', required: true },
  types: {
    type:[{
      name: { type: 'string', required: true },
      resource_uri: { type: 'string', required: true}
    }],
    required: true
  }
}));

pokemon.collection.createIndex({ pkdx_id: 1 }, function(error) {
  if (error) {
    console.log('Issue node, need to update https://github.com/mafintosh/mongojs/issues/135');
  }
});

module.exports = pokemon;
