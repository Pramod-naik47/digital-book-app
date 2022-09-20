import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { BookService } from '../services/book/book.service';

import { AuthorComponent } from './author.component';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let books = [
    {
      bookId: 1,
      bookTitle: 'Avengrs',
      category: 'MAction',
      price: 100,
      content: 'Avengers',
      active: true,
      createdDate: new Date,
      modifiedDate: new Date,
      publishDate: new Date,
      publisher: 'Marvel',
      userName: 'Pramod',
      userType: 'Author',
      userId: 10,
      email: 'pamod@gmail.com',
      phoneNumber: 9482022134
    },
    {
      bookId: 1,
      bookTitle: 'Avengrs',
      category: 'MAction',
      price: 100,
      content: 'Avengers',
      active: true,
      createdDate: new Date,
      modifiedDate: new Date,
      publishDate: new Date,
      publisher: 'Marvel',
      userName: 'Pramod',
      userType: 'Author',
      userId: 10,
      email: 'pamod@gmail.com',
      phoneNumber: 9482022134
    }];

  let mockPostService = jasmine.createSpyObj(['DeleteBook']);

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ AuthorComponent ],
      imports : [HttpClientModule, ToastrModule.forRoot()],
      schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers : [
        {provide : BookService, useValue : mockPostService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify expected data', () => {
    component.books = books;
    fixture.detectChanges();
    component.OnSearchSubmitted(component.books);
    expect(component.books).toBe(component.books);
  });

  

});
