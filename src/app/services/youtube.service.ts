import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = environment.apikey;
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';
    
  constructor(private http: HttpClient) { }

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('key', this.apiKey );

    if (this.nextPageToken) {
      params = params.append('pageTolen', this.nextPageToken);
      console.log(params)
    }

    return this.http.get(url, {params: params} ).pipe(
      map( (res: any) => {
        this.nextPageToken = res.nextPageToken;
        let videos = [];
        for (let video of res.items) {
          videos.push(video.snippet)
        }
        return videos;
      })
    );
  }
}
