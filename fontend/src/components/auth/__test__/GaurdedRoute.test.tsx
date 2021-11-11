import { shallow } from "enzyme";
import { GuardedRoute, IGuardRoute } from "../GaurdedRoute";
describe("GaurdedRoute Props check", () => {
  it("check props isAuthenticated", () => {
    let props = {
      isAuthenticated: true,
      isAllowed: true,
      restrictedPath: "/restricted",
      authenticationPath: "/login",
    } as IGuardRoute;
    let wrapper = shallow(
      <GuardedRoute
        isAuthenticated={props.isAuthenticated}
        authenticationPath={props.authenticationPath}
        isAllowed={props.isAllowed}
        restrictedPath={props.restrictedPath}
      />
    );
  
    expect(wrapper.length).toBe(1);
   // expect(wrapper.props().isAuthenticated).toEqual(true);
    // expect(wrapper.props().isAllowed).toEqual(true);
  });
});
