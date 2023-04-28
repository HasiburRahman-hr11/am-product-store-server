const Chat = require("../models/Chat");

exports.newChat = async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const message = req.body.message;

  const chatData = {
    users: [sender, receiver],
    messages: [message],
  };
  try {
    const isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: sender } } },
        { users: { $elemMatch: { $eq: receiver } } },
      ],
    });

    if (isChat.length > 0) {
      const updatedChat = await Chat.findOneAndUpdate(
        {
          $and: [
            { users: { $elemMatch: { $eq: sender } } },
            { users: { $elemMatch: { $eq: receiver } } },
          ],
        },
        { $push: { messages: message } },
        { new: true }
      );

      res.status(201).json(updatedChat);
    } else {
      const newChat = new Chat(chatData);
      await newChat.save();
      res.status(201).json(newChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getChatsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: userId } } }
      ],
    }).sort({ updatedAt: -1 }).populate("users", "-password");

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
