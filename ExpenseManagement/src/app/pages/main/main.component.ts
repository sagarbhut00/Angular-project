import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // navList: string[] = ['Dashboard','Transactions', 'Income', 'Expense',];

  navList = [
    {
      path: 'dashboard',
      name: 'Dashboard'
    },
    {
      path: 'category/income',
      name: 'Income'
    },
    {
      path: 'category/expense',
      name: 'Expense'
    },
    {
      path: 'category',
      name: 'Category'
    },
  ]

  constructor(private router: Router,
    private authservice: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    if (confirm('Are you sure, you want Logout?')) {
      localStorage.removeItem('user');
      this.router.navigate(['']);
      this.authservice.isSignin.next(false);
    }
  }

}
