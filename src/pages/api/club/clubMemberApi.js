import dbConnect, { ClubMembership, User, Club } from '../../../lib/db';
import {internalAccess} from "@/utils/internalAccess";
import {withRateLimit} from "@/lib/rate-limit";

async function handler(req, res) {
  const { method } = req;
  const { id, userId, clubId } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const query = {};
        if (userId) query.userId = userId;
        if (clubId) query.clubId = clubId;

        // Populate user and club details for more context
        const memberships = await ClubMembership.find(query)
          .populate('userId', 'fullName email studentCode') // Select fields from User
          .populate('clubId', 'name description'); // Select fields from Club

        return res.status(200).json({ success: true, data: memberships });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        // Check if user and club exist before creating membership
        const userExists = await User.findById(req.body.userId);
        const clubExists = await Club.findById(req.body.clubId);

        if (!userExists || !clubExists) {
          return res.status(404).json({ success: false, message: "User or Club not found" });
        }

        // The unique index in the schema will prevent duplicate memberships
        const membership = await ClubMembership.create(req.body);
        return res.status(201).json({ success: true, data: membership });
      } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
          return res.status(409).json({ success: false, message: 'User is already a member of this club.' });
        }
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Membership ID is required' });
        }
        // Only allow updating the 'role' field
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ success: false, message: "Role is required for update." });
        }

        const membership = await ClubMembership.findByIdAndUpdate(id, { role }, {
          new: true,
          runValidators: true,
        });

        if (!membership) {
          return res.status(404).json({ success: false, message: 'Membership not found' });
        }
        return res.status(200).json({ success: true, data: membership });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      try {
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

export default withRateLimit({ max: 5 })( internalAccess(handler) );