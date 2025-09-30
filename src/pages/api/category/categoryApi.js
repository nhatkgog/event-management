import dbConnect, { Category } from '../../../lib/db';
import { internalAccess } from '../../../utils/internalAccess';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { id, ...filters } = req.query;

        if (id) {
          const category = await Category.findById(id);
          if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
          }
          return res.status(200).json({ success: true, data: category });
        } else {
          const categories = await Category.find(filters);
          return res.status(200).json({ success: true, data: categories });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const category = await Category.create(req.body);
        return res.status(201).json({ success: true, data: category });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({ success: false, message: 'A category with that name already exists.' });
        }
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Category ID is required' });
        }
        const category = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!category) {
          return res.status(404).json({ success: false, message: 'Category not found' });
        }
        return res.status(200).json({ success: true, data: category });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: 'Category ID is required' });
        }
        const deletedCategory = await Category.deleteOne({ _id: id });
        if (deletedCategory.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Category not found' });
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
