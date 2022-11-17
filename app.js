const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const dbUrl = 'mongodb://localhost:27017/workoutapp';
// const dbUrl = process.env.DB_URL ||

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Workout = require('./models/workout');
const Week = require('./models/week');
const { nextTick } = require('process');



app.get('/', (req, res) => {
    res.render('home')
})
app.get('/freq', (req, res) => {
    res.render('freq')
})
app.post('/freq', async (req, res) => {
    const { schedule } = req.body

    if (schedule === 'null') {
        res.redirect('/freq')
    }

    if (schedule === 'threeX') {
        const week = new Week({
            name: 'threeX',
            day1: 'Full body',
            day2: 'Rest',
            day3: 'Full body',
            day4: 'Rest',
            day5: 'Full body',
            day6: 'Rest',
            day7: 'Rest'
        });
        await week.save()
        res.redirect(`/threeX/?week=${week._id}`)
    }
    else if (schedule === 'fourX') {
        const week = new Week({
            name: 'fourX',
            day1: 'Upper',
            day2: 'Lower',
            day3: 'Rest',
            day4: 'Upper',
            day5: 'Lower',
            day6: 'Rest',
            day7: 'Rest'
        });
        await week.save()

        res.redirect(`/fourX/?week=${week._id}`)
    }
    else if (schedule === 'sixX') {
        const week = new Week({
            name: 'sixX',
            day1: 'Push',
            day2: 'Pull',
            day3: 'Legs',
            day4: 'Push',
            day5: 'Pull',
            day6: 'Legs',
            day7: 'Rest'
        });
        await week.save()
        res.redirect(`/sixX/?week=${week._id}`)
    }
})

app.get('/threeX/', (req, res) => {
    const { week } = req.query
    res.render('threeX', { week })
})

app.get('/fourX/', (req, res) => {
    const { week } = req.query
    res.render('fourX', { week })
})
app.get('/sixX/', (req, res) => {
    const { week } = req.query
    res.render('sixX', { week })
})

const exercises = ['legsMain',
    'chestMain',
    'backMain',
    'shoulderMain',
    'legsSecond',
    'chestSecond',
    'backSecond',
    'accessory',
    'accessory2',
    'accessory3',
    'abs'];

app.post('/print/', async (req, res) => {
    const newWorkout = new Workout(req.body);
    await newWorkout.save()
    const weekId = req.body.weekId
    const weekLayout = await Week.findById(weekId)
    if (weekLayout.name === 'threeX') {
        if (!req.body.chestMain || req.body.chestMain.toString().split(',').length != 1 || !req.body.backMain
            || req.body.backMain.toString().split(',').length != 1 || !req.body.shoulderMain
            || req.body.shoulderMain.toString().split(',').length != 1 || !req.body.legsMain || req.body.legsMain.toString().split(',').length != 1
            || !req.body.legsSecond || req.body.legsSecond.toString().split(',').length != 1 || !req.body.chestSecond
            || req.body.chestSecond.toString().split(',').length != 1
            || !req.body.backSecond || req.body.backSecond.toString().split(',').length != 1 || !req.body.accessory
            || !req.body.abs || req.body.abs.toString().split(',').length != 1 || req.body.accessory.toString().split(',').length != 2) {
            res.send('Please go back and select proper number of exercises')
        }
        else {
            console.log('Showing print screen')
            res.redirect(`/print/${newWorkout._id}/${weekId}`)
        }
    }
    else if (weekLayout.name === 'fourX') {
        if (!req.body.chestMain || req.body.chestMain.toString().split(',').length != 1 || !req.body.backMain
            || req.body.backMain.toString().split(',').length != 1 || !req.body.shoulderMain
            || req.body.shoulderMain.toString().split(',').length != 1 || !req.body.legsMain || req.body.legsMain.toString().split(',').length != 1
            || !req.body.legsSecond || req.body.legsSecond.toString().split(',').length != 1 || !req.body.chestSecond
            || req.body.chestSecond.toString().split(',').length != 1
            || !req.body.backSecond || req.body.backSecond.toString().split(',').length != 1 || !req.body.accessory || !req.body.accessory2
            || req.body.accessory2.toString().split(',').length != 2
            || !req.body.abs || req.body.abs.toString().split(',').length != 1 || !req.body.abs2
            || req.body.abs2.toString().split(',').length != 1 || req.body.accessory.toString().split(',').length != 2) {
            res.send('Please go back and select proper number of exercises')
        }
        else {
            console.log('Showing print screen')
            res.redirect(`/print/${newWorkout._id}/${weekId}`)
        }
    }
    else if (weekLayout.name === 'sixX') {
        if (!req.body.chestMain || req.body.chestMain.toString().split(',').length != 1 || !req.body.backMain
            || req.body.backMain.toString().split(',').length != 1 || !req.body.shoulderMain
            || req.body.shoulderMain.toString().split(',').length != 1 || !req.body.legsMain || req.body.legsMain.toString().split(',').length != 1
            || !req.body.legsSecond || req.body.legsSecond.toString().split(',').length != 1 || !req.body.chestSecond
            || req.body.chestSecond.toString().split(',').length != 1
            || !req.body.backSecond || req.body.backSecond.toString().split(',').length != 1 || !req.body.accessory || !req.body.accessory2
            || !req.body.accessory3
            || !req.body.abs || req.body.abs.toString().split(',').length != 1 || !req.body.abs2
            || req.body.abs2.toString().split(',').length != 1 || req.body.accessory.toString().split(',').length != 2
            || req.body.accessory2.toString().split(',').length != 2 || req.body.accessory3.toString().split(',').length != 2) {
            res.send('Please go back and select proper number of exercises')
        }
        else {
            console.log('Showing print screen')
            res.redirect(`/print/${newWorkout._id}/${weekId}`)
        }
    }






})

app.get('/print/:workoutId/:weekId', async (req, res) => {
    const { workoutId } = req.params;
    const { weekId } = req.params;
    const workout = await Workout.findById(workoutId);
    const weekLayout = await Week.findById(weekId);
    res.render('print', { workout, weekLayout })
})


app.listen(3000, () => {
    console.log('Connected on port 3000.')
})