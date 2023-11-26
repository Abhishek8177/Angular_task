import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookListModle } from './home -dashboard';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private formbuilber:FormBuilder, private api:ApiService){}

  bookListModelObj:BookListModle=new BookListModle();
  allBookData !:any;
  showAdd!:boolean;
  showUpdate!:boolean

  formValue !:FormGroup;
  ngOnInit(): void {

    this.formValue=this.formbuilber.group({
      // title:[''],
      title:new FormControl([null,Validators.required]),
      author:new FormControl([]),
      date:new FormControl([]),
      price:new FormControl([])

    })
    this.getAllData()
  }

  postBookDetail(){
    this.bookListModelObj.title=this.formValue.value.title
    this.bookListModelObj.author=this.formValue.value.author
    this.bookListModelObj.date=this.formValue.value.date
    this.bookListModelObj.price=this.formValue.value.price


    this.api.postData(this.bookListModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Book Detail Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllData()

    },
       err=>{
       alert("something went wrong")
     }
    )
  }

  clickAddBook(){
    this.formValue.reset()
    this.showAdd=true;
    this.showUpdate=false;
  }

  
  getAllData(){
    this.api.getData().subscribe(res=>
      this.allBookData=res)
  }

  DeletBooK(row:any){
    this.api.deletData(row.id).subscribe(res=>{
      alert("delet successfully")
      this.getAllData()
    })
  }

  editData(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.bookListModelObj.id=row.id
    this.formValue.controls['title'].setValue(row.title)
    this.formValue.controls['author'].setValue(row.author)
    this.formValue.controls['date'].setValue(row.date)
    this.formValue.controls['price'].setValue(row.price)



   
  }

  updateBookDetail(){
    this.bookListModelObj.title=this.formValue.value.title
    this.bookListModelObj.author=this.formValue.value.author
    this.bookListModelObj.date=this.formValue.value.date
    this.bookListModelObj.price=this.formValue.value.price
    this.api.updateData(this.bookListModelObj,this.bookListModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllData()
  
    }

    )

  }
  


}
