import dbConnect, { Club } from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (id) {
          const club = await Club.findById(id);
          if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
          }
          return res.status(200).json({ success: true, data: club });
        } else {
          const clubs = await Club.find({});
          return res.status(200).json({ success: true, data: clubs });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'POST':
      try {
        const club = await Club.create(req.body);
        return res.status(201).json({ success: true, data: club });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'PUT':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Club ID is required' });
        }
        const club = await Club.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!club) {
          return res.status(404).json({ success: false, message: 'Club not found' });
        }
        return res.status(200).json({ success: true, data: club });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case 'DELETE':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Club ID is required' });
        }
        const deletedClub = await Club.deleteOne({ _id: id });
        if (deletedClub.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Club not found' });
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
