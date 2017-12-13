/**
 * Check if the input parameters to a REST call are present
 * @param {*} req
 * @param {*} res
 * @param {*} queryParams
 * @param {*} bodyParams
 */
exports.checkParams = (req, res, queryParams, bodyParams) => {
  for (var queryIx in queryParams) {
    var param = queryParams[queryIx];
    if (req.query[param] === undefined) {
      res.status(400);
      res.send({ error: "Expected query param '" + param + "'" });
      return false;
    }
  }

  for (var bodyIx in bodyParams) {
    var param = bodyParams[bodyIx];
    if (req.body[param] === undefined) {
      res.status(400);
      res.send({ error: "Expected body param '" + param + "'" });
      return false;
    }
  }

  return true;
};
