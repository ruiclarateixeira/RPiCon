exports.checkParams = (req, res, queryParams, bodyParams) => {
  for (var queryIx in queryParams) {
    var param = queryParams[queryIx];
    if (req.query[param] === undefined) {
      res.send({ error: "Expected query param '" + param + "'" });
      return;
    }
  }

  for (var bodyIx in bodyParams) {
    var param = bodyParams[bodyIx];
    if (req.body[param] === undefined) {
      res.send({ error: "Expected query param '" + param + "'" });
      return;
    }
  }
};
