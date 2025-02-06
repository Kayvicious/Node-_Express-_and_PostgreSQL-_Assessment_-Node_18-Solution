const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*")
}

function listCommenterCount() {
  // your solution here
  return knex("comments as c")
    .count("comment_id")
    .select("u.user_email as commenter_email")
    .join("users as u", "u.user_id", "c.commenter_id")
    .groupBy("u.user_email")
    .orderBy("u.user_email");
}

function read(commentId) {
  // your solution here
  return knex("comments as c").select("c.comment_id", "c.comment", "u.user_email as commenter_email", "post_body as commented_post")
    .join("users as u", "u.user_id", "c.commenter_id")
    .join("posts as p", "p.post_id", "c.post_id")
    .where({ comment_id: commentId }).first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
