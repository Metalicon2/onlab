import Router from "next/router";
import { Cookies } from "react-cookie";
import API from "./API";

const cookie = new Cookies();

export const handleAuth = async (ctx) => {
  let token = null;
  const { req, res, pathname, asPath } = ctx;

  //get token
  if (req) {
    token = req.headers.cookie?.split("token=").pop();
    //console.log("read serverToken");
  } else {
    //console.log("read clientToken");
    token = cookie.get("token");
  }

  //validate token on server
  const response = await API.get("/token/ping", {
    headers: {
      Authorization: token || null,
    },
  });

  //the user can access these routes without a valid token
  //the user tries to access one of these routes:
  //if has a valid token and is on the index page just return true (no redirect required)
  //if has a valid token and tries to access login or register via SSR redirect to index page
  //if has no valid token then return false (no redirect required - that's why we return here)
  //expired tokens only get deleted when user tries to access secret pages
  if (pathname === "/login" || pathname === "/register" || pathname === "/") {
    if (response.data.status === 200) {
      if (pathname === "/") {
        return true;
      }
      if (req) {
        res
          .writeHead(302, {
            Location: "/",
          })
          .end();
      }
      return true;
    } else {
      return false;
    }
  }

  //console.log("handleAuth called (menu or profile)");

  //here we delete the token if it's expired server or client side
  //then we redirect to login storing the last route
  //so after login the user gets redirected to the path value stored in "returnTo"
  if (response.data.status === 401) {
    console.log("no valid token");
    if (req) {
      console.log("removing SSR token");
      res.setHeader(
        "Set-Cookie",
        "token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      );
      res
        .writeHead(302, {
          Location: `/login?returnTo=${asPath}`,
        })
        .end();
    } else {
      console.log(asPath);
      console.log(pathname);
      console.log("Removing client side token");
      cookie.remove("token", { path: "/" });
      Router.push(`/login?returnTo=${asPath}`);
    }
    return false;
  }

  //console.log("valid Token");
  return true;
};
