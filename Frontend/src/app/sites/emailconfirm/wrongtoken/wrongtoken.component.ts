import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrongtoken',
  templateUrl: './wrongtoken.component.html',
  styleUrls: ['./wrongtoken.component.scss']
})
export class WrongtokenComponent implements OnInit {

  constructor(private router: Router) { }

  goToPage(pageName: string) {
    this.router.navigate(['/' + pageName]);
  }
  ngOnInit() {
  }

}
