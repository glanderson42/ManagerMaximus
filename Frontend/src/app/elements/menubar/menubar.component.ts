import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("btnOpenSidebar").addEventListener("click", () => {
      const sidebar = document.querySelector(".layout-sidebar");
      if (sidebar.className.includes("opened")) {
        sidebar.className = sidebar.className.replace("opened", "");
      } else {
        sidebar.className = sidebar.className + " opened"
      }
    })
  }

}
