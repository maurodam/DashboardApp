import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DraggableElement } from '../../models/draggable-element.model';
import { Elements } from '../../models/elements.model';

@Component({
  selector: 'app-draggable-element',
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.css'],
})

export class DraggableElementComponent implements OnInit {

  private isDragging = false;
  private draggedElement: HTMLElement | null = null;
  private apiUrl = 'https://localhost:7164';

  public elements: Elements[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getElements();
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag(event: MouseEvent): void {
    if (this.isDragging && this.draggedElement) {
      this.draggedElement.style.top = event.clientY + 'px';
      this.draggedElement.style.left = event.clientX + 'px';
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onDragEnd(event: MouseEvent): void {
    if (this.isDragging && this.draggedElement) {
      this.isDragging = false;

      // Ottengo le coordinate dell'elemento trascinato come stringhe
      const topValue = this.draggedElement.style.top;
      const leftValue = this.draggedElement.style.left;

      // Rimuovo "px" dai valori e converto in int per salvare su db
      const topNumeric = parseInt(topValue, 10);
      const leftNumeric = parseInt(leftValue, 10);

      const coordinates = {
        name: this.draggedElement.id,
        x: leftNumeric,
        y: topNumeric,
      };

      this.saveCoordinates(coordinates);

      this.draggedElement = null;
    }
  }

  onDragStart(event: MouseEvent): void {
    this.isDragging = true;
    this.draggedElement = event.target as HTMLElement;
  }

  private saveCoordinates(coordinates: any): void {
    this.http.post(`${this.apiUrl}/api/SaveCoordinate`, coordinates)
      .subscribe(
        (response) => {
          console.log('Coordinate salvate:', coordinates);
        },
        (error) => {
          console.error('Errore durante il salvataggio delle coordinate:', error);
        }
      );
  }

  private getCoordinatesByName(elementName: string): void {
    this.http.get<any>(`${this.apiUrl}/api/GetCoordinate?elementName=${elementName}`)
      .subscribe((response: any) => {
        const element: DraggableElement = response;

        if (element) {
          const name = element.name;
          const elementTop = element.y; 
          const elementLeft = element.x; 

          console.log('Coordinate salvate:', name, 'top y' + elementTop, 'left x' + elementLeft);

          const elementToPosition = document.getElementById(name) as HTMLElement;

          if (elementToPosition) {
            elementToPosition.style.top = `${elementTop}px`;
            elementToPosition.style.left = `${elementLeft}px`;
          }
        }
      });
  }

  private getElements(): void {
    this.http.get<any>(`${this.apiUrl}/api/GetElements`).subscribe((response: any) => {
      const elements: Elements[] = response;

      if (elements) {
        elements.forEach((element: Elements) => {
          this.elements.push(element);
        });

        this.elements.forEach((element: Elements) => {
          this.getCoordinatesByName(element.name);
        });
      }
    });
  }
}
