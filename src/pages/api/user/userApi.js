import dbConnect, { User } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { id, ...filters } = req.query;

        if (id) {
          const user = await User.findById(id).populate('roleId');
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          return res.status(200).json({ success: true, data: user });
        } else {
          const users = await User.find(filters).populate('roleId');
          return res.status(200).json({ success: true, data: users });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const user = await User.create(req.body);

        await user.populate('roleId');

        return res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.error(error.message);
        if (error.code === 11000) {
          return res.status(409).json({ success: false, message: 'A user with that Clerk ID, email, or student code already exists.' });
        }
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        const deletedUser = await User.deleteOne({ _id: id });
        if (deletedUser.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
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
