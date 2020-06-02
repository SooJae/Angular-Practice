import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from "rxjs/operators";
import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-43608.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData.name);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-43608.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          let postsArray: Post[] = [];
          Object.keys(responseData)
            .filter(key => responseData.hasOwnProperty(key))
            .forEach(key =>
              postsArray = [...postsArray, {...responseData[key], id: key}]
            );
          return postsArray;
        })
      )
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }
}
