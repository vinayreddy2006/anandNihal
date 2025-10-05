import express from 'express';
import { allMessages, sendMessage } from "../controller/message.js";
import protectAll  from '../middlewares/both.js';
// import multer from 'multer';

const mRouter = express.Router();

// const upload = multer({ dest: 'uploads/' });

mRouter.route('/:conversationId').get(protectAll, allMessages);
mRouter.route('/').post(protectAll, sendMessage);
// router.route('/media').post(protectAll, upload.single('media'), sendMediaMessage);

export default mRouter;