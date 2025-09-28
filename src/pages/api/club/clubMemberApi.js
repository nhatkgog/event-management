import dbConnect, { ClubMembership, User, Club } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { id, ...filters } = req.query;

        if (id) {
          const membership = await ClubMembership.findById(id)
            .populate('userId')
            .populate('clubId');

          if (!membership) {
            return res.status(404).json({ success: false, message: 'Membership not found' });
          }
          return res.status(200).json({ success: true, data: membership });
        } else {
          const memberships = await ClubMembership.find(filters)
            .populate('userId')
            .populate('clubId');

          return res.status(200).json({ success: true, data: memberships });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const userExists = await User.findById(req.body.userId);
        const clubExists = await Club.findById(req.body.clubId);

        if (!userExists || !clubExists) {
          return res.status(404).json({ success: false, message: "User or Club not found" });
        }

        const membership = await ClubMembership.create(req.body);
        await membership.populate('userId');
        await membership.populate('clubId');
        return res.status(201).json({ success: true, data: membership });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({ success: false, message: 'User is already a member of this club.' });
        }
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Membership ID is required' });
        }
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ success: false, message: "Role is required for update." });
        }

        const membership = await ClubMembership.findByIdAndUpdate(id, { role }, {
          new: true,
          runValidators: true,
        });
        await membership.populate('userId');
        await membership.populate('clubId');
        if (!membership) {
          return res.status(404).json({ success: false, message: 'Membership not found' });
        }
        return res.status(200).json({ success: true, data: membership });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Membership ID is required' });
        }
        const deletedMembership = await ClubMembership.deleteOne({ _id: id });
        if (deletedMembership.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Membership not found' });
        }
        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default internalAccess(handler);
