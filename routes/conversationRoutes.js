import express from 'express';
import { 
  accessConversation, 
  fetchConversations, 
  markConversationAsRead
} from '../controller/conversation.js';
import  protect  from '../middlewares/userAuth.js';
import  protectAll  from '../middlewares/both.js'; // <-- NEW IMPORT

const coRouter = express.Router();

// Route for a USER to start a chat with a PROVIDER.
coRouter.route('/').post(protect, accessConversation);

// These routes can be accessed by either a User or a Provider.
coRouter.route('/').get(protectAll, fetchConversations);
coRouter.route('/read/:conversationId').put(protectAll, markConversationAsRead);

export default coRouter;