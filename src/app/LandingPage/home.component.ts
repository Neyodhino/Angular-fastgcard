import { Component, OnInit, Renderer2, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

    isHidden: boolean = false
    @ViewChild("mobilenav") mobilenav:ElementRef<any>;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
  }

  toggleMenu(){
    this.isHidden = !this.isHidden;
    
    if(this.isHidden == false)
        this.renderer.setStyle(this.mobilenav.nativeElement, 'display', 'none');
    else
      this.renderer.setStyle(this.mobilenav.nativeElement, 'display', 'block');

  }
}
