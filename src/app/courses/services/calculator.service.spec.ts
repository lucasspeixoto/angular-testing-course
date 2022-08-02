import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

// xdescribe Vai deshabilitar os testes dentro deste bloco
// fdescribe vai focar neste teste apenas
describe("CalculatorService", () => {
  let calculatorService: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    console.log("Calling before...");

    /**
     * spyOn => Quando queremos acessar metodos de um
     * serviço e ter acesso a quantidades de chamadas
     * de metodos deste serviço. Não substitui o
     * objeto 'espiado'
     *
     * spyObject => Substitui o
     */
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    calculatorService = TestBed.inject(CalculatorService);
  });

  it("should add two numbers", () => {
    //xit não vai passar este bloco no teste
    const result = calculatorService.add(3, 2);

    expect(result).toBe(5, "unexpected adition result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const result = calculatorService.subtract(3, 2);

    expect(result).toBe(1, "unexpected subtraction result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
