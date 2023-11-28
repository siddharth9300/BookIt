const Hall = require('../model/hallSchema');
const User = require("../model/userSchema");

const createHall = async (req, res, next) => {
  try {
    const { name, location, capacity,amenities,description,hallCreater } = req.body;

    if (!name || !location || !capacity || !amenities || !description || !hallCreater) {
      return res.status(422).json({ error: "Please fill all details" });
    }

    if (capacity <= 0) {
      return res.status(422).json({ error: "Please enter a valid capacity greater than zero" });
    }
    const hall = new Hall({ name, location, capacity,amenities,description,hallCreater });
    await hall.save();
    res.status(201).json({ message: 'Hall created successfully' });
  } catch (error) {
    next(error);
  }
};

const getHalls = async (req, res, next) => {
  try {
    const halls = await Hall.find();
    res.json({ halls });
  } catch (error) {
    next(error);
  }
};

const getHallById = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json({ hall });
  } catch (error) {
    next(error);
  }
};

const updateHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const { name, location, capacity ,amenities,description} = req.body;
    const currentUserMail = req.rootUser.email; // Renamed to avoid conflict
    const masterAdminmail = process.env.REACT_APP_MASTER_ADMIN;
    const hall = await Hall.findById(hallId);

    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    if (hall.hallCreater !== currentUserMail && currentUserMail !== masterAdminmail) {
    // if (hall.hallCreater !== hallCreatorEmail) {
      return res.status(403).json({ message: 'Unauthorized' }); // 403 means "Forbidden"
    }

    const updatedHall = await Hall.findByIdAndUpdate(
      hallId,
      { name, location, capacity, amenities, description },
      { new: true }
    );

    if (!updatedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    res.json({ hall: updatedHall });
  } catch (error) {
    next(error);
  }
};

const deleteHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findByIdAndDelete(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json({ message: 'Hall deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createHall, getHalls, getHallById, updateHall, deleteHall };
