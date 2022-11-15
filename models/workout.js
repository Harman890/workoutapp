const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    legsMain: [String],
    chestMain: [String],
    backMain: [String],
    shoulderMain: [String],
    legsSecond: [String],
    chestSecond: [String],
    backSecond: [String],
    accessory: [String],
    accessory2: [String],
    accessory3: [String],
    abs: [String],
    abs2: [String]
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout

