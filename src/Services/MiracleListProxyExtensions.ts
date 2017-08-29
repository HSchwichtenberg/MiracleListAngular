import * as generated from './MiracleListProxy'; 

class Task extends generated.Task {
    get info() {
        return this.title + ": " + this.subTaskSet + " Teilaufgaben";
    }
}

class SubTask extends generated.SubTask {
    get info() {
        return this.title;
    }
}

class Category extends generated.Category {
    get info() {
        return this.name;
    }
}
