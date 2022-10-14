import { Component, OnInit } from '@angular/core';
import { GetpostsService } from './getposts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers:[GetpostsService]
})
export class PostsComponent implements OnInit {

  post:any;
  data = {
    'id': '',
    'title' : ''
  }
  load = true;

  constructor(private getservice : GetpostsService) { }

  getdata(){
    this.getservice.getdetails()
    .subscribe((res:any) => {
      this.post = res.posts;
      this.load = false;
    })
    
    console.log('fatch data')

  }

  ngOnInit() {

    this.getdata();
  }

  editTitle(title:any,item:any){
  
    item.title = title;

    // this.getservice.pathdetails(this.data)
    // .subscribe(() => this.getdata())

  }

  deleteData(id:any){
    this.post.splice(id,1);
  }

  
}
