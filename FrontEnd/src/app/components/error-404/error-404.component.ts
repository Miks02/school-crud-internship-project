import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-404',
  imports: [],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss'
})
export class Error404Component implements OnInit{
 constructor(private router: Router) {}

  counter: number = 3;
  private intervalidId: any;



  ngOnInit() {
    this.intervalidId = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      }
      else {
        clearInterval(this.intervalidId);
        this.router.navigate(['/']);
      }
    }, 1000)
  }

 ngOnDestroy(): void {
    clearInterval(this.intervalidId);
  }

}
