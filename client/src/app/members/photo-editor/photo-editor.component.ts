import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() member:Member | undefined;
uploader:FileUploader | undefined;
hasDropzoneOver=false;
baseUrl=environment.apiUrl;
user:User | any;

  constructor(private accountService :AccountService,private memberService :MembersService) { 

    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);

  }

  ngOnInit(): void {
    this.initizeUploader();
  }
  fileOverBase(e:any)
  {
    this.hasDropzoneOver=e;
  }

  initizeUploader()
  {
    this.uploader=new FileUploader({
      url:this.baseUrl+'users/add-photo',
      authToken:'Bearer '+this.user?.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false;
    }
    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      if (response) {
        const photo=JSON.parse(response);
        this.member?.photos.push(photo);
        
      }
    }
  }

  setMainPhoto(photo:Photo)
  {
    this.memberService.setMainPhoto(photo.id).subscribe(()=>{
      this.user.photoUrl=photo.url;
      this.accountService.setCurrentUser(this.user); 
      if (this.member!=undefined) {
        this.member.photoUrl=photo.url;  
        this.member.photos.forEach(p=>{
          if (p.isMain) p.isMain=false;
          if (p.id===photo.id) p.isMain=true; 
        })
      }

      
    })
  }

  deletePhoto(photoId:number)
  {
    this.memberService.deletePhoto(photoId).subscribe(()=>{
      if (this.member!=null) {
        this.member.photos=this.member.photos.filter(x=>x.id!==photoId);
      }
      
    })
  }
}
