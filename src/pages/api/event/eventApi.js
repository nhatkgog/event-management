import dbConnect, { Event } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { id, ...queryFilters } = req.query;

        if (id) {
          // When fetching by ID, we still ensure the event is not soft-deleted.
          const event = await Event.findOne({ _id: id, isDeleted: false })
            .populate('clubId')
            .populate('organizerId')
            .populate('categoryId');

          if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
          }
          return res.status(200).json({ success: true, data: event });
        } else {
          // For list queries, default to not showing deleted events,
          // but allow overriding it if `isDeleted=true` is in the query.
          const filters = { isDeleted: false, ...queryFilters };
          const events = await Event.find(filters)
            .populate('clubId')
            .populate('categoryId');
          return res.status(200).json({ success: true, data: events });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const event = await Event.create(req.body);
        await event.populate('clubId');
        await event.populate('organizerId');
        await event.populate('categoryId');
        return res.status(201).json({ success: true, data: event });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Event ID is required' });
        }
        const event = await Event.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        await event.populate('clubId');
        await event.populate('organizerId');
        await event.populate('categoryId');
        if (!event) {
          return res.status(404).json({ success: false, message: 'Event not found' });
        }
        return res.status(200).json({ success: true, data: event });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE': // Soft delete
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Event ID is required' });
        }
        const event = await Event.findByIdAndUpdate(id, 
            { isDeleted: true, status: 'Cancelled' },
            { new: true }
        );

        if (!event) {
          return res.status(404).json({ success: false, message: 'Event not found' });
        }
        return res.status(200).json({ success: true, message: 'Event marked as deleted' });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default internalAccess(handler);
