import { Component, OnInit, ViewChild } from '@angular/core';

// for reactive form
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// for snack bar
import {MatSnackBar} from '@angular/material/snack-bar';
// for dialog
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

//for sorting table
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

//for paginator
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  numbers = [];

  displayedColumns: string[] = ['position', 'name', 'symbol', 'weight'];
  displayedColumns1: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns2: string[] = ['position', 'weight', 'symbol', 'name'];
  dataSource = ELEMENT_DATA;
  dataSource1 = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  title = 'angular-material';
  notifications = 0;
  showSpinner = false;
  showProgress = false;
  opened = false;
  opened4SNTT = false;
  selectedValue: string;  
  selectedValue1: string;  
  selectedValue2: string;
  options: string[] = ['Angular', 'React', 'Vue'];  
  objectOptions = [
    {name: 'Angular'}, 
    {name: 'Angular Material'}, 
    {name: 'React'}, 
    {name: 'Vue'}
  ];  
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  
  minDate = new Date();
  // month index starts at 0
  maxDate = new Date(2020, 7, 14);
  
  
  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    
    for(let i=0; i < 1000; i++){
      this.numbers.push(i);
    }

  }

  ngOnInit(){
    
    //sorts data table wip
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;

    // whenever the input value [myControl] changes the [pipe()] method is called 
    // and it calls the [_filter()] method
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }

  applyFilter(filterValue: string){
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(filterValue: string){
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  logData(row){
    console.log(row);
  }

  openDialog(){

    // height and width of dialog box can be passed into configuration object (in open() method check docs 
    let dialogRef = this.dialog.open(DialogExampleComponent, {data:{name: 'Fred'}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }

  openCustomSnackBar(){
    this.snackBar.openFromComponent(CustomSnackBarComponent, {duration: 2000})
  }

  openSnackBar(message, action){
    
    // message is left aligned action is right aligned has (click) assigned to it object duration delays automatic closing of snackbar
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});
    
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered');
    });

  }
  
  dateFilter = date => {

    const day = date.getDay();
    return day!=0 && day !=6;

  }

  // accepts the value being filtered and checks to see if it matches [options] 
  // if option doesn't match filtered texted that option is hidden in the auto-complete
  private _filter(value: string): string []{
    
    const filterValue = value.toLowerCase();
    
    return this.options.filter(fOption =>
      fOption.toLowerCase().includes(filterValue)
    );
  
  }

  loadData(){
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false
    }, 5000);
  }
  
  loadProgress(){
    this.showProgress = true;
    setTimeout(() => {
      this.showProgress = false
    }, 5000);
  }

  log(state){
    console.log(state);
  }

  logChange(index){
    console.log(index);
  }

  displayFn(objectOption){
    // if there is an objectOption return its name if not than return the key word undefined
    return objectOption ? objectOption.name : undefined;
  }

}



@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: orange'>Custom Snackbar</span>`
})
export class CustomSnackBarComponent{}