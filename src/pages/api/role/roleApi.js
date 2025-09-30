import dbConnect, { Role } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { id, ...filters } = req.query;

        if (id) {
          const role = await Role.findById(id);
          if (!role) {
            return res.status(404).json({ success: false, message: 'Role not found' });
          }
          return res.status(200).json({ success: true, data: role });
        } else {
          const roles = await Role.find(filters);
          return res.status(200).json({ success: true, data: roles });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const role = await Role.create(req.body);
        return res.status(201).json({ success: true, data: role });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({ success: false, message: 'A role with that name already exists.' });
        }
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Role ID is required' });
        }
        const role = await Role.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!role) {
          return res.status(404).json({ success: false, message: 'Role not found' });
        }
        return res.status(200).json({ success: true, data: role });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Role ID is required' });
        }
        const deletedRole = await Role.deleteOne({ _id: id });
        if (deletedRole.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Role not found' });
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
