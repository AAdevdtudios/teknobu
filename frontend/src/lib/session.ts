"use Server";

import { SessionData, sessionOptions } from "@/utils/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.loggedIn) session.loggedIn = false;
  return session;
};
