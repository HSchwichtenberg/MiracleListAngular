
import { RoutingModule } from './../Util/RoutingModule';
import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { MiracleListProxy } from '../Services/MiracleListProxy';
import { MiracleListProxyV2 } from '../Services/MiracleListProxyV2';
import { Category, Task, SubTask, TaskImportance, LoginInfo } from '../Services/MiracleListProxy';
import { TaskEditComponent } from "../TaskEdit/TaskEdit.component";

// RoutingModule
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

// Kommunikation
import { CommunicationService } from "../Services/CommunicationService";

// Dialog
import { ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

enum DisplayMode { TaskSet = 0, DueTaskSet = 1, Search = 2 };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Attribute mit in HTML darzustellenden Daten
  public categorySet: Array<Category>;
  public category: Category; // Aktuelle Kategorie
  public taskSet: Array<Task>;
  public task: Task; // Aktuelle Aufgabe
  public newCategoryName: string; // neue Kategorie
  public newTaskTitle: string; // neue Aufgabe
  public searchText: string; // Suchtext
  public categorySetWithTaskSet: Array<Category>; // Suchergebnisse
  public dueTaskSet: Array<Category>; // fällige Aufgaben
  public displayMode: DisplayMode;

  // weitere Attribute
  private today: Date = new Date();
  //  private token: string;  // vorübergehende Anmeldelösung nur für Teil 1 und 2 des iX-Tutorials

  // ================ Konstruktor
  constructor(private miracleListProxy: MiracleListProxy,
   private miracleListProxyV2: MiracleListProxyV2,
   private communicationService: CommunicationService,
    private overlay: Overlay, private vcr: ViewContainerRef, public modal: Modal,
    private ChangeDetectorRef: ChangeDetectorRef,  // für Dialoge,
    private route: ActivatedRoute, // für Ansprung per Route
  ) {
    console.log("======= AppComponent:Constructor");
    // vorübergehende Anmeldelösung nur für Teil 1 und 2 des iX-Tutorials
    // var li = new LoginInfo();
    // li.clientID = "Ihre erhaltene ClientID";
    // li.username = "Ihr E-Mail-Adresse";
    // li.password = "";

    // this.miracleListProxyV2.login(li).subscribe(x=> {

    // if (x == null || x.password != "") {
    //  console.log("login NICHT ERFOLGREICH",x);
    //   this.communicationService.token = "";
    //   alert("Anmeldefehler!");
    // }
    // else {
    //     console.log("login ERFOLGREICH",x);
    //  this.token = x.token;
    //   this.showCategorySet();
    // }
    // }, err => {     this.communicationService.token = "";
    // console.log("SERVER FEHLER!", err); alert("SERVER FEHLER!");  } );

    overlay.defaultViewContainer = vcr; // für Dialoge

    // Ereignisbehandlung für Event von TaskView/TaskEdit
    communicationService.TaskListUpdateEvent.subscribe(
      x => {
        this.task = x;
        this.refreshData();
      }
    );

    // Ereignisbehandlung für Event von TaskView/TaskEdit
    // wird gefeuert, wenn dort auf "zurück" geklickt wurde
    communicationService.TaskDetailCloseEvent.subscribe(
      x => {
       // Wenn fällige Aufgaben angezeigt wurden, dann gibt es keine aktuelle Kategorie!
       if (  this.displayMode === DisplayMode.DueTaskSet) { this.getDueTaskSet(false); }
           if (  this.displayMode === DisplayMode.Search) { this.search(false); }
       else {  this.selectCategory(this.category); }
      }
    );
  }

  ngOnInit() {
    // Startaktion
    // console.log("======= AppComponent:ngOnInit");
    this.displayMode = DisplayMode.TaskSet;
    this.setlistHeigth();
    this.showCategorySet();

    // für vereinfachtes Debugging der TaskEdit-Ansicht
    // this.miracleListProxyV2.task(this.communicationService.token, 6498).subscribe(x=> { this.task = x; this.editTask(x) });
  
    // this.communicationService.navigate("/app/(column3:taskedit/6498)");
  }

  listHeight : string = "";
  @HostListener('window:resize', ['$event'])
onResize(event) {
this.setlistHeigth();
}

// Lösung über CSS hatte viele Probleme mit Bootstrap 3. Daher hier dynamische Berechnung!
setlistHeigth()
{
 var abstand : number = 150;
 if (window.innerHeight < 750) abstand = 220; // weil dann unter noch der Footer steht!
 this.listHeight = (window.innerHeight - 150) + "px";
}

 async refreshData(onlyDueTaskSet: boolean = false) {

    if (!onlyDueTaskSet) {
      console.log("refreshData", this.displayMode);
      // Unterscheiden, was aktualisiert werden muss
      switch (this.displayMode) {
        case DisplayMode.TaskSet: if (this.category) { this.showTaskSet(this.category); } break; // Blättermodus
        case DisplayMode.Search: this.search(true); break;// Suchmodus
      }
    }
    console.log("refreshData:dueTaskSet", this.displayMode);
    // immer auch die fälligen Aufgaben aktualisieren, damit die Anzahl in Spalte 1 stimmt!
   let r2 = await this.miracleListProxyV2.dueTaskSet().toPromise();
      console.log("refreshData:dueTaskSet",     r2);
      this.dueTaskSet = r2;

      //     this.miracleListProxyV2.dueTaskSet(this.communicationService.token).subscribe(x => {
      // this.dueTaskSet = x;
      // Wenn die fälligen Aufgaben gerade auf dem Schirm sind, dann müssen die in Spalte2 auch angezeigt werden
      if (this.displayMode == DisplayMode.DueTaskSet) this.categorySetWithTaskSet = r2;
  }

  async showCategorySet() {
    console.log('CategorySet LADEN...');
    this.categorySet = await this.miracleListProxyV2.categorySet().toPromise();
    if (this.displayMode === DisplayMode.TaskSet && this.category == null) { this.category = this.categorySet[0]; } // erste Kategorie wählen
    console.log('CategorySet GELADEN', this.categorySet);
    this.refreshData();
  }

   // alt ohne await:
    showCategorySet_alt() {
    console.log('CategorySet LADEN...');
    this.miracleListProxyV2.categorySet().subscribe(
     x => {
      this.categorySet = x;
      if (this.displayMode === DisplayMode.TaskSet && this.category == null) { this.category = this.categorySet[0]; } // erste Kategorie wählen
      console.log("CategorySet GELADEN", x);
      this.refreshData();
     });
  }

  selectCategory(c: Category) {
    console.log("selectCategory", c);
    this.task = null;
    this.searchText = null;
    this.displayMode = DisplayMode.TaskSet;
    this.category = c;
    this.categorySetWithTaskSet = null;
    this.communicationService.navigate(`/app`); // Ansicht aufrufen
    this.showTaskSet(c);
  }

// Neu ab TS 2.1 mit async/await
  async showTaskSet(c: Category) {
   console.log("TaskSet LADEN...");
   let x = await this.miracleListProxyV2.taskSet(c.categoryID).toPromise();
   x = this.neuSortieren(x);
   this.taskSet = x.sort((x,y)=>(x.order-y.order));
    console.log("TaskSet GELADEN", x);
  }

// Alte Variante mit Observable / Subscribe
  showTaskSet_alt(c: Category) {
    console.log("TaskSet LADEN...");
     this.miracleListProxyV2.taskSet(c.categoryID).subscribe(x =>
    {
     this.taskSet = x.sort((x,y)=>(x.order-y.order));
      console.log("TaskSet GELADEN", x);
    });
  }

  private getUndoneSubTaskSet(t: Task): Array<SubTask> {
    if (!t && !t.subTaskSet) { return null; }
    return t.subTaskSet.filter(x => x.done == false);
  }

  showTaskDetail(t: Task) {
    this.task = t;
    this.communicationService.navigate(`/app/(column3:taskview/${t.taskID})`); // Ansicht aufrufen
    console.log("--> TASK: " + t.info);
  }

  changeDone(t: Task) {
    console.log("Task ÄNDERN", t);
    this.miracleListProxyV2.changeTask(t).subscribe(
      x => {
        console.log("Task GEÄNDERT", x)
        this.refreshData(true);
          if (  this.displayMode === DisplayMode.DueTaskSet) this.task = null; // Wenn gerade eine fällige Aufgabe abgeharkt wurde, dann sollte die nicht mehr in Einzelansicht erscheinen, weil die ja aus der Liste verschwindet
      });
  }

  editTask(t: Task) {
    this.communicationService.navigate(`/app/(column3:taskedit/${t.taskID})`); // Ansicht aufrufen
  }

  // Kontextmenü: http://embed.plnkr.co/wpJXpEh4zNZ4uCxTURx2/

  deleteTask(t: Task) {
    // Dialog anzeigen
    let dialog = this.modal.confirm()
      .okBtn('Löschen')
      .cancelBtn('Abbrechen')
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Löschen bestätigen')
      .body(`Soll die Aufgabe <b>${t.title}</b> und alle damit verbundenen Details wirklich für <b>immer gelöscht</b> werden?`)
      .open();

    // Dialog-Ergebnis (Promise) auswerten
    dialog.then((d) => d.result)
      .then((ok) => {
        this.miracleListProxyV2.deleteTask(t.taskID).subscribe(
          x => {
            console.log("Task GELÖSCHT", t.taskID);
            this.task = null;
            this.showCategorySet();
          });
      },
      (cancel) => { // nichts tun });
      });
  }

  deleteCategory(id: number) {
    this.category = this.categorySet.find(x => x.categoryID == id)
    // Dialog anzeigen
    let dialog = this.modal.confirm()
      .okBtn('Löschen')
      .cancelBtn('Abbrechen')
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Löschen bestätigen')
      .body(`Soll die Kategorie <b>${this.category.name}</b> und alle damit verbundenen Aufgaben wirklich für <b>immer gelöscht</b> werden?`)
      .open();

    // Dialog-Ergebnis (Promise) auswerten
    dialog.then((d) => d.result)
      .then((d) => d.result)
      .then((ok) => {
        this.miracleListProxyV2.deleteCategory( id).subscribe(
          x => {
            console.log("Kategorie GELÖSCHT", id)
            this.displayMode = DisplayMode.TaskSet;
            this.task = null;
            this.taskSet=null;
            this.category = null;
            this.showCategorySet();

            this.communicationService.navigate(`/app`); // Ansicht aufrufen
          });
      },
      (cancel) => { // nichts tun });
      });
  }

  createTask() {
    let t = new Task();
    t.taskID = 0; // notwendig für Server, da der die ID vergibt
    t.title = this.newTaskTitle;
    t.categoryID = this.category.categoryID;
    t.importance = TaskImportance.B;
    t.created = new Date();
    t.due = null;
    t.order = 0;
    t.note = "";
    t.done = false;
    this.miracleListProxyV2.createTask(t ).subscribe(
      x => {
        console.log("Task ERZEUGT", x)
        this.showCategorySet();
        this.newTaskTitle = "";
      });
  }

  createCategory() {
    this.miracleListProxyV2.createCategory(this.newCategoryName).subscribe(
      x => {
        console.log("Kategorie ERZEUGT", x)
        this.category = x;
        this.showCategorySet();
        this.newCategoryName = "";
      });
  }

  getDueTaskSet(showTask: boolean = false) {
    this.miracleListProxyV2.dueTaskSet().subscribe(x => {
      console.log("fällige Aufgaben GELADEN", x);
      if (!showTask) this.task = null;
      this.taskSet = null;
      this.category = null;
      this.dueTaskSet = x;
      this.searchText = "";
      this.categorySetWithTaskSet = x;
      this.displayMode = DisplayMode.DueTaskSet;
    });
  }

  get dueTaskSetCount(): string {
    if (!this.dueTaskSet) return "?"
    let count = 0;
    for (let c of this.dueTaskSet) {
      count += c.taskSet.length;
    }
    return count.toString();
  }

  search(showTask: boolean = false) {
    if (!this.searchText) return "";
    this.miracleListProxyV2.search(this.searchText).subscribe(x => {
      console.log("suche ERGEBNIS", this.searchText, x);
      if (!showTask) this.task = null;
      this.taskSet = null;
      this.category = null;
      this.displayMode = DisplayMode.Search;
      this.categorySetWithTaskSet = x;
    });
  }

  // Speichern der neuen Sortierung
 reorder(task: Task, position: number)
 {console.clear();
  console.log("!Reorder-Auftrag:", task.title, task.order + "->" + position);

  // Schritt 1: IDs verändern
  for(var t of this.taskSet) {
   console.log("-- Task:", t.title, t.order);
   if (t.taskID == task.taskID) {
    console.log("Position setzen", t.title, t.order, position);
    t.order = position;
   } // aktuelles Element
   else {
    if (t.order > position) {
     console.log("nach hinten", t.title, t.order, (t.order + 1));
     t.order = position + t.order;
    } // verschieben nach hinten
    if (t.order <= position) {
     console.log("nach vorne", t.title, t.order, (t.order - 1));
     t.order = position - t.order;
    }// verschieben nach vorne
   }
  }

  this.taskSet = this.neuSortieren(this.taskSet);
  // 3. Alle Speichern
  for(var t of this.taskSet) {

   this.miracleListProxyV2.changeTask(t).subscribe(
    x => {
     // console.log("!!Task GEÄNDERT", x, x.order)
    });
  }
 }

 neuSortieren(taskSet: Array<Task>)
 {
  // neu Sortieren
  var i = 0;
  for(var t of taskSet.sort((x,y)=>(x.order-y.order))) {
   t.order = i;
   i++;
  }
  return taskSet;
 }
}
