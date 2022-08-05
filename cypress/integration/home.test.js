describe("Home Page Ee2 test", () => {
  beforeEach(() => {
    cy.fixture("courses.json").as("coursesJSON");

    cy.server();

    cy.route("/api/courses", "@coursesJSON").as("courses");

    cy.visit("/");
  });

  it("should return an array of courses", () => {
    cy.contains(`All Courses`);

    cy.wait("@courses");

    cy.get("mat-card").should("have.length", 9);
  });

  it("should display the advanced courses", () => {
    cy.get(".mat-tab-label").should("have.length", 2);

    cy.get(".mat-tab-label").last().click();

    cy.get(".mat-tab-body-active .mat-card-title")
      .first()
      .should("contain", "Angular Security Course");
  });
});
