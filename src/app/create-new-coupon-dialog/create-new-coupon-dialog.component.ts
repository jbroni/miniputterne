import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

class NewCouponErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null): boolean {
    return control ? control.invalid : true;
  }
}

@Component({
  selector: 'app-create-new-coupon',
  templateUrl: './create-new-coupon-dialog.component.html',
  styleUrls: ['./create-new-coupon-dialog.component.css']
})
export class CreateNewCouponDialogComponent implements OnInit, OnDestroy {
  public weekNumber: FormControl;
  public errorStateMatcher: NewCouponErrorStateMatcher;
  private keyPressEventHandler: (event: KeyboardEvent) => void;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialogRef<CreateNewCouponDialogComponent>) {}

  ngOnInit() {
    this.weekNumber = new FormControl('', [Validators.required, Validators.min(1), Validators.max(53)]);

    this.errorStateMatcher = new NewCouponErrorStateMatcher();

    this.keyPressEventHandler = event => {
      const ENTER = 13;
      const key = event.which || event.keyCode;
      if (key === ENTER) {
        this.ok();
      }
    };

    document.addEventListener('keypress', this.keyPressEventHandler);
  }

  ngOnDestroy() {
    document.removeEventListener('keypress', this.keyPressEventHandler);
  }

  public ok(): void {
    if (this.weekNumber.valid) {
      this.dialog.close(this.weekNumber.value);
    }
  }
}
