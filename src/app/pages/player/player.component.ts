import { Component, OnInit} from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { Observable, fromEvent} from 'rxjs';
import {debounceTime, delay} from 'rxjs/operators';
// import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  showMyContainer: boolean = false;
  source$: Observable<Event>;
filepic:any
SongName:any;
sessionSong:any;
sessionVol:any;
SliderChan:any;

  constructor(private audioService: AudioService, cloudService: CloudService) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      // this.filepic;

      this.files = files;
      console.log(this.files);
    });
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      let Newevents = events;
      //  console.log(events.type);
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
    this.filepic = this.currentFile.file.photo;

    localStorage.setItem('SongNo', this.currentFile.index+0);

    this.SongName = this.currentFile.file.name+' | '+ this.currentFile.file.artist;

    const sIndex = localStorage.getItem('SongNo');
    this.sessionSong = this.files[sIndex];
    console.log(this.sessionSong);

  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    localStorage.setItem('SongNo', index);
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
    // localStorage.setItem('SliderChange', change.value);

  }

  onVolumeSlider(e){
    this.audioService.changeVol(e.value);
    localStorage.setItem('SongVol', e.value);

  }

  ngOnInit(){

    this.init();
    this.filepic = 'https://2.bp.blogspot.com/-Q1PKQJeT9eg/XNO5gsMt_eI/AAAAAAAANwg/24lca8lqlW8TGojxCrc-jGS_a-QicH6swCLcBGAs/w1200-h630-p-k-no-nu/color%2Bmusic%2Bfestival%2Bwolf.jpg';
    this.sessionVol = 10;
    this.SongName = 'Click any song to play';
      this.audioService.getState()
      .subscribe(state => {
        this.state = state;
        if(this.state.readableCurrentTime > '0' && this.state.readableCurrentTime == this.state.readableDuration){
          const index = this.currentFile.index + 1;
          const file = this.files[index];
          this.openFile(file, index);
        }
      });



  }

  init(){
        this.source$ = fromEvent(window, 'storage');
        this.source$.pipe(delay(500)).subscribe(
          ldata => {
                const sIndex = localStorage.getItem('SongNo');
                const SongVol = localStorage.getItem('SongVol');
                // const SliderChange = localStorage.getItem('SliderChange');
                this.sessionSong = this.files[sIndex];
                this.sessionVol = SongVol;
                this.audioService.changeVol(this.sessionVol);

                // this.SliderChan = SliderChange;
                // this.audioService.seekTo(this.SliderChan);

                this.audioService.stop();
                this.playStream(this.sessionSong.url);
      })

  }

}
