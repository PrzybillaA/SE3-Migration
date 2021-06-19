import { TestBed } from '@angular/core/testing';
import {Todo} from './models/todo';
import { DatenbankService } from './datenbank.service';


describe('DatenbankService', () => {
  let service: DatenbankService;
  var todo = new Todo();
  var id;
  var password ="1234";
  todo.titel="Test-Titel";
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Method:setTodo',(done)=>{
    service.setTodo(todo).then((result)=>{
      expect(result).toBeInstanceOf(Todo);
      expect(result).toEqual(jasmine.objectContaining({titel:"Test-Titel"}));
      id = result.id;
      done();
    })
    
    

  })
  it('Method:getTodo',(done)=>{
    service.getTodo(id).then((result)=>{
      expect(result).toBeInstanceOf(Todo);
      expect(result).toEqual(jasmine.objectContaining({titel:"Test-Titel"}));
      done();
    })
  })

  it("Method:removeTodo",(done)=>{
    service.removeTodo(id).then((result)=>{
      expect(result).toBeTrue();
      done();
    })
  })
  it("Method:setPasswort",(done)=>{
    service.setPasswort(password).then((result)=>{
      expect(result).toBeTrue();
      done();
    })
  })
  it("Method:getPasswort",(done)=>{
    service.getPasswort().then((result)=>{
      expect(result).toMatch(password);
      done();
    })
  })
  it("Method:removePasswort",(done)=>{
    service.removePasswort().then((result)=>{
      expect(result).toBeTrue();
      done();
    })
  })
});

