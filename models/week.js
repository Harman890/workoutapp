const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekSchema = new Schema({
    name: String,
    day1: String,
    day2: String,
    day3: String,
    day4: String,
    day5: String,
    day6: String,
    day7: String
});

const Week = mongoose.model('Week', WeekSchema);

module.exports = Week

