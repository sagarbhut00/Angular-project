import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';

  constructor(private router: Router) {
  }

  onNavigate(path: String) {
    this.router.navigate([path]);
  }
}
