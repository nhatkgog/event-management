import dbConnect, { Notification } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { id, ...filters } = req.query;

        if (id) {
          const notification = await Notification.findById(id)
            .populate('senderId', 'fullName')
            .populate('eventId', 'title');

          if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
          }
          return res.status(200).json({ success: true, data: notification });
        } else {
          const notifications = await Notification.find(filters)
            .populate('senderId', 'fullName')
            .populate('eventId', 'title')
            .sort({ createdAt: -1 }); // Show newest first

          return res.status(200).json({ success: true, data: notifications });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST': // Create a new notification
      try {
        const notification = await Notification.create(req.body);
        return res.status(201).json({ success: true, data: notification });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT': // Mark notifications as read
      try {
        const { ids, isRead } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ success: false, message: 'An array of notification IDs is required.' });
        }

        const result = await Notification.updateMany(
            { _id: { $in: ids } },
            { $set: { isRead: !!isRead } }
        );

        return res.status(200).json({ success: true, data: { modifiedCount: result.modifiedCount } });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default internalAccess(handler);
