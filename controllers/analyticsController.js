const Task = require('../models/Task');
const Category = require('../models/Category');
const mongoose = require('mongoose');

// @desc    Get dashboard metrics & statistics
// @route   GET /api/analytics/dashboard-stats
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    // 1. Core tallies
    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'completed' });
    const pendingTasks = await Task.countDocuments({ user: userId, status: 'pending' });
    const overdueTasks = await Task.countDocuments({
      user: userId,
      status: 'pending',
      dueDate: { $lt: now },
    });

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // 2. Weekly progress snapshot (last 7 days completed vs total)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const completedLastWeek = await Task.countDocuments({
      user: userId,
      status: 'completed',
      updatedAt: { $gte: sevenDaysAgo },
    });

    const dueNextWeek = await Task.countDocuments({
      user: userId,
      dueDate: { $gte: now, $lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
    });

    // 3. Upcoming deadlines (next 7 days, sorted by dueDate)
    const upcomingDeadlines = await Task.find({
      user: userId,
      status: 'pending',
      dueDate: { $gte: now, $lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
    })
      .populate('category')
      .sort({ dueDate: 1 })
      .limit(5);

    // 4. Recent Tasks
    const recentTasks = await Task.find({ user: userId })
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        summary: {
          total: totalTasks,
          completed: completedTasks,
          pending: pendingTasks,
          overdue: overdueTasks,
          completionRate,
        },
        weeklySnapshot: {
          completedLastWeek,
          dueNextWeek,
        },
        upcomingDeadlines,
        recentTasks,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get weekly completion trends grouped by weekday
// @route   GET /api/analytics/reports/weekly
// @access  Private
exports.getWeeklyReport = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Group tasks by their due dates
    const stats = await Task.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          dueDate: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$dueDate' },
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Map day numbers (1=Sunday, 2=Monday... 7=Saturday) to labels
    const daysMap = {
      1: 'Sunday',
      2: 'Monday',
      3: 'Tuesday',
      4: 'Wednesday',
      5: 'Thursday',
      6: 'Friday',
      7: 'Saturday',
    };

    // Pre-populate response array for all 7 days to maintain format integrity
    const formattedData = [];
    for (let i = 1; i <= 7; i++) {
      const match = stats.find(item => item._id === i);
      formattedData.push({
        day: daysMap[i],
        total: match ? match.total : 0,
        completed: match ? match.completed : 0,
        pending: match ? match.pending : 0,
      });
    }

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get category distribution aggregation report
// @route   GET /api/analytics/reports/monthly
// @access  Private
exports.getMonthlyReport = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Aggregate counts grouped by category IDs
    const stats = await Task.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      { $unwind: '$categoryInfo' },
      {
        $project: {
          _id: 1,
          categoryName: '$categoryInfo.name',
          categoryColor: '$categoryInfo.color',
          total: 1,
          completed: 1,
          pending: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
