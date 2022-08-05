import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples", () => {
  it("Asynchronous test example - done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log("running assertions - done");
      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  /**
   * O fakeAsync vai incluir o teste dentro da NgZone, que vai permitir
   * que nosso teste seja completado apenas depois de todas as
   * operações assíncronas finalizarem.
   */
  it("Asynchronous test example - setTimeout", fakeAsync(() => {
    let test = false;

    setTimeout(() => {});

    setTimeout(() => {
      console.log("running assertions - setTimeout");
      test = true;
    }, 2000);

    /* tick(500);
    tick(499);
    tick(1); */
    flush(); // Move a execução para este ponto depois de finalizar todas operações assíncronas

    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {
    /**
     * Promises possuem maior prioridade
     * de execução em comparação ao setTimeout
     */
    let test = false;

    console.log("Creating promise");

    setTimeout(() => {
      console.log("setTimeout() first callback triggered");
    });

    setTimeout(() => {
      console.log("setTimeout() second callback triggered");
    });

    Promise.resolve()
      .then(() => {
        console.log("First Promise evaluated succesfully");

        return Promise.resolve();
      })
      .then(() => {
        console.log("Second Promise evaluated succesfully");
        test = true;
      });

    flush();

    console.log("running assertions - plain Promise");

    expect(test).toBeTruthy();

    //Promises = microtask queue
    //SetTimeouts = task queue
  }));

  it("Asynchronous test example - Promises + setTimeout", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it("Asynchronous test example - Observables", fakeAsync(() => {
    let test = false;

    console.log("Creating a Observable");

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);
    console.log("running assertions - observables");
    expect(test).toBe(true);
  }));
});
