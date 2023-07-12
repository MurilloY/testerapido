import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  public showWebcam = true;
  showCropper = false;
  croppedImage: any = '';
  imageChangedEvent: any = '';

  imageBase64: string;


  //webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  //latest snapshot
  public webcamImage: any = null;
  public webCamIsOpen: boolean = false;
  public allowCameraSwitch = true;
  public activeWebCam: boolean = true;
  public photoTaken: boolean = false;
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  public videoOptions: MediaTrackConstraints = { facingMode: 'use' };
  public errors: WebcamInitError[] = [];

  constructor(public dialogRef: MatDialogRef<AddPhotoComponent>,) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.imageBase64 != ''){

      let data = {
        ok: true,
        photo: this.imageBase64
      }

      this.dialogRef.close(data);
    }

  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    this.imageBase64 = webcamImage.imageAsDataUrl;
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.webCamIsOpen = true;
    //this.deviceId = deviceId;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);

    console.log(error)
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.activeWebCam = false;
    this.photoTaken = true;
  }

  public tryAgainSnapshot() {

    this.imageBase64 = '';
    this.croppedImage = '';
    this.webcamImage = false;
    this.photoTaken = false;
    this.activeWebCam = true;
    this.webCamIsOpen = false;
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("imageCropped: ", event);
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }


}
