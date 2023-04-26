import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() navToggle: EventEmitter<boolean> = new EventEmitter();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  navOpen() {
    this.navToggle.emit(true);
  }

}
