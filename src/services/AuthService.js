import {BehaviorSubject, Observable} from 'rxjs'

export default class AuthService
{
    constructor() {
        this.subjectAuth = new BehaviorSubject(false);
        this.subjectAdmin = new BehaviorSubject(false);
        this.accounts = [
            {username: 'user', password: 'user', role: 'user'},
            {username: 'admin', password: 'admin', role: 'admin'},
        ];
    }

    isAuth() {
        return this.subjectAuth.asObservable();
    }
    isAdmin() {
        return this.subjectAdmin.asObservable();
    }

    login(user) {
        const account = this.accounts.find( acc => {
            return user.username === acc.username && user.password === acc.password;
        })

        if (account)
        {
            this.subjectAuth.next(true);
            if (account.role === 'admin')
                this.subjectAdmin.next(true);

            return account.username;
        }
    }

    logout() {
        this.subjectAuth.next(false);
        this.subjectAdmin.next(false);
    }
}
