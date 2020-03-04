import React, { useCallback, useState } from "react";
import { render } from "react-dom";

const Foo = React.memo(({ value }) => <p>{value.message}</p>);
const Bar = () => {
  const [count, setCount] = useState(0);

  const handleClicked = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <>
      <Foo value={{ message: "hello" }} />
      <Foo value={{ message: `${count}` }} />
      <button onClick={handleClicked}>+1</button>
    </>
  );
};

const App = () => <Bar />;

const whyDidYouRender = require("@welldone-software/why-did-you-render");
whyDidYouRender(React, {
  trackAllPureComponents: true
});

render(<App />, document.getElementById("app"));
