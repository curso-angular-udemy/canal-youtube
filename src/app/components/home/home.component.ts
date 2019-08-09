import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  videos: any[];
  videoSel: any;

  constructor( private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.youtubeService.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  verVideo(video) {
    this.videoSel = video;
    $('#myModal').modal()
    console.log(video);
  }

  cerrarModal() {
    this.videoSel = null;
    $('#myModal').modal('hide');
  }

  cargarMas() {
    this.youtubeService.getVideos().subscribe(videos => {
      this.videos.push.apply(this.videos, videos);
      console.log(this.videos)
    });
  }

}
