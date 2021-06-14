import classnames from "classnames";

const Page = ({ className, ...props }) => (
  <div
    className={classnames({
      "max-w-screen-md mt-10 mx-auto": true,
      [className]: className,
    })}
    {...props}
  />
);

export default Page;
