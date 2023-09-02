console.clear();
import { interval, of } from 'rxjs';
import { scan, delay, repeat, mergeMap } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/scan
// Example 4: Accumulating http responses over time

const fakeRequest = of('response').pipe(delay(2000));

interval(1000)
  .pipe(
    mergeMap((_) => fakeRequest),
    scan<string>(
      (allResponses, currentResponse) => [...allResponses, currentResponse],
      []
    )
  )
  .subscribe(console.log);

// output:
// ['response'],
// ['response','response'],
// ['response','response','response'],
// etc...
