import dbConnect, { Event } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';
import {withRateLimit} from "@/lib/rate-limit";

async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (id) {
          const event = await Event.findById(id)
            .where({ isDeleted: false })
            .populate('clubId', 'name')
            .populate('organizerId', 'fullName email')
            .populate('categoryId', 'name');

          if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
          }
          return res.status(200).json({ success: true, data: event });
        } else {
          // Add any desired filters, e.g., by clubId, status
          const filters = { isDeleted: false, ...req.query };
          delete filters.id; // id is handled separately

          const events = await Event.find(filters)
            .populate('clubId', 'name')
            .populate('categoryId', 'name');
          return res.status(200).json({ success: true, data: events });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const event = await Event.create(req.body);
        return res.status(201).json({ success: true, data: event });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Event ID is required' });
        }
        const event = await Event.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!event) {
          return res.status(404).json({ success: false, message: 'Event not found' });
        }
        return res.status(200).json({ success: true, data: event });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE': // Soft delete
      try {
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

export default withRateLimit({ max: 5 })( internalAccess(handler) );
