const service = require("./comments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function commentExists(req, res, next) {
  const { commentId } = req.params;
  const comment = await service.read(commentId);
  if (comment) {
    res.locals.comment = comment;
    return next();
  }
  return next({ status: 404, message: `Comment cannot be found.` });
}

async function list(req, res, next) {
  // your solution here
  const comments = await service.list();
  res.json({ data: comments});
}

async function listCommenterCount(req, res, next) {
  // your solution here
  const data = await service.listCommenterCount();
    const formattedData = data.map(item => ({
    ...item,
    count: parseInt(item.count, 10), // Ensure avg is a number
  }));
  res.json({ data: formattedData });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { comment } = res.locals;
  res.json({ data: comment });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listCommenterCount: asyncErrorBoundary(listCommenterCount),
  read: [asyncErrorBoundary(commentExists), read],
};
