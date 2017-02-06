import * as generated from './MiracleListProxy'; 

class Task extends generated.TaskBase {
    get info() {
        return this.title + ": " + this.subTaskSet + " Augaben";
    }
}

class SubTask extends generated.SubTaskBase {
    get info() {
        return this.title;
    }
}

class Category extends generated.CategoryBase {
    get info() {
        return this.name;
    }
}
