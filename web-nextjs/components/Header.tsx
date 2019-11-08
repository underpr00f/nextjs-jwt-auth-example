import React from "react";
import { useMeetQuery, useLogoutMutation } from "../generated/graphql";
import Link from "next/link";
import { setAccessToken } from "../lib/accessToken";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeetQuery();
  const [logout, { client }] = useLogoutMutation();
  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.meet) {
    body = <div>you are logged in as: {data.meet.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/register">
          <a>Register</a>
        </Link>{" "}
        |{" "}
        <Link href="/login">
          <a>Login</a>
        </Link>{" "}
        |{" "}
        <Link href="/bye">
          <a>bye</a>
        </Link>{" "}
        |{" "}
        <Link href="/meet">
          <a>meet</a>
        </Link>{" "}
        |{" "}
        <Link href="/description">
          <a>description</a>
        </Link>{" "}
        |{" "}
        {!loading && data && data.meet ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken("");
              await client!.resetStore();
            }}
          >
            logout
          </button>
        ) : null}
      </nav>
      {body}
    </header>
  );
};
