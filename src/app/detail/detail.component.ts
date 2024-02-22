import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DEFAULT_ITEM, Item} from "../../libs/model/item";
import {Category} from "../../libs/model/category";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {futureDateValidator} from "../../libs/validators/future-date/future-date.directive";
import {TypedForm} from "../../libs/model/typedform";
import {Observable} from "rxjs";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    NgIf,
    FormsModule,
    MatFormField,
    MatCardContent,
    MatInput,
    MatCardActions,
    MatButton,
    MatCheckbox,
    MatLabel,
    MatIcon,
    RouterLink,
    RouterLinkActive,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatSuffix,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  @Output() onContentSave = new EventEmitter<Item>;
  @Output() onCancel = new EventEmitter;
  @Input() selectedContent!: Observable<Item | null>;

  private formBuilder : FormBuilder = inject(FormBuilder);

  title = 'Select an item or add a new one!';
  localContent: Item = {...DEFAULT_ITEM};
  categories: string[] = Object.values(Category);
  reactiveForm!: TypedForm<Item>;

  ngOnInit() {
    // Init the form to empty fields
    this.reactiveForm = this.formBuilder.nonNullable.group({
      'id': ['', ],
      'name': ['', Validators.required],
      'quantity': [0, [Validators.required, Validators.min(0)]],
      'category': ['', Validators.required],
      'receiveDate': ['', Validators.required],
      'hasExpiration': [false],
      'expirationDate': ['']
    }, {validators: futureDateValidator});

    // Setup the change listener to keep the local copy sync'd
    this.reactiveForm.valueChanges.subscribe(content => {
      this.localContent = {...DEFAULT_ITEM, ...content};
    });

    this.selectedContent.subscribe(changes => {
      console.log('DT Processing Change: ' + JSON.stringify(changes));
      this.updateToCurrentSelected(changes);
    });
  }

  updateToCurrentSelected(content: Item | null) {
    if (content) {
      console.log('DT Update Content to New: ' + JSON.stringify(content));
      // new selected content exists so update local and form to it
      this.localContent = {...content};
      this.reactiveForm.reset({...content});
    } else {
      console.log('DT Update Content to Null: ' + JSON.stringify(content));
      // update happened with selected content empty so reset local and form content
      this.localContent = {...DEFAULT_ITEM};
      this.reactiveForm.reset({...DEFAULT_ITEM});
    }
  }
}
