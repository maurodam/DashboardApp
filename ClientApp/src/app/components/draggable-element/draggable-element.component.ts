import { Component, HostListener, OnInit } from '@angular/core';
import { Elements } from '../../models/models';
import { DraggableElementService } from '../../services/draggable-element.service';


@Component({
  selector: 'app-draggable-element',
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.css'],
})

export class DraggableElementComponent implements OnInit {

  private isDragging = false;
  private draggedElement: HTMLElement | null = null;
  public loading = true;

  public elements: Elements[] = [];

  constructor(private draggableElementService: DraggableElementService) { }

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
        elementId: this.draggedElement.id,
        name: this.draggedElement.getAttribute('name'),
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
    this.draggableElementService.saveCoordinates(coordinates)
      .subscribe(
        (response) => {
        },
        (error) => {
          console.log('Errore saveCoordinates:', error);
        }
      );
  }

  private getCoordinatesById(elementId: number): void {
    this.draggableElementService.getCoordinatesById(elementId)
      .subscribe(
        (element) => {
          if (element) {

            console.log('Coordinate salvate:', element.elementId, 'top y' + element.y, 'left x' + element.x);

            const elementToPosition = document.getElementById(element.elementId.toString()) as HTMLElement;

            if (elementToPosition) {
              elementToPosition.style.top = `${element.y}px`;
              elementToPosition.style.left = `${element.x}px`;
            }
          }
        },
        (error) => {
          console.log('Errore getCoordinatesByName:', error);
        }
      );
  }

  private getElements(): void {
    this.draggableElementService.getElements()
      .subscribe(
        (elements) => {
          this.elements = elements;

          elements.forEach((element: Elements) => {
            this.getCoordinatesById(element.id);
          });

          this.loading = false;
        },
        (error) => {
          console.log('Errore getElements:', error);
        }
      );
  }
}
