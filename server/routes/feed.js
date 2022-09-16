const express = require("express")

const router = express.Router()

const {FEED,INFO,PAGE,SINGLEPAGE,COMMENT,DELETECOMMENT,PROFILE} = require('../utils/constants/app_constants').ROUTES.POST;

const feed = require("../controllers/feed")

// router.get(FEED,feed.comments);

router.get(INFO,feed.allPostInfo);

router.get(PAGE,feed.allPagesInfo);

router.get(SINGLEPAGE,feed.singlePagesInfo);

router.post(COMMENT,feed.postComment);

router.get(PROFILE,feed.pageProfile);

router.delete(DELETECOMMENT,feed.deleteComment);

module.exports = router;