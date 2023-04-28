const { newChat, getChatsByUser } = require("../controllers/chatController");


const router = require("express").Router();

router.post("/chat/new-chat", newChat);

router.get('/chats/all-chats/:userId' , getChatsByUser);

module.exports = router;
