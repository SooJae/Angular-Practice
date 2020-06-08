import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {map, catchError, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();


  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-43608.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }
      ).subscribe(
      responseData => {
        console.log(responseData);
      },
      error => {
        this.error.next(error.message);
      }
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-43608.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          params: searchParams
        })
      .pipe(
        map(responseData => {
          let postsArray: Post[] = [];
          Object.keys(responseData)
            .filter(key => responseData.hasOwnProperty(key))
            .forEach(key =>
              postsArray = [...postsArray, {...responseData[key], id: key}]
            );
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-43608.firebaseio.com/posts.json',
      {
        observe: 'events',
      }
    ).pipe(tap(event => {
      if (event.type === HttpEventType.Sent) {
        console.log(event.type);
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
