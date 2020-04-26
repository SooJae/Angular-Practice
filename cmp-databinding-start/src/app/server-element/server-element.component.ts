import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterViewInit {

  public test = 'constructor';
  @Input('srvElement')
  element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;

  constructor() {
    console.log('constructor called', this.test);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.test);
  }

  ngOnInit(): void {
    console.log(this.header.nativeElement.textContent);
    console.log('ngOninit called');
  }

  ngAfterViewInit(){
    console.log('text',this.header.nativeElement.textContent);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck Called!');
  }
}
