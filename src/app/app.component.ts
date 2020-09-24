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
  courses$: Observable<any>;
  course$;
  author$;

  constructor(db: AngularFireDatabase) {

    this.courses$ = db.list('/courses').valueChanges();

    this.course$ = db.object('/courses/1').valueChanges();

    this.author$ = db.object('/authors/1').valueChanges();

    this.dbFire = db.list('/courses');
  }

  add(course: HTMLInputElement){
    this.dbFire.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        { title: 'Components'},
        { title: 'Directives'},
        { title: 'Template'}
      ]
    });
    course.value = '';
  }

}
