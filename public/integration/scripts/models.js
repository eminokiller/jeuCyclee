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
                    week.tasks[i] = taskData ? new Task(taskData.id, taskData.text) : {}
                })
                return week;
            })
        }

        return instance;
    }

    static refresh(instance, savedInstance) {
        console.log('instance------->', instance)
        console.log('instance saved------->', savedInstance)
        if(!instance._weeks) return;
        instance._weeks.forEach(function (week, index) {
            if (savedInstance) {
                if (savedInstance._weeks[index]) {
                    if (savedInstance._weeks[index]._tasks) {
                        savedInstance._weeks[index]._tasks.forEach((task, j) => {
                            if (task) {
                                instance._weeks[index] = instance._weeks[index]?instance._weeks[index]:new Week(index);
                                instance._weeks[index]._tasks[j] = new Task(task._id, task._text)
                            }
                        });
                    }
                }
            }
        })
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
    static getTaskMap(model){
        let modelMap = model._weeks.map((week) =>{
            let weekMap = {
                _id:week._id,
                _taskMap:week._tasks.reduce(function (s,currentTask) {
                    if(currentTask._id){
                        s.push(currentTask.id)
                    }
                    return s;
                }, [])
            };
            return weekMap;
        })
        return modelMap;
    }
    static calculateGameScore(game, model) {
        let scoreGameModel = 0;
        let modelMap = ScoreManager.getTaskMap(model);
        game.weeks.forEach((week, i) => {
            week._tasks.forEach((task, j) => {
                if (model._weeks[i]._tasks[j]) {
                    if (task._id == model._weeks[i]._tasks[j]._id) {
                        scoreGameModel += 2;
                        const indexRef = modelMap[i]._taskMap.indexOf(task._id);
                        if(indexRef>-1){
                            modelMap[i]._taskMap.splice(indexRef,1);
                        }
                    } else {
                        const indexRef = modelMap[j]._taskMap.indexOf(task._id);
                        if(indexRef> -1){
                            scoreGameModel += 1;
                            modelMap[i]._taskMap.splice(indexRef,1);
                        }
                    }
                }

            });
        });
        return scoreGameModel;
    }

    static calculatePerfectScore(model) {
        return model._weeks.reduce((s, week) => {
            week._tasks.map((item) => {
                s += item._id ? 2 : 0;
            })
            return s;
        }, 0);
    }

    static score(model1, game1, model2, game2) {
        console.log('model1', model1)
        console.log('game1', game1)
        console.log('model2', model2)
        console.log('game2', game2)
        let scorePerfect1 = ScoreManager.calculatePerfectScore(model1)
        let scorePerfect2 = ScoreManager.calculatePerfectScore(model2)
        let scoreGameModel1 = ScoreManager.calculateGameScore(game1, model1)
        let scoreGameModel2 = ScoreManager.calculateGameScore(game2, model2)
        let scorePerfect = scorePerfect1 + scorePerfect2;
        let scoreGame = scoreGameModel1 + scoreGameModel2;
        console.log('here-------->score', scorePerfect1, scorePerfect2, scoreGameModel1, scoreGameModel2, scoreGame)
        let ratio = scorePerfect ? scoreGame / scorePerfect : 0;
        return Math.round(ratio * 100)


    }
}
