import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { User } from './user.model';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

/* Step 1:  create variable to hold your Cognito user data   */
const POOL_DATA = {
  UserPoolId: 'POOL_ID',
  ClientId: 'APP_CLIENT_ID'
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
/* Step 2:  create class to be exported that takes care of authentication */
export class AuthService {
  /* step 1:  Declarations.  Need observables to watch behavior, and a place to store a user */
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  registeredUser: CognitoUser;

  /* step 2:  add router to the Constructor */
  constructor(private router: Router) {
  }

  /* step 3:  create the data that aws needs as paramaters using the method params
  then you run the aws specific method that adds a user using these params, 
  then you set the registeredUser variable*/
  signUp(username: string, email: string, password: string): void {
    /* step 1:  set current behavior */
    this.authIsLoading.next(true);

    /* step 2:  Create a variable that holds your user object with items equal to the method params*/
    const user: User = {
      username: username,
      email: email,
      password: password
    };

    /* step 3:  create attribute list variable, and make a variable for each object.
    Use the user object you created to set the values */
    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };

    /* step 4:  push the attributes you created into your attribute list
    Use the method provided in amazon SDK to create these attributes */
    attrList.push(new CognitoUserAttribute(emailAttribute));

    /* step 5:  call the method signUp from the amazon SDK on your user pool.  
    user the user in order to fill the paramaters required.   */
    userPool.signUp(user.username, user.password, attrList, null, (err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        return;
      }

      /* step 6:  on success, you update the behavior and set the current registeredUser 
      to the user from cognito */
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      this.registeredUser = result.user;
    });
    return;
  }

  /* step 4:  create data that is accessible to aws, then run an aws method that checks if the user is valid
  if its valid, send him to the home page */
  confirmUser(username: string, code: string) {
    this.authIsLoading.next(true);

    /* create local variable that holds a users name and the full pool of users */
    const userData = {
      Username: username,
      Pool: userPool
    };

    /* create a local variable for a CognitoUser object with the paramater of 
    the user data */
    const cognitUser = new CognitoUser(userData);

    /* run an amazon SDK method confirmRegistration with a code, a boolean, and a callback */
    cognitUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);

      /* on success, you run a method specific to router that navigates to a url */
      this.router.navigate(['/']);
    });
  }

  /* Step 5:  Create an object for a users auth data, and one for user and userpool.  
  use aws method to create auth stuff based on the auth data.  make an aws user variable 
  based on your original user object.   */
  signIn(username: string, password: string): void {
    this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess (result: CognitoUserSession) {
        that.authStatusChanged.next(true);
        that.authDidFail.next(false);
        that.authIsLoading.next(false);
        console.log(result);
      },
      onFailure(err) {
        that.authDidFail.next(true);
        that.authIsLoading.next(false);
        console.log(err);
      }
    });
    this.authStatusChanged.next(true); // create user with cognito data
    return;
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }

  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authStatusChanged.next(auth)
    );
  }
}
