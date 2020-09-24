import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dbFire: AngularFireList<any>;
  courses$: Observable<{}[]>;

  constructor(private db: AngularFireDatabase) {

    this.courses$ = db.list('/courses').valueChanges();

    this.dbFire = db.list('/courses');

    this.courses$ = this.dbFire.snapshotChanges();
  }

  add(course: HTMLInputElement) {
    this.dbFire.push(course.value);
    course.value = '';
  }

  update(course) {
    const key = course.payload.key;
    this.db.object('/courses/' + key).set(course.payload.val() + ' UPDATED');
  }

  delete(course) {
    const key = course.payload.key;
    this.db.object('/courses/' + key).remove();
  }
}
