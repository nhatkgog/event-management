import dbConnect, { Registration } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { id, ...filters } = req.query;

        if (id) {
          const registration = await Registration.findById(id)
            .populate('userId', 'fullName email studentCode')
            .populate('eventId', 'title date');

          if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
          }
          return res.status(200).json({ success: true, data: registration });
        } else {
          const registrations = await Registration.find(filters)
            .populate('userId', 'fullName email studentCode')
            .populate('eventId', 'title date');

          return res.status(200).json({ success: true, data: registrations });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const registration = await Registration.create(req.body);
        return res.status(201).json({ success: true, data: registration });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({ success: false, message: 'This user is already registered for this event.' });
        }
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT': // For updating status (e.g., check-in, attended)
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Registration ID is required' });
        }
        const registration = await Registration.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!registration) {
          return res.status(404).json({ success: false, message: 'Registration not found' });
        }
        return res.status(200).json({ success: true, data: registration });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE': // Cancels a registration
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Registration ID is required' });
        }
        const registration = await Registration.findByIdAndUpdate(id, 
            { status: 'Cancelled', cancelledAt: new Date() },
            { new: true }
        );
        if (!registration) {
          return res.status(404).json({ success: false, message: 'Registration not found' });
        }
        return res.status(200).json({ success: true, message: 'Registration has been cancelled.' });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default internalAccess(handler);
