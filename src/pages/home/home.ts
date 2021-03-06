import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail'
import { ExpenseService } from '../../app/expense.service';
import { Expense } from '../../app/expense.model';
import { AuthService } from '../../app/auth.service';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses: Expense[];

  constructor(public navCtrl: NavController,
    public authService: AuthService,
    public expenseService: ExpenseService) {}

  ionViewWillEnter() {
    this.expenseService.getExpenses()
    .then(expenses => this.expenses = expenses);
  }

  onItemClick(expense: Expense) {
    console.log('expense:', expense);
    this.navCtrl.push(DetailPage, {
      expenseId: expense.id
    });
  }
  onAddClick() {
    this.navCtrl.push(DetailPage);
  }

  logout() {
    this.authService.unauthenticate();
    this.navCtrl.setRoot(LoginPage);
    console.log('log out!');
  }

}
