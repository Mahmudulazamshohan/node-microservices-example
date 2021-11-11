import React from "react";

import { BoardListCard } from "../board.list.card";
import { shallow } from "enzyme";

describe("BoardListCard props testcase", () => {
  beforeEach(() => {
    console.log("--->");
  });
  it("BoardListCard props checked", () => {
    var wrapper = shallow(<BoardListCard>shohan</BoardListCard>);

    var divElement = wrapper.find(".button");
    divElement.simulate("click");

    var counterElement = wrapper.find(".counter");
    expect(counterElement.text()).toEqual("1");
  });
});
