import { TestBed } from '@angular/core/testing';
import { Todo } from './models/todo';
import { DatenbankService } from './datenbank.service';


describe('DatenbankService', () => {
  let service: DatenbankService;
  var todo = new Todo();
  todo.titel = "Test-Titel";
  var todo2 = new Todo();
  todo2.titel = "Test-Titel2";
  var id;
  var password = "1234";

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Unit-Tests für die Methode testdatenBefuellen()
   */
   it('method:testdatenBefuellen', (done) => {
    expect(service.testdatenBefuellen()).toBeTruthy();
  });

  /**
   * Unit-Tests für die Methode getAlleTodos()
   */
  it('method:getAlleTodos', (done) => {
    service.setTodo(todo).then((todo1Res) => {
      service.setTodo(todo2).then((todo2Res) => {
        service.getAlleTodos().then((result) => {
          expect(result.length).toBeGreaterThan(1);
          expect(result[0]).toBeInstanceOf(Todo);
          expect(result[1]).toBeInstanceOf(Todo);
          service.removeTodo(todo1Res.id);
          service.removeTodo(todo2Res.id);
          done();
        });
      });
    });
  });

  /**
   * Unit-Tests für die Methode getTodo() und setTodo()
   */
  it('Method:getTodo && setTodo', (done) => {
    service.setTodo(todo).then((todoRes) => {
      service.getTodo(todoRes.id).then(resultGet => {
        service.removeTodo(todoRes.id).then(() => {
          todo.id = todoRes.id;
          expect(resultGet).toBeInstanceOf(Todo);
          expect(resultGet).toEqual(todo);
          done();
        });
      });
    });
  });
  

  /**
   * Unit-Tests für die Methode getTodo() und setTodo()
   */
  it("Method:removeTodo", (done) => {
    service.setTodo(todo).then((todoRes) => {
      service.removeTodo(todoRes.id).then((result) => {
        service.getTodo(todoRes.id).then(resultGet => {
          expect(resultGet).toBeInstanceOf(Todo);
          expect(resultGet).toEqual(new Todo());
          expect(result).toBeTrue();
          done();
        });
      });
    });
  });

  /**
   * Unit-Tests für die Methode setPasswort()
   */
  it("Method:setPasswort", (done) => {
    service.setPasswort(password).then((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  /**
   * Unit-Tests für die Methode checkPasswort()
   */
  it("Method:checkPasswort", (done) => {
    service.setPasswort(password).then(() => {
      service.checkPasswort(password).then((result) => {
        expect(result).toBeTrue();
      });
      service.checkPasswort(password + 1).then((result) => {
        expect(result).toBeFalse();
        done();
      });
    });
  });

  /**
   * Unit-Tests für die Methode login()
   */
  it("Method:login()", (done) => {
    service.login().then((resultLogin) => {
      service.isLoggedIn().then(resultLoggedIn => {
        expect(resultLogin).toBeTrue();
        expect(resultLoggedIn).toBeTrue();
        done();
      });
    });
  });

  /**
   * Unit-Tests für die Methode logout()
   */
  it("Method:logout()", (done) => {
    service.logout().then(resultLogout => {
      service.isLoggedIn().then(resultLoggedIn => {
        expect(resultLogout).toBeTrue();
        expect(resultLoggedIn).toBeFalse();
        done();
      });
    });
  });

  /**
   * Unit-Tests für die Methode isLoggedIn()
   */
  it("Method:isLoggedIn()", (done) => {
    service.login().then(() => {
      service.isLoggedIn().then(resultLogin => {
        service.logout().then(() => {
          service.isLoggedIn().then(resultLogout => {
            expect(resultLogin).toBeTrue();
            expect(resultLogout).toBeFalse();
            done();
          });
        });
      });
    });
  });

  /**
   * Unit-Tests für die Methode isRegistered
   */
  it("Method:isRegistered()", (done) => {
    service.setPasswort(password).then(() => {
      service.isRegistered().then(resultTrue => {
        service.removePasswort().then(() => {
          service.isRegistered().then(resultFalse => {
            expect(resultTrue).toBeTrue();
            expect(resultFalse).toBeFalse();
            done();
          });
        });
      });
    });
  });

  /**
   * Unit-Tests für die Methode removePasswort()
   */
  it("Method:removePasswort", (done) => {
    service.removePasswort().then((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  /**
   * Unit-Tests für die Methode clear()
   */
  it("Method:clear", (done) => {
    service.setTodo(todo).then(() => {
      service.clear().then(result => {
        service.getAlleTodos().then(resultGet => {
          expect(result).toBeTrue();
          expect(resultGet.length).toBe(0);
          done();
        });
      })
    })
  });
  
  it("Method:setLevel",(done)=>{
    service.setLevel(4).then((result)=>{
      expect(result).toEqual(4);
      done();
    })
  })

  it("Method:setPoints",(done)=>{
    service.setPoints(4).then((result)=>{
      expect(result).toEqual(4);
      done();
  })
  })
});

