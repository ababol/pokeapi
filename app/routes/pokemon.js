var Pokemon = require('../models/Pokemon');

var userRoute = {
  define: function(app, prefixAPI) {
    Pokemon.methods(['get']);

    Pokemon.before('get', function(req, res, next) {
      if (!req.query.limit || req.query.limit > 10) {
        req.query.limit = 10;
      }

      next();
    });

    Pokemon.route('Search.get', function(req, res) {
      var q = req.query.q,
        limit = req.query.limit,
        skip = req.query.skip,
        query;

      Pokemon.find(
        getSearchParam(q),
        {},
        { skip: skip, limit: limit }
      ).exec(function(err, pokemons) {
        if (err) {
          res.status(400);
          return res.send('Error while searching a pokemon: ' + err);
        }

        if (pokemons === null || pokemons === []) {
          res.status(200);
          return res.send('No Pokemon found.');
        } else {
          res.status(200);
          return res.send(pokemons);
        }
      });
    });

    Pokemon.register(app, prefixAPI + '/pokemon');
  }
};

function getSearchParam(q) {
  var pId = parseInt(q);

  if (isNaN(pId)) {
    var reName = new RegExp(q, 'i');
    return { name: { $regex: reName } };
  }

  return { 'pkdx_id': pId }
}

module.exports = userRoute;
