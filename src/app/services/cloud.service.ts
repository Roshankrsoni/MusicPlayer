import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files: any = [
// tslint:disable-next-line: max-line-length

    {
      url: 'https://www.talk2trend.com/bollywood/badshah-shehar-ki-ladki-mp3-download.mp3',
      name: 'Shehar Ki Ladki',
      artist: 'Badshah',
      photo: 'https://c.ndtvimg.com/2019-07/8jgrav7_suneil-shetty_625x300_05_July_19.jpg'
    },
    {
      url: 'https://www.talk2trend.com/bollywood/ve-maahi-kesari.mp3',
      name: 'Ve Maahi - Kesari',
      artist: 'Arijit Singh',
      photo: 'https://i.ytimg.com/vi/4uevtsRlGww/maxresdefault.jpg'
    },
    {
      url: 'https://www.talk2trend.com/bollywood/teri-mitti.mp3',
      name: 'Teri Mitti',
      artist: 'B Praak, Jani',
      photo: 'https://i.ytimg.com/vi/wF_B_aagLfI/maxresdefault.jpg'
    },
    {
      url: 'https://www.talk2trend.com/bollywood/sher-aaya-sher-gully-boy.mp3',
      name: 'Sher Aaya Sher',
      artist: 'Divine, Dub Sharma',
      photo: 'https://i.ytimg.com/vi/M81wneSjQbA/maxresdefault.jpg'
    },
    {
      url: 'https://www.talk2trend.com/bollywood/arijit-singh-new-mp3-song-pachtaoge-download.mp3',
      name: 'Pachtaoge',
      artist: 'Arijit Singh',
      photo: 'https://i.ytimg.com/vi/PVxc5mIHVuQ/maxresdefault.jpg'
    }
  ];

  getFiles() {
   return of(this.files);
  }
}