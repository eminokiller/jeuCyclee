class Task {
    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    constructor(id, text) {
        this._id = id;
        this._text = text;
    }
}

class Week {
    set tasks(value) {
        this._tasks = value;
    }

    get tasks() {
        return this._tasks;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    addTask(task) {
        this._tasks.push(task)
    }

    addTaskInPosition(i, task) {
        this._tasks[i] = task;
    }

    constructor(id) {
        this._id = id;
        this._tasks = [];
    }

}

class Game {
    get startedAt() {
        return this._startedAt;
    }

    get endedAt() {
        return this._endedAt;
    }

    get isStarted() {
        return this._isStarted;
    }

    get isFinished() {
        return this._isFinished;
    }

    get taskList() {
        return this._taskList;
    }

    set taskList(value) {
        this._taskList = value;
    }

    get startWeek() {
        return this._startWeek;
    }

    set startWeek(value) {
        this._startWeek = value;
    }

    get endWeek() {
        return this._endWeek;
    }

    set endWeek(value) {
        this._endWeek = value;
    }

    get weeks() {
        return this._weeks;
    }

    set weeks(value) {
        this._weeks = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    constructor(id, startWeek, endWeek, taskList) {
        this._id = id;
        this._isStarted = false;
        this._isFinished = false;
        this._startedAt = null;
        this._endedAt = null;
        this._weeks = [];
        this._startWeek = startWeek;
        this._endWeek = endWeek;
        for (let i = this._startWeek; i < endWeek + 1; i++) {
            this._weeks.push(new Week(i))
        }
        this._taskList = JSON.parse(JSON.stringify(taskList));
    }

    static populate(instance) {
        let max = instance.taskList.reduce(function (i, item) {
            if (item.draggable) i++;
            return i
        }, -1)
        for (let iteration = 0; iteration < max; iteration++) {
            let rw = Game.getRandomInt(instance._startWeek - 1, instance._endWeek - 1)
            instance.weeks[rw].tasks.push(Game.pickRandomTask(max, instance.taskList));
        }
    }

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static pickRandomTask(max, taskList) {
        let i = Game.getRandomInt(0, max);
        return taskList[i];
    }

    static createInstance(id, startWeek, endWeek, taskList) {
        let instance = new Game(id, startWeek, endWeek, JSON.parse(JSON.stringify(taskList)));
        Game.populate(instance)
        return instance
    }

    static loadData(instance, data) {
        if (data.weeks) {
            instance.weeks = data.weeks.map(function (weekData, i) {
                if (!weekData) return new Week(i);
                let week = new Week(weekData.id + 1)
                weekData.tasks.map(function (taskData, i) {
                    week.tasks[i] = new Task(taskData.id, taskData.text)
                })
                return week;
            })
        }

        return instance;
    }

    static loadInstance(id, startWeek, endWeek, taskList, data) {
        let instance = new Game(id, startWeek, endWeek, JSON.parse(JSON.stringify(taskList)));
        Game.loadData(instance, data);
        return instance
    }

    normalize() {
        return {
            id: this._id,
            weeks: this._weeks.map(function (week) {
                return {
                    id: week.id,
                    tasks: week.tasks.map(function (task) {
                        return {
                            id: task.id,
                            text: task.text
                        }
                    })
                }
            })
        }
    }

    start() {
        if (this._isStarted) throw new Error();
        this._startedAt = new Date('now');
        this._isStarted = true;

    }

    end() {
        if (!this._isStarted || this._isFinished) throw new Error();
        this._endedAt = new Date('now');
        this._isFinished = true
    }
}

class ScoreManager {

    static score(model, game) {
        let scorePerfect = model.weeks.reduce((s, week) => {
            s += week.tasks.length * 10
            return s;
        }, 0);
        let scoreGameModel = 0;
        game.weeks.forEach((week, i) => {
            week.tasks.forEach((task, j) => {
                if (model.weeks[i].tasks[j]) {
                    if (task.id == model.weeks[i].tasks[j].id) {
                        scoreGameModel += 10
                    } else {
                        let test = model.weeks[i].tasks.filter((item) => {
                            return item.id == task.id
                        }).length > 0
                        scoreGameModel += (test) ? 3 : 0;
                    }
                }
            });
        });
        let score = scoreGameModel
        return score * 100 / scorePerfect;

    }
}
