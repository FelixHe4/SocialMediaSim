import Link from "next/link";

import Card from "@/components/Card";
import { gql, useMutation } from "@apollo/client";

const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

export default function CardButton({
  href,
  className,
  children,
  deletable,
  post_id,
}) {
  const [deletePost, { data }] = useMutation(DELETE_POST);
  return (
    <>
      <Link href={href}>
        <a>
          <Card
            color="white"
            className={className}
            deletable={deletable}
            post_id={post_id}
          >
            {children}
          </Card>
        </a>
      </Link>
      {deletable && (
        <p
          onClick={() => {
            deletePost({ variables: { id: post_id } });
          }}
        >
          Delete Me
        </p>
      )}
    </>
  );
}
