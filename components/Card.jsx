import classnames from "classnames";
import { gql, useMutation } from "@apollo/client";

const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

export default function Card({
  href,
  post_id,
  className,
  color,
  deletable,
  ...props
}) {
  let input;
  const [deletePost, { data }] = useMutation(DELETE_POST);
  return (
    <div
      className={classnames({
        [`p-6 rounded-2xl bg-${color}`]: true,
        [className]: className,
      })}
      {...props}
    />
  );
}

Card.defaultProps = {
  color: "gray-100",
};
